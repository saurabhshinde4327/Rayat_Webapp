import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import pool from '@/lib/db';
import mysql from 'mysql2/promise';

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get('title');
  const date = formData.get('date');
  const file = formData.get('file');

  if (!title || !date || !file) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // Save file to public/uploads
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = Date.now() + '_' + file.name;
  const filePath = `public/uploads/${fileName}`;
  const dbPath = `/uploads/${fileName}`; // Path to store in DB

  try {
    await fs.writeFile(filePath, buffer);

    await pool.execute(
      'INSERT INTO recruitment (title, date, file_path) VALUES (?, ?, ?)',
      [title, date, dbPath]
    );
  

    return NextResponse.json({ message: 'News added successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Upload failed', error: error.message }, { status: 500 });
  }
}
