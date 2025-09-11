import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const url = new URL(request.url);
  const filePath = url.searchParams.get("path");
  
  if (!filePath) {
    return NextResponse.json({ error: "No file path provided" }, { status: 400 });
  }
  
  // Remove leading slash if present
  const cleanPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
  
  // Construct the absolute path to the file
  const absolutePath = path.join(process.cwd(), "public", cleanPath);
  
  try {
    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    
    // Read file and serve it
    const fileBuffer = fs.readFileSync(absolutePath);
    const fileStats = fs.statSync(absolutePath);
    
    // Determine content type based on file extension
    const ext = path.extname(absolutePath).toLowerCase();
    let contentType = "application/octet-stream"; // Default
    
    if (ext === ".pdf") contentType = "application/pdf";
    else if (ext === ".doc" || ext === ".docx") contentType = "application/msword";
    else if (ext === ".xls" || ext === ".xlsx") contentType = "application/vnd.ms-excel";
    
    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileStats.size.toString(),
        "Content-Disposition": `inline; filename="${path.basename(absolutePath)}"`
      }
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "Error serving file" }, { status: 500 });
  }
}
