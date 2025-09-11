import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT si.school_id, s.name AS school_name, si.principal_name, 
              si.vice_principal_name, si.contact, si.email, 
              si.address, si.motto, si.established, si.affiliation, 
              si.student_count, si.facilities, si.achievements
       FROM school_info si
       JOIN school s ON si.school_id = s.school_id`
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching all school info:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
