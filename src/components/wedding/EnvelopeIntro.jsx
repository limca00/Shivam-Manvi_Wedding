import React, { useState, useEffect, useRef } from "react";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";

// Opening page: a framed card showing the sealed envelope with a "Tap to
// Break the Seal" button. Tapping plays the unboxing video (seal cracks,
// envelope opens, invitation card reveals, fades to the M&S mark) inside
// that same frame; when the video ends, the main site opens. The frame is
// sized to the video's own 16:9 ratio so nothing is ever cropped or
// letterboxed. Respects prefers-reduced-motion by skipping straight to
// the site.

const STRIPE_BG = {
    backgroundColor: "#F6F0E4",
    backgroundImage: "repeating-linear-gradient(90deg, #F6F0E4 0 44px, #E8DFC9 44px 88px)",
};

export default function EnvelopeIntro({ onOpen, onUserGesture }) {
    const [started, setStarted] = useState(false);
    const [reduced, setReduced] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        if (mq.matches) {
            const t = setTimeout(onOpen, 700);
            return () => clearTimeout(t);
        }
    }, [onOpen]);

    const handleTap = () => {
        onUserGesture?.();
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {
                // Autoplay-with-sound was blocked — fall back to a muted
                // play so the intro still proceeds instead of stalling.
                video.muted = true;
                video.play().catch(onOpen);
            });
        }
        setStarted(true);
    };

    // Only let a playback error skip ahead once the video is actually meant
    // to be playing — the element is mounted (unstarted, muted, paused)
    // before the tap purely so play() can fire synchronously on click, and
    // any preload hiccup during that idle phase must not skip the intro
    // before the visitor ever sees it.
    const handleVideoError = () => {
        if (started) onOpen();
    };

    if (reduced) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center animate-fade-in" style={STRIPE_BG}>
                <p className="font-calligraphy text-5xl" style={{ color: "#7D1F3A" }}>
                    {WEDDING_CONFIG.brideName} &amp; {WEDDING_CONFIG.groomName}
                </p>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 overflow-hidden"
            style={STRIPE_BG}
        >
            <div
                className="relative w-full rounded-xl overflow-hidden shadow-2xl"
                style={{ maxWidth: 560, aspectRatio: "16 / 9" }}
            >
                {/* Video is always mounted so play() fires synchronously inside
                    the click handler — required by browsers to allow audio
                    autoplay. */}
                <video
                    ref={videoRef}
                    src="/videos/envelope-opening.mp4"
                    playsInline
                    preload="auto"
                    onEnded={onOpen}
                    onError={handleVideoError}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    style={{ opacity: started ? 1 : 0 }}
                />

                {!started && (
                    <img
                        src="/images/envelope-poster.jpg"
                        alt="Sealed wedding invitation envelope"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {started && (
                    <button
                        onClick={onOpen}
                        className="absolute top-3 right-3 z-10 text-[11px] uppercase tracking-[0.15em] underline underline-offset-4 text-white/80 hover:text-white transition"
                    >
                        Skip
                    </button>
                )}
            </div>

            {!started && (
                <div className="mt-8 flex flex-col items-center">
                    <button
                        onClick={handleTap}
                        className="px-10 py-3.5 rounded-full font-heading text-sm tracking-[0.25em] uppercase transition hover:brightness-110 active:scale-95"
                        style={{
                            backgroundColor: "#7D1F3A",
                            color: "#FFFFFF",
                            boxShadow: "0 10px 22px -8px rgba(74,16,32,0.6)",
                        }}
                    >
                        Open with Love
                    </button>
                    <button
                        onClick={onOpen}
                        className="mt-4 text-[11px] underline underline-offset-4 transition hover:opacity-100 opacity-70"
                        style={{ color: "#2E1A14" }}
                    >
                        Skip intro
                    </button>
                </div>
            )}
        </div>
    );
}
