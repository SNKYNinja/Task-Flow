"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useGlobalState } from "@/context/globalProvider";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

const schema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().optional(),
    date: z.string().min(1, "Please select a date"),
    completed: z.boolean(),
    important: z.boolean(),
});

type Task = z.infer<typeof schema>;

export default function CreateTask() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Task>({
        resolver: zodResolver(schema),
    });

    const { closeModal, allTasks } = useGlobalState();

    const onSubmit = async (data: Task) => {
        try {
            const res = await axios.post("/api/tasks", data);
            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                toast.success("Task created successfully!");
            }
            closeModal();
            allTasks();
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }
    };

    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-semibold modal-heading">Create a task</h1>
                <div className="relative my-6 mx-0 font-medium">
                    <label
                        className={cn(
                            "mb-2 inline-block",
                            errors.title ? "text-red-500" : "text-[#6c7983]"
                        )}
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register("title")}
                        placeholder="Title"
                        className={cn(
                            "p-4 w-full resize-none bg-[#131313] text-[#b2becd] rounded-lg focus:outline-red-500",
                            errors.title
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                        )}
                    />
                    {errors.title && (
                        <div className="mx-auto my-2 text-red-500">
                            <p>{errors.title.message}</p>
                        </div>
                    )}
                </div>
                <div className="relative my-6 mx-0 font-medium">
                    <label
                        className={cn(
                            "mb-2 inline-block",
                            errors.description
                                ? "text-red-500"
                                : "text-[#6c7983]"
                        )}
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        placeholder="Description"
                        className="p-4 w-full resize-none bg-[#131313] text-[#b2becd] rounded-lg"
                    />
                </div>
                <div className="relative my-6 mx-0 font-medium">
                    <label
                        className={cn(
                            "mb-2 inline-block",
                            errors.date ? "text-red-500" : "text-[#6c7983]"
                        )}
                        htmlFor="date"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        {...register("date")}
                        placeholder="Date"
                        className="p-4 w-full resize-none bg-[#131313] text-[#b2becd] rounded-lg"
                    />
                    {errors.date && (
                        <div className="mx-auto my-2 text-red-500">
                            <p>{errors.date.message}</p>
                        </div>
                    )}
                </div>
                <div className="relative my-6 mx-0 font-medium flex items-center justify-between cursor-pointer">
                    <label
                        className="mb-2 inline-block text-[#6c7983] flex-1"
                        htmlFor="completed"
                    >
                        Toggle Completed
                    </label>
                    <input
                        type="checkbox"
                        id="completed"
                        {...register("completed")}
                    />
                </div>
                <div className="relative my-6 mx-0 font-medium flex items-center justify-between cursor-pointer">
                    <label
                        className="mb-2 inline-block text-[#6c7983]"
                        htmlFor="important"
                    >
                        Toggle Important
                    </label>
                    <input
                        type="checkbox"
                        id="important"
                        {...register("important")}
                    />
                </div>
                <div className="flex justify-end transition-all duration-300 ease-in-out mt-6">
                    <button
                        type="submit"
                        className="flex gap-2 cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg
                        border-green-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                        <Icons.plus />
                        <span>Create</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
