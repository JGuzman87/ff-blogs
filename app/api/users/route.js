import { NextResponse } from "next/server"; 
import pool from "@/lib/db";
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return new NextResponse("Server Error", { status: 500 });
  }
}


export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    return NextResponse.json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

