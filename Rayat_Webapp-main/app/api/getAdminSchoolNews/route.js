import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the shared DB pool

// GET: Fetch school news with school name
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        sn.id, 
        sn.title, 
        sn.date, 
        sn.file_path, 
        sn.verify,
        s.name AS school_name
      FROM schoolnews sn
      JOIN school s ON sn.school_id = s.school_id
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
