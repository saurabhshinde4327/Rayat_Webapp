import pool from "@/lib/db"; // Import the pool from lib/db.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Disable default body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Fetch achievements from `achievementsnews`
export async function GET() {
  try {
    const connection = await pool.getConnection(); // Use pool for getting a connection
    const [rows] = await connection.execute(
      "SELECT id, title, des, file_path FROM achievementsnews"
    );
    connection.release(); // Release the connection back to the pool
    
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

// Handle POST request for adding achievements
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const des = formData.get("des");
    const file = formData.get("file");

    if (!title || !des || !file) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Save file to /public/uploads/
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, fileBuffer);

    // Insert into `achievementsnews` table using the pool connection
    const connection = await pool.getConnection(); // Use pool to get a connection
    await connection.execute(
      "INSERT INTO achievementsnews (title, des, file_path) VALUES (?, ?, ?)",
      [title, des, `/uploads/${fileName}`]
    );
    connection.release(); // Release the connection back to the pool

    return NextResponse.json(
      { message: "Achievement added successfully!", filePath: `/uploads/${fileName}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
