"use client";

import Tasks from "@/components/tasks";
import { useGlobalState } from "@/context/globalProvider";

export default function IncompletePage() {
    const { incompleteTasks } = useGlobalState();
    return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}
