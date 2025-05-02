import { NextResponse } from "next/server"; 
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

