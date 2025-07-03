import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const date = formData.get('date');

    if (!file || !title || !date) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await fs.writeFile(uploadPath, bytes);

    const filePath = `/uploads/${fileName}`;

    // Database insert करणे:
    await db.query('INSERT INTO documents (title, date, file_path) VALUES (?, ?, ?)', [title, date, filePath]);

    return NextResponse.json({ message: "File uploaded successfully", filePath }, { status: 200 });
}
