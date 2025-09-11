import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Use shared DB pool

export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT id, name, website FROM colleges ORDER BY name ASC');
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
