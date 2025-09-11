import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password, selectedRegion, selectedSchool } = await req.json();

    if (!email || !password || !selectedRegion || !selectedSchool) {
      return Response.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into database
    await pool.query(
      "INSERT INTO users (school_id, email, password) VALUES (?, ?, ?)",
      [selectedSchool, email, hashedPassword]
    );

    return Response.json({ success: true, message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error inserting user:", error);
    return Response.json({ success: false, message: "Database error" }, { status: 500 });
  }
}
