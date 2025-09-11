import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM managements ORDER BY designation");
    return NextResponse.json({ managements: rows });
  } catch (error) {
    console.error("Error fetching managements:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const designation = formData.get("designation");
    const subDesignation = formData.get("subDesignation");
    const file = formData.get("file");

    if (!title || !designation || !subDesignation || !file) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    const [result] = await pool.query(
      "INSERT INTO managements (title, designation, sub_designation, file_url) VALUES (?, ?, ?, ?)",
      [title, designation, subDesignation, fileUrl]
    );

    return NextResponse.json({
      message: "Management member added successfully",
      data: {
        id: result.insertId,
        title,
        designation,
        subDesignation,
        fileUrl,
      },
    });
  } catch (error) {
    console.error("Error uploading or inserting:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
