"use client";

import { menu } from "@/config/menu";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import { usePathname, useRouter as useBaseRouter } from "next/navigation";
import * as NProgress from "nprogress";

import { Icons } from "./icons";

import { UserButton, useClerk, useUser } from "@clerk/nextjs";

import "./userButton.css";

// Workaround for the issue with the `useRouter` hook not working with nextjs-toploader
function useRouter() {
    const router = useBaseRouter();
    const { push } = router;

    router.push = async (...args: Parameters<typeof push>) => {
        NProgress.start();
        return push(...args);
    };

    return router;
}

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { signOut } = useClerk();

    const { user } = useUser();

    const { firstName, lastName, imageUrl } = user || {
        firstName: "",
        lastName: "",
        imageUrl: "/profile.jpg",
    };

    const handleClick = (link: string) => {
        router.push(link);
    };

    const handleSignout = () => {
        signOut(() => router.push("/signin"));
    };

    return (
        <nav className="nav">
            <div className="m-6 py-4 px-3 relative rounded-2xl cursor-pointer text-[#f8f8f8] flex items-center font-medium group">
                <div className="absolute top-0 left-0 size-full backdrop-blur-[10px] z-0 bg-[#EDEDED] dark:bg-[#181818] transition-all duration-500 rounded-2xl border-2 border-border opacity-20 group-hover:opacity-100"></div>
                <div className="flex-shrink-0 inline-block overflow-hidden transition-all duration-500 ease-in rounded-full relative z-10">
                    <Image
                        width={70}
                        height={70}
                        className="transition-all duration-500 ease-in hover:scale-110"
                        src={imageUrl}
                        alt="profile"
                    />
                </div>
                <div className=" absolute z-20 top-0 size-full">
                    <UserButton />
                </div>
                <h1 className="text-xl flex flex-col relative z-10 capitalize ml-3 sidebar-heading leading-[100%] text-[#181818] dark:text-white">
                    {firstName}
                </h1>
            </div>
            <ul>
                {menu.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => handleClick(item.link)}
                        className={cn(
                            "relative pt-[0.8rem] pr-4 pb-[0.9rem] pl-[2.1rem] my-[0.3rem] mx-0 sidebar-grid cursor-pointer items-center after:absolute after:content-[''] after:left-0 after:top-0 after:w-0 after:h-full after:bg-active-link-hover after:z-10 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full before:absolute before:content-[''] before:right-0 before:top-0 before:w-0 before:h-full before:bg-green-600 before:rounded-bl-md before:rounded-tl-md",
                            pathname === item.link &&
                                "bg-active-link before:w-[0.3rem] text-icon"
                        )}
                    >
                        <item.icon
                            className={cn(
                                pathname === item.link && "text-icon"
                            )}
                        />
                        <Link href={item.link}>{item.title}</Link>
                    </li>
                ))}
            </ul>
            <div className="relative m-6  transition-all ease-in-out hover:text-[#181818] dark:hover:text-[#f8f8f8]">
                <button
                    className="relative flex items-center z-10 cursor-pointer transition-all ease-in-out py-1 px-3 rounded-xl mx-auto"
                    onClick={handleSignout}
                >
                    <Icons.logout className="text-xl mr-4" />
                    Signout
                </button>
            </div>
        </nav>
    );
}
