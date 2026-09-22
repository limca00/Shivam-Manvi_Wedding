import React from "react";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";

export default function LoadingScreen() {
    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#FBF7F0" }}
        >
            <div className="relative w-16 h-16">
                <span
                    className="absolute inset-0 rounded-full border-2 animate-spin-slow"
                    style={{ borderColor: "#C9A24B transparent #C9A24B transparent" }}
                />
                <span
                    className="absolute inset-2 rounded-full border animate-spin-slow"
                    style={{ borderColor: "transparent #C9A24B transparent #C9A24B", animationDirection: "reverse" }}
                />
            </div>
            <p className="mt-6 font-calligraphy text-3xl" style={{ color: "#9B6A2E" }}>
                {WEDDING_CONFIG.brideName} &amp; {WEDDING_CONFIG.groomName}
            </p>
        </div>
    );
}