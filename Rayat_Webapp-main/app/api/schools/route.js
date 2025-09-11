import pool from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const region_id = searchParams.get("region_id");

  if (!region_id) {
    return Response.json({ message: "Region ID is required" }, { status: 400 });
  }

  try {
    const [rows] = await pool.query("SELECT school_id, name FROM school WHERE region_id = ?", [region_id]);
    return Response.json(rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return Response.json({ message: "Database error" }, { status: 500 });
  }
}
