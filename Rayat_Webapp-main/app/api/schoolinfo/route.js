import { NextResponse } from "next/server";
import pool from "@/lib/db"; // ✅ Use shared MySQL connection pool

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const school_id = searchParams.get("school_id");

    if (!school_id) {
      return NextResponse.json({ error: "Missing school_id" }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `SELECT 
         s.name AS school_name,
         si.address, si.contact, si.email, 
         si.principal_name, si.vice_principal_name,
         si.student_count, si.motto, si.established,
         si.affiliation, si.facilities, si.achievements, si.student_std_division, si.medium, si.scholarship_result, si.ssc_result, si.hsc_result
       FROM school_info si
       JOIN school s ON si.school_id = s.school_id
       WHERE si.school_id = ?`,
      [school_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
