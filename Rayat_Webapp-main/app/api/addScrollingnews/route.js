import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import pool from "@/lib/db"; // ✅ Use your existing pool

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

// Handle POST request for adding events
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const file = formData.get("file");

    if (!title || !file) {
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

    // Use pooled connection
    await pool.execute(
      "INSERT INTO scrollingnews (title, file_path) VALUES (?, ?)",
      [title, `/uploads/${fileName}`]
    );

    return NextResponse.json(
      { message: "Event added successfully!", filePath: `/uploads/${fileName}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
