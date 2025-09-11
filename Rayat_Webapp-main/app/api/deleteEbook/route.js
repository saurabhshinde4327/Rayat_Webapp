import pool from "@/lib/db";
import path from "path";
import { promises as fs } from "fs";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
  }
  // Get file path from DB
  const [[ebook]] = await pool.query("SELECT file_path FROM ebooks WHERE id = ?", [id]);
  if (!ebook) {
    return new Response(JSON.stringify({ message: "Ebook not found" }), { status: 404 });
  }
  const filePath = path.join(process.cwd(), "public", ebook.file_path);
  try {
    await fs.unlink(filePath);
  } catch (e) {}
  await pool.query("DELETE FROM ebooks WHERE id = ?", [id]);
  return new Response(JSON.stringify({ message: "Ebook deleted" }), { status: 200 });
} 
