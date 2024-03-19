"use client";

import Tasks from "@/components/tasks";
import { useGlobalState } from "@/context/globalProvider";

export default function CompletedPage() {
    const { completedTasks } = useGlobalState();
    return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}
