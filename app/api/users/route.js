import { NextResponse } from "next/server"; 
import pool from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function POST (request) {

  try {
  const body = await request.json();
  const { name, email, password} = body;

  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );

  return NextResponse.json(result.rows[0]);
} catch(error) {
  console.log(error);
  return NextResponse.json({message: "Server Error"}, { status: 500 });
}
}
