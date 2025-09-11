import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const school_id = cookies().get("school_id")?.value;

  if (!school_id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ school_id });
}
