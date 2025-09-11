import pool from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ GET request - Fetch all notices
export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM notices ORDER BY date DESC");
    connection.release();
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/notices error:", error);
    return NextResponse.json({ message: "Error fetching notices", error: error.message }, { status: 500 });
  }
}

// ✅ POST request - Add new notice
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const date = formData.get("date");
    const file = formData.get("file");

    if (!title || !date || !file) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, fileBuffer);

    const connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO notices (title, date, file_path) VALUES (?, ?, ?)",
      [title, date, `/uploads/${fileName}`]
    );
    connection.release();

    return NextResponse.json({ message: "Notice added successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing POST /api/notices:", error);
    return NextResponse.json({ message: "Error processing request", error: error.message }, { status: 500 });
  }
}
