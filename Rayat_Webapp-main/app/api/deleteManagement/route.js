import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pool from "@/lib/db";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Notice ID is required" }, { status: 400 });
    }

    // Use correct column name `file_url`
    const [rows] = await pool.execute("SELECT file_url FROM managements WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    const fileRelativePath = rows[0].file_url;
    if (fileRelativePath) {
      const filePath = path.join(process.cwd(), "public", fileRelativePath);

      try {
        await fs.promises.unlink(filePath);
        console.log("File deleted:", filePath);
      } catch (err) {
        console.warn("File deletion failed or not found:", err.message);
      }
    }

    const [result] = await pool.execute("DELETE FROM managements WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Notice deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

  } catch (error) {
    console.error("Error deleting notice:", error);
    return NextResponse.json({ message: "Failed to delete notice", error: error.message }, { status: 500 });
  }
}
