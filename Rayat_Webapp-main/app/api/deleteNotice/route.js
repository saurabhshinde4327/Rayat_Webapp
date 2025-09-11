import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pool from "@/lib/db"; // Import the shared DB pool

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Notice ID is required" }, { status: 400 });
    }

    // Fetch notice to get file path using the shared pool
    const [rows] = await pool.execute("SELECT file_path FROM notices WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "public", rows[0].file_path);

    // Delete file from the server if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from the database using the shared pool
    const [result] = await pool.execute("DELETE FROM notices WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Notice deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete notice", error: error.message }, { status: 500 });
  }
}

