"use client";

import { SignUp } from "@clerk/nextjs";

export default function Signup() {
    return (
        <div className="size-full flex justify-center items-center">
            <SignUp />
        </div>
    );
}
