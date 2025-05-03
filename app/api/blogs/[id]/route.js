import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(request, { params }) {
    const { id } = await params;

    try {
        const result = await pool.query("DELETE FROM blog_posts WHERE id = $1", [id]);
        return NextResponse.json({ message: "Blog deleted"});
    } catch (error) {
        console.log("DELETE error:", error);
        return NextResponse.json({error: "Failed to delete blog"}, { status: 500 });
    }
}