"use client";

import { useGlobalState } from "@/context/globalProvider";

export default function Modal({ children }: { children: React.ReactNode }) {
    const { closeModal } = useGlobalState();
    return (
        <div className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center">
            <div
                onClick={closeModal}
                className="absolute top-0 left-0 w-full h-screen bg-black/45 backdrop-blur-[1px]"
            ></div>
            <div className="my-0 mx-4 relative p-8 max-w-[640px] w-full z-[100] rounded-2xl bg-[#212121] shadow-modal modal-font">
                {children}
            </div>
        </div>
    );
}
