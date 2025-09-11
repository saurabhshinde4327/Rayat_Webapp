import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the shared DB pool

// GET: Fetch all events with school name
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        sa.id, 
        sa.school_id,
        sa.title, 
        sa.file_path, 
        sa.verify,
        s.name AS school_name
      FROM schoolactivity sa
      JOIN school s ON sa.school_id = s.school_id
      ORDER BY sa.id DESC
    `);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching events", error: error.message },
      { status: 500 }
    );
  }
}
