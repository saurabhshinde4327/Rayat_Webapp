import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { writeFile } from "fs/promises";
import mysql from "mysql2/promise";
import pool from "@/lib/db"; // Import the existing connection pool
import { cookies } from "next/headers";

// MySQL connection config is now handled by the pool in lib/db.js, so no need for manual config here

export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const file = formData.get("file");

  if (!title || !file) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const cookieStore = cookies();
    const school_id = cookieStore.get("school_id")?.value;

    if (!school_id) {
      return NextResponse.json({ message: "School not logged in" }, { status: 401 });
    }

    // File upload logic
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the file
    await writeFile(filePath, fileBuffer);

    // Save event record in the database
    const connection = await pool.getConnection(); // Use the pool for DB connection
    await connection.execute(
      "INSERT INTO schoolevents (school_id, title, file_path) VALUES (?, ?, ?)",
      [school_id, title, `/uploads/${fileName}`]
    );
    connection.release(); // Release the connection back to the pool

    return NextResponse.json({ message: "Event uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Failed to upload event", error: error.message }, { status: 500 });
  }
}
