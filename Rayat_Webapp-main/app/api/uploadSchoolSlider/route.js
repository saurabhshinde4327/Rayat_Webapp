import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import pool from "@/lib/db"; // ✅ Use shared MySQL pool

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

    const { searchParams } = new URL(req.url);
    const querySchoolId = searchParams.get("school_id");

    const cookieStore = cookies();
    const cookieSchoolId = cookieStore.get("school_id")?.value;

    const schoolId = querySchoolId || cookieSchoolId;

    if (!schoolId) {
      return NextResponse.json({ message: "School ID not found" }, { status: 401 });
    }

    await pool.execute(
      "INSERT INTO schoolslider (file_path, school_id) VALUES (?, ?)",
      [filePath, schoolId]
    );

    return NextResponse.json({ message: "Image uploaded successfully", filePath });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ message: "Error uploading image" }, { status: 500 });
  }
}
