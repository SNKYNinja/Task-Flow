import prisma from "@/lib/connect";
import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const task = await prisma.task.delete({ where: { id, userId } });
        return NextResponse.json({ task, status: 201 });
    } catch (err) {
        console.log("Error deleting a task: ", err);
        return NextResponse.json({
            error: "Error deleting task!",
            status: 500,
        });
    }
}
