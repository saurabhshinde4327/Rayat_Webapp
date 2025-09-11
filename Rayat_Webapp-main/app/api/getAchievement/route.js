import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the shared DB pool

// Handle GET request to fetch events
export async function GET() {
  try {
    // Using the pool to query the database
    const [rows] = await pool.execute("SELECT id, title, file_path FROM achievements");

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching events", error: error.message },
      { status: 500 }
    );
  }
}
