import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import pool from "@/lib/db"; // Use the pool from lib/db.js

// Handle POST request
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const file = formData.get("file");

    if (!title || !file) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Save file to /public/uploads/
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}_${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    await fs.writeFile(filePath, fileBuffer);

    const school_id = 1; // Replace with dynamic school ID (from session or form)
    const verify = 0;

    // Get connection from pool and insert into 'schoolactivity' table
    const connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO schoolactivity (school_id, title, file_path, verify) VALUES (?, ?, ?, ?)",
      [school_id, title, `/uploads/${filename}`, verify]
    );

    connection.release(); // Release the connection back to the pool

    return NextResponse.json({ message: "Activity uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
