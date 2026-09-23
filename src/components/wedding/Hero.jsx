import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";

const CREAM = "#FBF7F0";
const GOLD = "#C9A24B";
const GOLD_DEEP = "#9B6A2E";
const GOLD_SHADOW = "0 2px 14px rgba(0,0,0,0.55)";
const GOLD_DEEP_SHADOW = "0 1px 3px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)";

export default function Hero() {
    const { brideName, groomName } = WEDDING_CONFIG;

    return (
        <section
            id="hero"
            className="relative min-h-[100svh] w-full overflow-hidden scroll-mt-16"
            style={{ backgroundColor: CREAM }}
        >
            {/* Full-bleed background photo on every screen size.
                Served as optimized WebP (207 KB desktop / 94 KB mobile)
                with fetchpriority="high" so the fetch happens in parallel
                with the JS bundle — no useSize measurement delay. */}
            <picture className="absolute inset-0 w-full h-full">
                {/* Mobile: ≤ 639 px — 94 KB WebP */}
                <source
                    srcSet="/images/couple-portrait-mobile.webp"
                    type="image/webp"
                    media="(max-width: 639px)"
                />
                {/* Desktop: ≥ 640 px — 207 KB WebP */}
                <source
                    srcSet="/images/couple-portrait.webp"
                    type="image/webp"
                    media="(min-width: 640px)"
                />
                {/* Fallback for browsers without WebP support */}
                <img
                    src={WEDDING_CONFIG.heroImage}
                    alt={`${brideName} and ${groomName} — couple portrait`}
                    fetchpriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "70% 55%" }}
                />
            </picture>


            {/* Legibility gradient so the overlaid gold text stays readable everywhere —
                deeper than a near-white treatment needs, since gold has less
                luminance contrast against a bright photo */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70 pointer-events-none" />

            {/* Overlay text — same content/order on every breakpoint, just scaled up on larger screens */}
            <div className="relative z-10 min-h-[100svh] flex flex-col justify-between">
                <div className="pt-16 sm:pt-20 px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="tracking-[0.3em] sm:tracking-[0.35em] text-[11px] sm:text-sm uppercase font-medium"
                        style={{ color: GOLD, textShadow: GOLD_SHADOW }}
                    >
                        {WEDDING_CONFIG.openingLine}
                    </motion.p>
                </div>

                <div className="flex-1 flex items-center justify-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                        className="text-center leading-none"
                        style={{
                            color: GOLD,
                            fontFamily: "'Pinyon Script', 'Great Vibes', cursive",
                            textShadow: "0 3px 18px rgba(0,0,0,0.6)",
                        }}
                    >
                        <span className="block text-7xl sm:text-8xl md:text-9xl">{brideName}</span>
                        <span
                            className="block text-3xl sm:text-4xl my-1 font-heading"
                            style={{ color: GOLD_DEEP, letterSpacing: "0.2em" }}
                        >
                            &amp;
                        </span>
                        <span className="block text-7xl sm:text-8xl md:text-9xl">{groomName}</span>
                    </motion.h1>
                </div>

                <div className="pb-24 sm:pb-16 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <p
                            className="text-xl sm:text-2xl mb-4"
                            style={{
                                color: GOLD,
                                fontFamily: "'Mrs Saint Delafield', 'Great Vibes', cursive",
                                textShadow: GOLD_SHADOW,
                            }}
                        >
                            {WEDDING_CONFIG.welcomeTagline}
                        </p>
                        <p
                            className="tracking-[0.35em] text-xs sm:text-sm uppercase mb-3"
                            style={{
                                color: GOLD_DEEP,
                                fontFamily: "'Cinzel', serif",
                                fontWeight: 700,
                                textShadow: GOLD_DEEP_SHADOW,
                            }}
                        >
                            Save the Date
                        </p>
                        <p
                            className="text-3xl sm:text-4xl mb-5"
                            style={{
                                color: GOLD,
                                fontFamily: "'Mrs Saint Delafield', 'Great Vibes', cursive",
                                textShadow: GOLD_SHADOW,
                            }}
                        >
                            {WEDDING_CONFIG.weddingDateDisplay}
                        </p>
                        <p
                            className="font-heading text-sm sm:text-base italic max-w-md mx-auto"
                            style={{ color: GOLD, textShadow: GOLD_SHADOW }}
                        >
                            {WEDDING_CONFIG.heroMessage}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 8, 0] }}
                        transition={{
                            opacity: { duration: 1, delay: 1.6 },
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        }}
                        className="mt-10 flex justify-center"
                    >
                        <ChevronDown size={26} strokeWidth={1.2} style={{ color: GOLD }} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
