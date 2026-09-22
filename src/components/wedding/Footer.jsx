import React from "react";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";

export default function Footer({ onReplayIntro }) {
    return (
        <footer
            className="px-6 py-10 text-center"
            style={{ backgroundColor: "#F4EFE3", color: "#6B5B47" }}
        >
            <p className="font-calligraphy text-3xl mb-1" style={{ color: "#9B6A2E" }}>
                {WEDDING_CONFIG.brideName} &amp; {WEDDING_CONFIG.groomName}
            </p>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#9B6A2E" }}>
                {WEDDING_CONFIG.weddingDateDisplay}
            </p>
            <button
                onClick={onReplayIntro}
                className="text-xs underline underline-offset-4 opacity-70 hover:opacity-100 transition"
            >
                Replay invitation intro
            </button>
        </footer>
    );
}