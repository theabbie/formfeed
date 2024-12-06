"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
    const [isAnimating, setIsAnimating] = useState<Boolean>(false);
    const router = useRouter();

    const createForm = () => {
        setIsAnimating(true);
        axios<{ success: Boolean, form: { _id: String } }>({
            url: "/api/create",
            method: "POST",
            data: { title: "Untitled Form", description: "" }
        }).then((response) => {
            if (response.data.success) {
                router.push("/form/" + response.data.form._id);
            }
        })
    };

    return (
        <section className="bg-white">
            <div
                className={`py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 transition-all duration-1500 ${isAnimating ? "-translate-y-full opacity-0" : "opacity-100"
                    }`}
            >
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                    Build Forms Seamlessly
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                    Formfeed allows you to create stunning forms effortlessly
                </p>
                <div className="relative inline-flex mb-8 flex-row justify-center">
                    <a
                        onClick={createForm}
                        className="inline-flex cursor-pointer justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 transition-all"
                    >
                        Get Started
                    </a>
                    <span className="absolute flex h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                </div>
            </div>
        </section>
    );
}