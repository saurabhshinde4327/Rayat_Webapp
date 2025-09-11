import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Importing the shared DB pool

export async function GET() {
    try {
        // Using the pool to query the database
        const [rows] = await pool.execute(
            "SELECT id, title, des, file_path FROM achievementsnews"
        );

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { message: "Error fetching achievements", error: error.message },
            { status: 500 }
        );
    }
}
