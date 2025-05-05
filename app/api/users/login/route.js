import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// Handle POST request to log in a user
export async function POST(request) {
  try {
    // Parse email and password from the incoming request
    const { username, password } = await request.json();

    // Look up the user in the database by email
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    // If no user is found return an error
    if (result.rows.length === 0 ) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({message: "Invalid Credentials"}, {status: 401})
    }

    const token = jwt.sign(
      {id: user.id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}




