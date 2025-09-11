import { writeFile, mkdir } from "fs/promises";
import path from "path";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const date = formData.get("date");
    const type = formData.get("type"); // Get type
    const file = formData.get("file");

    if (!title || !date || !type || !file) {
      return Response.json({ message: "All fields are required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const dbPath = `/uploads/${fileName}`;

    await pool.query(
      "INSERT INTO ebooks (title, date, type, file_path) VALUES (?, ?, ?, ?)",
      [title, date, type, dbPath]
    );

    return Response.json({ message: "Ebook added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
