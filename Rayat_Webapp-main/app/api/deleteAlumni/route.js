import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Use shared DB pool
import fs from "fs";
import path from "path";

// Handle DELETE request to remove an event
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
    }

    // Fetch file path before deleting
    const [rows] = await pool.execute("SELECT file_path FROM alumni WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const filePath = rows[0].file_path;

    // Delete the event from the database
    await pool.execute("DELETE FROM alumni WHERE id = ?", [id]);

    // Remove the file from the server if it exists
    if (filePath) {
      const absolutePath = path.join(process.cwd(), "public", filePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting event", error: error.message },
      { status: 500 }
    );
  }
}
