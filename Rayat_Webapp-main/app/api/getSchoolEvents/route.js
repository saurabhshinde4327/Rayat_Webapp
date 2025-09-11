import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Replaces the direct pool creation
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const schoolId = cookieStore.get("school_id")?.value;

    if (!schoolId) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const [rows] = await pool.query(
      "SELECT id, title, file_path FROM schoolevents WHERE school_id = ?",
      [schoolId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ message: "Error fetching events" }, { status: 500 });
  }
}
