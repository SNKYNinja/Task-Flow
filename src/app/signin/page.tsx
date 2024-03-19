"use client";

import { SignIn } from "@clerk/nextjs";

export default function Signin() {
    return (
        <div className="size-full flex justify-center items-center">
            <SignIn />
        </div>
    );
}
