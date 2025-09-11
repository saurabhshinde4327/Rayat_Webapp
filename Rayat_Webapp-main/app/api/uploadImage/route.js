import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Use the shared connection pool

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(uploadPath, buffer);

    const filePath = `/uploads/${fileName}`;

    await pool.execute("INSERT INTO slider (file_path) VALUES (?)", [filePath]);

    return NextResponse.json({ message: "Image uploaded successfully", filePath });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ message: "Error uploading image" }, { status: 500 });
  }
}

// ✅ Add this to support large file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
