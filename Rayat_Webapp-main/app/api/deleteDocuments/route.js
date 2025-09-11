import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Use shared DB pool

// Handle DELETE request to remove a news item
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing news ID" }, { status: 400 });
    }

    // Execute the DELETE query using the shared pool
    const [result] = await pool.execute("DELETE FROM downloads WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "News deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
