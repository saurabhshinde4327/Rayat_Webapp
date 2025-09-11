// /app/api/deleteTender/route.js

import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Adjust the path if needed

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing tender ID" }, { status: 400 });
  }

  try {
    const [result] = await pool.execute("DELETE FROM tenders WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Tender not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tender deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete tender", details: error.message },
      { status: 500 }
    );
  }
}
