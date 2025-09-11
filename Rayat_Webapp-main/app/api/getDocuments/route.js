import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the shared DB pool

export async function GET() {
  try {
    // Fetch downloads records using the shared pool
    const [rows] = await pool.execute("SELECT * FROM downloads ORDER BY date DESC");

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
  }
}
