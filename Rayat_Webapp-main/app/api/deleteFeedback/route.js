import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the pool from lib/db.js

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing news ID" }, { status: 400 });
    }

    // Use pool.getConnection() to get a connection from the pool
    const connection = await pool.getConnection();
    const [result] = await connection.execute("DELETE FROM feedback WHERE id = ?", [id]);
    connection.release(); // Release the connection back to the pool

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
