import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const {title, content} = body;

        const result = await pool.query(
            "INSERT INTO blog_posts (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server Error"}, {status: 500})
    }
}

export async function GET() {
    try {
        const result = await pool.query("SELECT * FROM blog_posts");
        return NextResponse.json(result.rows);
    }catch (error) {
        return NextResponse.json({error: 'Failed to fetch blogs'}, {status: 500});
    }
}