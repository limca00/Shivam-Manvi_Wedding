import React from "react";
import { Music, Share2, X } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";

export default function FloatingButtons({ playing, onToggle }) {
    const handleShare = async () => {
        const url = window.location.href;
        const message = WEDDING_CONFIG.whatsappShareMessage.replace(
            "[WEBSITE_URL]",
            url
        );
        if (navigator.share) {
            try {
                await navigator.share({ title: "Manvi & Shivam — Wedding Invitation", text: message, url });
            } catch { }
        } else {
            window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                "_blank",
                "noopener,noreferrer"
            );
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
            <button
                onClick={onToggle}
                aria-label={playing ? "Pause music" : "Play music"}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-md transition hover:scale-105"
                style={{ backgroundColor: "#3A4A3C", color: "#FBF7F0" }}
            >
                {playing ? <X size={18} /> : <Music size={18} />}
            </button>
            <button
                onClick={handleShare}
                aria-label="Share invitation"
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-md transition hover:scale-105"
                style={{ backgroundColor: "#9B6A2E", color: "#FBF7F0" }}
            >
                <Share2 size={18} />
            </button>
        </div>
    );
}
