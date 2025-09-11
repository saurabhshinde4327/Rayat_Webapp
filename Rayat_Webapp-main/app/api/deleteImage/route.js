import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Import shared DB pool
import fs from "fs";
import path from "path";
import Swal from "sweetalert2"; // Import SweetAlert

// Handle DELETE request to remove an image
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing image ID" }, { status: 400 });
    }

    // Fetch the image path from the database using the shared pool
    const [rows] = await pool.execute("SELECT file_path FROM slider WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    const imagePath = path.join(process.cwd(), "public", rows[0].file_path);

    // Delete image file from the server if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete image record from the database using the shared pool
    const [result] = await pool.execute("DELETE FROM slider WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Image deleted successfully.",
      });
      return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Image not found.",
      });
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Internal Server Error.",
    });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
