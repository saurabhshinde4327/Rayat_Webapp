import pool from "@/lib/db"; // Importing the shared DB pool

export async function GET() {
  const query = `SELECT \`id\`, \`name\`, \`email\`, \`department\`, \`message\` FROM \`feedback\``;

  try {
    const [rows] = await pool.execute(query); // Using the shared DB pool to execute the query
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error('Error fetching feedback:', err);
    return new Response('Failed to fetch feedback', { status: 500 });
  }
}
