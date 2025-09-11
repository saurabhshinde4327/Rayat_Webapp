import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Import shared DB pool

// Handle DELETE request to remove news
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing news ID" }, { status: 400 });
    }

    // Delete news from the database using the shared pool
    const [result] = await pool.execute("DELETE FROM news WHERE id = ?", [id]);

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
