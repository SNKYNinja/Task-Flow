"use client";

import { useEffect } from "react";

export default function Loader() {
    useEffect(() => {
        (async () => {
            const { zoomies } = await import("ldrs");
            zoomies.register();
        })();
    }, []);
    return (
        <l-zoomies
            size="300"
            stroke="5"
            bg-opacity="0.1"
            speed="1.4"
            color="#f8f8f8"
        ></l-zoomies>
    );
}
