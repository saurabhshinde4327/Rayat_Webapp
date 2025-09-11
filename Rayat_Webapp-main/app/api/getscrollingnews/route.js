import { NextResponse } from "next/server";
import pool from "@/lib/db"; // ✅ Use shared pool

// Handle GET request to fetch events
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT id, title, file_path FROM scrollingnews");

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching events", error: error.message },
      { status: 500 }
    );
  }
}
