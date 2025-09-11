import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Import the pooled connection

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const schoolIdFromQuery = searchParams.get("school_id");

  const schoolId = schoolIdFromQuery;

  if (!schoolId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT id, title, file_path, verify FROM schoolactivity WHERE school_id = ?",
      [schoolId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
