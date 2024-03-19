"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Task } from "@prisma/client";
import * as NProgress from "nprogress";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface GlobalContext {
    tasks: Task[];
    isLoading: boolean;
    allTasks: () => void;
    deleteTask: (id: string) => void;
    updateTask: (data: { id: string; isCompleted: boolean }) => void;
    completedTasks: Task[];
    incompleteTasks: Task[];
    importantTasks: Task[];
    modal: boolean;
    openModel: () => void;
    closeModal: () => void;
}

export const GlobalContext = createContext({} as GlobalContext);
export const GlobalUpdateContext = createContext({});

export default function GlobalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([] as Task[]);
    const [modal, setModal] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const { user } = useUser();

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tasks");
            const data = res.data.tasks.sort((a: Task, b: Task) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            });

            setTasks(data);
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }
        setIsLoading(false);
    };

    const updateTask = async (data: { id: string; isCompleted: boolean }) => {
        try {
            await axios.put("/api/tasks", data);
            toast.success("Task updated!");
            allTasks();
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!");
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            toast.success("Task deleted!");
            allTasks();
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!");
        }
    };

    const openModel = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const completedTasks = tasks.filter((task) => task.isCompleted);
    const incompleteTasks = tasks.filter((task) => !task.isCompleted);
    const importantTasks = tasks.filter((task) => task.isImportant);

    useEffect(() => {
        if (user) allTasks();
    }, [user]);

    useEffect(() => {
        NProgress.done();
    }, [pathname, router]);

    return (
        <GlobalContext.Provider
            value={{
                tasks,
                isLoading,
                allTasks,
                updateTask,
                deleteTask,
                completedTasks,
                importantTasks,
                incompleteTasks,
                modal,
                openModel,
                closeModal,
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
