import { NextResponse } from "next/server";
import pool from "@/lib/db"; // ✅ Shared MySQL pool

export async function POST(req) {
  const { name, email, department, message } = await req.json();

  const query = `
    INSERT INTO feedback (name, email, department, message)
    VALUES (?, ?, ?, ?)
  `;

  try {
    await pool.query(query, [name, email, department, message]);
    return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error inserting feedback:", err);
    return NextResponse.json({ error: "Error inserting feedback" }, { status: 500 });
  }
}
