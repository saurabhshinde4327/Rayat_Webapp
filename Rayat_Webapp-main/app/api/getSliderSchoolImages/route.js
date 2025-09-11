import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db"; // ✅ Import shared MySQL pool

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const cookieSchoolId = cookieStore.get("school_id")?.value;

    const { searchParams } = new URL(request.url);
    const querySchoolId = searchParams.get("school_id");

    // Use school_id from query params, then fallback to cookie
    const schoolId = querySchoolId || cookieSchoolId;

    if (!schoolId) {
      return NextResponse.json(
        { error: "Missing or unauthorized school_id" },
        { status: 401 }
      );
    }

    const [rows] = await pool.query(
      `SELECT 
         sn.id, sn.file_path 
       FROM schoolslider sn
       JOIN school s ON sn.school_id = s.school_id
       WHERE sn.school_id = ?`,
      [schoolId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch slider images" },
      { status: 500 }
    );
  }
}
