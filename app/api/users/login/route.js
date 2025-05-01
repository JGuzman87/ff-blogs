import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Handle POST request to log in a user
export async function POST(request) {
  try {
    // Parse email and password from the incoming request
    const { email, password } = await request.json();

    // Look up the user in the database by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    // If no user is found or the password doesn't match, return an error
    if (result.rows.length === 0 || result.rows[0].password !== password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // User found and password matches, return user info
    const user = result.rows[0];

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}


