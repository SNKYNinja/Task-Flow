"use client";

import Tasks from "@/components/tasks";
import { useGlobalState } from "@/context/globalProvider";

export default function ImportantPage() {
    const { importantTasks } = useGlobalState();
    return <Tasks title="Important Tasks" tasks={importantTasks} />;
}
