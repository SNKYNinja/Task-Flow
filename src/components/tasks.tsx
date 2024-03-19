"use client";

import TaskItem from "./task-item";
import { Task } from "@prisma/client";
import { Icons } from "./icons";
import { useGlobalState } from "@/context/globalProvider";
import Loader from "./loader";
import CreateTask from "./create-task";
import Modal from "./modal";

export default function Tasks({
    title,
    tasks,
}: {
    title: string;
    tasks: Task[];
}) {
    const { isLoading, openModel, modal } = useGlobalState();

    return (
        <main className="size-full dark:bg-[#212121] border-2 border-border rounded-2xl p-8 overflow-y-scroll no-scrollbar">
            {modal && (
                <Modal>
                    <CreateTask />
                </Modal>
            )}

            <button
                className="absolute top-20 right-20 size-12 rounded-[50%] bg-[#252525] border-2 border-border shadow-button text-[#212121] text-[1.4rem] flex justify-center items-center cursor-pointer z-40"
                onClick={openModel}
            >
                <Icons.plus stroke="#fff" size={30} />
            </button>

            <h1 className="font-extrabold relative text-semiheading after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-[0.2rem] after:bg-green-300 after:rounded-lg">
                {title}
            </h1>
            {isLoading ? (
                <div className="size-full flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="tasks-grid my-8 mx-0">
                    {tasks.map((task: Task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                    <button
                        className="flex justify-center items-center gap-2 h-64 text-[#b2becd] font-semibold cursor-pointer rounded-2xl border-[3px] border-dashed border-[#2a2e35] hover:bg-[#2a2e35] hover:text-[#f8f8f8] transition-all duration-300"
                        onClick={openModel}
                    >
                        <Icons.plus />
                        Add a new task
                    </button>
                </div>
            )}
        </main>
    );
}
