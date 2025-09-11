import pool from "@/lib/db";

export async function GET() {
  try {
    const [ebooks] = await pool.query(
      "SELECT id, title, type, date, file_path FROM ebooks ORDER BY id DESC"
    );

    return new Response(JSON.stringify({ ebooks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
    });
  }
}
