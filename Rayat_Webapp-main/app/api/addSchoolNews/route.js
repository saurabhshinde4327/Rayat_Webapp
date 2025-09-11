import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pool from "@/lib/db"; // Import the pool from db.js
import { cookies } from "next/headers";

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req) {
  try {
    // Retrieve school_id from cookies (or use fallback for testing)
    const school_id = cookies().get("school_id")?.value || 1;

    if (!school_id) {
      return NextResponse.json(
        { message: "School ID not found in session" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const date = formData.get("date");
    const file = formData.get("file");

    if (!title || !date || !file) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Save uploaded file
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `/uploads/${fileName}`;
    const absoluteFilePath = path.join(uploadDir, fileName);
    fs.writeFileSync(absoluteFilePath, fileBuffer);

    // Use the database connection pool
    const [result] = await pool.execute(
      "INSERT INTO schoolnews (school_id, title, date, file_path, verify) VALUES (?, ?, ?, ?, ?)",
      [school_id, title, date, filePath, 0]
    );

    return NextResponse.json(
      { message: "News added successfully!", filePath },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
