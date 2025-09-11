import pool from "@/lib/db";

export async function GET() {
  try {
    // Use the pool to execute the query
    const [rows] = await pool.execute("SELECT * FROM news ORDER BY date DESC");

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ message: "Database connection failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
