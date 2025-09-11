import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Import the shared DB pool

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing news ID" }, { status: 400 });
    }

    // Use the shared pool to execute the DELETE query
    const [result] = await pool.execute("DELETE FROM recruitment WHERE id = ?", [id]);

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
