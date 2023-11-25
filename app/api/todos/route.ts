import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request : NextRequest) {
    const url = new URL(request.url)

    const todos = await db.todo.findMany({
        skip: Number(url.searchParams.get("offset")) || 0,
        take: Number(url.searchParams.get("limit")) || 10,
    });

    return Response.json(todos);
}

export async function POST(request: NextRequest) {
    const data = await request.json();

    const newTodo = await db.todo.create({
        data: {
            label: data.label,
        },
    });


    return Response.json(newTodo);
}