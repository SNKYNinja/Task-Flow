"use client";

// import { Task } from "@/types/type";
import { Task } from "@prisma/client";
import { Icons } from "./icons";
import { cn, formatDate } from "@/lib/utils";
import { useGlobalState } from "@/context/globalProvider";

export default function TaskItem({ task }: { task: Task }) {
    const { id, title, description, date, isCompleted, isImportant } = task;
    const { updateTask, deleteTask } = useGlobalState();
    return (
        <div className="py-5 px-4 rounded-2xl bg-border shadow-card border-2 border-border h-64 flex flex-col gap-2">
            <h1 className="text-[1.5rem] font-semibold">{title}</h1>
            <p>{description}</p>
            <p className="mt-auto ">{formatDate(date)}</p>
            <div className="flex items-center gap-[1.2rem]">
                <button
                    onClick={() =>
                        updateTask({ id, isCompleted: !isCompleted })
                    }
                    className={cn(
                        "inline-block py-2 px-4 rounded-[30px]",
                        isCompleted ? "bg-green-500" : "bg-red-500"
                    )}
                >
                    {isCompleted ? "Completed" : "Incomplete"}
                </button>
                <button className="border-none outline-none cursor-pointer ml-auto">
                    <Icons.edit
                        fontSize="1.4rem"
                        color="#b2becd"
                        className="hover:stroke-[#f8f8f8]"
                    />
                </button>
                <button
                    className="border-none outline-none cursor-pointer"
                    onClick={() => deleteTask(id)}
                >
                    <Icons.delete
                        fontSize="1.4rem"
                        color="#b2becd"
                        className="hover:stroke-[#f8f8f8]"
                    />
                </button>
            </div>
        </div>
    );
}
