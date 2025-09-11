import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { formType, formData } = await req.json();
    let table = "";

    if (formType === "11_12") table = "ai_info_11_12";
    if (formType === "senior") table = "ai_info_senior";
    if (formType === "5_10") table = "ai_info_5to10";

    if (!table) {
      return new Response(JSON.stringify({ error: "Invalid form type" }), {
        status: 400,
      });
    }

    const keys = Object.keys(formData);
    const values = Object.values(formData);
    const placeholders = keys.map(() => "?").join(",");

    const sql = `INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders})`;
    await pool.query(sql, values);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return new Response(JSON.stringify({ error: "Database insert failed" }), {
      status: 500,
    });
  }
}

// 👇 ही GET method जोडायची
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const formType = searchParams.get("formType");

    let table = "";
    if (formType === "11_12") table = "ai_info_11_12";
    if (formType === "senior") table = "ai_info_senior";
    if (formType === "5_10") table = "ai_info_5to10";

    if (!table) {
      return new Response(JSON.stringify({ error: "Invalid form type" }), {
        status: 400,
      });
    }

    const [rows] = await pool.query(`SELECT * FROM ${table}`);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return new Response(JSON.stringify({ error: "Database fetch failed" }), {
      status: 500,
    });
  }
}
