import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get('title');
    const date = formData.get('date');
    const file = formData.get('file');

    if (!title || !date || !file) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + '_' + file.name;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    const dbPath = `/uploads/${fileName}`;

    await fs.writeFile(filePath, buffer);

    // Insert into `tenders` table (without tender_icon)
    await pool.execute(
      'INSERT INTO tenders (title, date, file_path) VALUES (?, ?, ?)',
      [title, date, dbPath]
    );

    return NextResponse.json({ message: 'Tender added successfully!' }, { status: 200 });
  } catch (error) {
    console.error('API addTender error:', error);
    return NextResponse.json({ message: 'Upload failed', error: error.message }, { status: 500 });
  }
}
