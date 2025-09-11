import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the shared DB pool

// GET method to fetch notices
export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT id, title, date, file_path FROM schoolnews WHERE verify = 1 ORDER BY date DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching verified notices:", error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
