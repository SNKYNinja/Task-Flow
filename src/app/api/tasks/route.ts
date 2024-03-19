import prisma from "@/lib/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const tasks = await prisma.task.findMany({ where: { userId: userId } });

        return NextResponse.json({ tasks, status: 201 });
    } catch (err) {
        console.log("Error getting a task: ", err);
        return NextResponse.json({
            error: "Error getting task!",
            status: 500,
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const {
            title,
            description = "",
            date,
            completed,
            important,
        } = await req.json();

        if (!title || !date) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        if (title.length < 3) {
            return NextResponse.json({
                error: "Title must be at least 3 characters long",
                status: 400,
            });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,
            },
        });

        return NextResponse.json({ task, status: 201 });
    } catch (err) {
        console.log("Error creating a task: ", err);
        return NextResponse.json({
            error: "Error creating task!",
            status: 500,
        });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { userId } = auth();
        const { isCompleted, id } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                isCompleted,
            },
        });

        return NextResponse.json(task);
    } catch (err) {
        console.log("Error editing a task: ", err);
        return NextResponse.json({
            error: "Error editing task!",
            status: 500,
        });
    }
}
