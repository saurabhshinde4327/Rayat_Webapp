// ./app/api/getSchoolSession/route.js

import { getIronSession } from "iron-session";
import pool from "@/lib/db"; // Your shared MySQL pool

const sessionOptions = {
  cookieName: "session",
  password: process.env.SESSION_SECRET || "complex_password_123", // Use a strong secret in production
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
  },
};

export async function GET(req) {
  // Get session from request
  const session = await getIronSession(req, sessionOptions);
  const school_id = session.school_id;

  // If session is missing school_id
  if (!school_id) {
    return Response.json({ success: false, message: "Not logged in" }, { status: 401 });
  }

  try {
    // Query school name from database
    const [rows] = await pool.query("SELECT name FROM schools WHERE id = ?", [school_id]);

    if (rows.length === 0) {
      return Response.json({ success: false, message: "School not found" }, { status: 404 });
    }

    return Response.json({ success: true, school_name: rows[0].name });
  } catch (error) {
    console.error("Database Error:", error);
    return Response.json({ success: false, message: "Database query failed" }, { status: 500 });
  }
}
