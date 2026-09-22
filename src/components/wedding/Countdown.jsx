import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";
import OrnamentalDivider from "./OrnamentalDivider";

function getTimeLeft(target) {
    const total = new Date(target).getTime() - Date.now();
    if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / (1000 * 60)) % 60),
        seconds: Math.floor((total / 1000) % 60),
        done: false,
    };
}

export default function Countdown() {
    const [time, setTime] = useState(() => getTimeLeft(WEDDING_CONFIG.weddingDate));

    useEffect(() => {
        const id = setInterval(
            () => setTime(getTimeLeft(WEDDING_CONFIG.weddingDate)),
            1000
        );
        return () => clearInterval(id);
    }, []);

    const units = [
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
    ];

    return (
        <section
            id="countdown"
            className="px-6 py-20 scroll-mt-16"
            style={{ backgroundColor: "#FBF7F0" }}
        >
            <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="text-center font-heading text-3xl sm:text-4xl"
                style={{ color: "#3A4A3C" }}
            >
                Counting down to our forever
            </motion.h2>
            <OrnamentalDivider />

            {time.done ? (
                <p
                    className="text-center font-calligraphy text-4xl"
                    style={{ color: "#9B6A2E" }}
                >
                    The day is here!
                </p>
            ) : (
                <div className="flex justify-center gap-3 sm:gap-5 max-w-xl mx-auto">
                    {units.map((u) => (
                        <div
                            key={u.label}
                            className="flex-1 flex flex-col items-center px-2 py-5 sm:py-7 rounded-md border border-[#C9A24B]/30 bg-white/60 shadow-sm"
                        >
                            <span
                                className="font-heading text-3xl sm:text-5xl tabular-nums"
                                style={{ color: "#3A4A3C" }}
                            >
                                {String(u.value).padStart(2, "0")}
                            </span>
                            <span
                                className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em]"
                                style={{ color: "#9B6A2E" }}
                            >
                                {u.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}