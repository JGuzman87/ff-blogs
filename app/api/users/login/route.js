import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";


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

    const token = jwt.sign(
      {id: user.id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}


