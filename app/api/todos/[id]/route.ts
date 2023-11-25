import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const todo = await db.todo.findFirst({
        where: {
            id: params.id,
        },
    });

    if (!todo) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    await db.todo.delete({
        where: {
            id: params.id,
        },
    });

    return Response.json({});
}

// export async function GET() {
//
// }
//
export async function PATCH(request: NextRequest) {
    const data = await request.json();

    const todo = await db.todo.findFirst({
        where: {
            id: data.id,
        },
    });

    if (!todo) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    await db.todo.update({
        where: {
          id: data.id,
        },
        data: {
            label: data.label,
        },
    })

    return Response.json({});
}
