import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, designation, file_url, created_at FROM managements ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching managements:", error);
    return NextResponse.json(
      { message: "Failed to fetch managements" },
      { status: 500 }
    );
  }
}
