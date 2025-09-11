// /app/api/getSchoolNews/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Use shared MySQL pool
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get school_id from cookie/session
    const cookieStore = cookies();
    const schoolId = cookieStore.get("school_id")?.value;

    if (!schoolId) {
      return NextResponse.json({ error: "Unauthorized. Missing school_id in session." }, { status: 401 });
    }

    // Fetch news only for that school_id
    const [rows] = await pool.query(
      `
      SELECT id, school_id, title, date, file_path, verify
      FROM schoolnews
      WHERE school_id = ?
      ORDER BY date DESC
      `,
      [schoolId]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
