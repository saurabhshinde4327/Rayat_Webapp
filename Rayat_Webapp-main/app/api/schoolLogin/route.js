import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db"; // ✅ Import shared pool

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Query user by email
    const [rows] = await pool.query(
      "SELECT id, school_id, email, password FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare plain text passwords
    if (password !== user.password) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    // Store `school_id` in session cookie
    cookies().set("school_id", user.school_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Return school_id in the response
    return NextResponse.json({ success: true, school_id: user.school_id });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
