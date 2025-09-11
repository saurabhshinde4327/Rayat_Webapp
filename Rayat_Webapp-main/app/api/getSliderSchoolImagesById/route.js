// import { NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const schoolId = searchParams.get("school_id");

//     if (!schoolId) {
//       return NextResponse.json({ message: "School ID is required" }, { status: 400 });
//     }

//     const connection = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "rayat",
//     });

//     const [rows] = await connection.execute(
//       "SELECT id, file_path FROM schoolslider WHERE school_id = ?",
//       [schoolId]
//     );

//     await connection.end();
//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error("Error fetching slider images:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }
