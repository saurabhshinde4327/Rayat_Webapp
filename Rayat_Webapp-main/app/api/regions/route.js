import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT id, name FROM regions");
    return Response.json(rows);
  } catch (error) {
    console.error("Error fetching regions:", error);
    return Response.json({ message: "Database error" }, { status: 500 });
  }
}
