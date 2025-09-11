import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Use shared DB pool

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
  }

  try {
    await pool.query(`UPDATE schoolactivity SET verify = 1 WHERE id = ?`, [id]);
    return NextResponse.json({ message: "Event approved successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to approve event" }, { status: 500 });
  }
}
