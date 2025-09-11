import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      school_id,
      principalName,
      vicePrincipalName,
      contact,
      email,
      address,
      motto,
      established,
      affiliation,
      studentCount, // <-- updated here
      facilities,
      achievements,
      studentStdDivision, // <-- new field for std/division wise student count
      medium, // <-- add medium
      scholarshipResult, // <-- add scholarship result
      sscResult, // <-- add ssc result
      hscResult, // <-- add hsc result
    } = body;

    if (!school_id || school_id === 'undefined' || school_id === 'null') {
      return NextResponse.json({ error: 'Invalid school ID. Please log in again.' }, { status: 400 });
    }

    const values = [
      school_id,
      principalName || null,
      vicePrincipalName || null,
      contact || null,
      email || null,
      address || null,
      motto || null,
      established || null,
      affiliation || null,
      studentCount || null, // <-- use camelCase from body
      facilities || null,
      achievements || null,
      studentStdDivision ? JSON.stringify(studentStdDivision) : null, // <-- add to values
      medium || null, // <-- add medium to values
      scholarshipResult || null, // <-- add scholarship result
      sscResult || null, // <-- add ssc result
      hscResult || null, // <-- add hsc result
    ];

    const query = `
      INSERT INTO school_info (
        school_id, principal_name, vice_principal_name, contact, email,
        address, motto, established, affiliation, student_count, facilities, achievements, student_std_division, medium, scholarship_result, ssc_result, hsc_result
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        principal_name=VALUES(principal_name),
        vice_principal_name=VALUES(vice_principal_name),
        contact=VALUES(contact),
        email=VALUES(email),
        address=VALUES(address),
        motto=VALUES(motto),
        established=VALUES(established),
        affiliation=VALUES(affiliation),
        student_count=VALUES(student_count),
        facilities=VALUES(facilities),
        achievements=VALUES(achievements),
        student_std_division=VALUES(student_std_division),
        medium=VALUES(medium),
        scholarship_result=VALUES(scholarship_result),
        ssc_result=VALUES(ssc_result),
        hsc_result=VALUES(hsc_result)
    `;

    const [result] = await pool.execute(query, values);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'School information added successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to add school information' }, { status: 500 });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
