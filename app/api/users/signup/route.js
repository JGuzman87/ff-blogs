import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
