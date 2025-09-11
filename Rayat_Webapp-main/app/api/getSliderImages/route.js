import { NextResponse } from "next/server";
import pool from "@/lib/db"; // import the pool

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT id, file_path FROM slider");

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ message: "Error fetching images" }, { status: 500 });
  }
}
