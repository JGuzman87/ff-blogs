import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Extract the Authorization header from the request
        const authHeader = request.headers.get("authorization");

        // Check if the header exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Extract the token from the header and verify it using the JWT secret
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Extract title and content from the request body
        const { title, content } = await request.json();

        // Insert the new blog post into the database with the authenticated user's ID
        const result = await pool.query(
            "INSERT INTO blog_posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title, content, decode.id]
        );

        // Return the newly created blog post as a JSON response
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        // Get the Authorization header from the request
        const authHeader = request.headers.get("authorization");

        // Check if the header exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Extract the token from the header and verify it using the JWT secret
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Query the database for blog posts that belong to the authenticated user
        const result = await pool.query("SELECT * FROM blog_posts WHERE user_id = $1", [decode.id]);

        // Return the blog posts as a JSON response
        // Check if the result.rows is an array to prevent frontend .map() crashes
        if (Array.isArray(result.rows)) {
            return NextResponse.json(result.rows);
        } else {
            // Log an error if the result is not an array and return an empty array as fallback
            console.error("Expected an array of blog posts, got:", result.rows);
            return NextResponse.json([], { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}