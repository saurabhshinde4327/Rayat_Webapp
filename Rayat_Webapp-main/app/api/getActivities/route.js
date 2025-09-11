import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the shared DB pool

export async function GET() {
  try {
    // Using the pool to query the database
    const [rows] = await pool.execute(
      "SELECT title, file_path FROM activity ORDER BY id DESC"
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching activities", error: error.message }, { status: 500 });
  }
}
