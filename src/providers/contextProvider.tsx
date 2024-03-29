"use client";

import GlobalProvider from "@/context/globalProvider";
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function ContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 500);
    }, []);

    if (!isReady)
        return (
            <div className="size-full flex items-center justify-center">
                <Loader />
            </div>
        );

    return <GlobalProvider>{children}</GlobalProvider>;
}
