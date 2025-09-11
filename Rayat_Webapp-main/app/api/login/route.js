import { NextResponse } from "next/server";
import pool from "@/lib/db"; // ✅ Import shared pool

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log("Received login request for:", email);

    const [rows] = await pool.execute(
      "SELECT id, username, password FROM admin WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    const user = rows[0];

    // **If passwords are stored in plain text**
    if (password !== user.password) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: "Login successful", userId: user.id, username: user.username });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}
