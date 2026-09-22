import React from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, CalendarPlus } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";
import OrnamentalDivider from "./OrnamentalDivider";

// Generate a downloadable .ics file from the config.
function buildIcs() {
    const start = new Date(WEDDING_CONFIG.weddingDate);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const fmt = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const title = `${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName} Wedding`;
    const desc = `${WEDDING_CONFIG.eventDetails.title} — ${WEDDING_CONFIG.weddingDateDisplay}`;
    const loc = `${WEDDING_CONFIG.venueName}, ${WEDDING_CONFIG.venueAddress}`;
    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Manvi Shivam Wedding//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@manvi-shivam`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${desc}`,
        `LOCATION:${loc}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
}

function downloadIcs() {
    const blob = new Blob([buildIcs()], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manvi-shivam-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
}

export default function Venue() {
    return (
        <section
            id="venue"
            className="px-6 py-20 scroll-mt-16"
            style={{ backgroundColor: "#F4EFE3" }}
        >
            <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="text-center font-heading text-3xl sm:text-4xl"
                style={{ color: "#3A4A3C" }}
            >
                The Venue
            </motion.h2>
            <OrnamentalDivider />

            <div className="max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center mb-3" style={{ color: "#9B6A2E" }}>
                    <MapPin size={20} />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl mb-2" style={{ color: "#3A4A3C" }}>
                    {WEDDING_CONFIG.venueName}
                </h3>
                <p className="text-base sm:text-lg mb-1" style={{ color: "#6B5B47" }}>
                    {WEDDING_CONFIG.venueAddress}
                </p>
                <p className="text-sm mb-6" style={{ color: "#9B6A2E" }}>
                    {WEDDING_CONFIG.weddingDateDisplay} · {WEDDING_CONFIG.weddingTime}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    <a
                        href={WEDDING_CONFIG.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition"
                        style={{
                            borderColor: "#C9A24B",
                            color: "#3A4A3C",
                            backgroundColor: "rgba(255,255,255,0.6)",
                        }}
                    >
                        <MapPin size={15} /> View on Google Maps
                        <ExternalLink size={13} className="opacity-60" />
                    </a>
                    <button
                        onClick={downloadIcs}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition"
                        style={{
                            borderColor: "#C9A24B",
                            color: "#3A4A3C",
                            backgroundColor: "rgba(255,255,255,0.6)",
                        }}
                    >
                        <CalendarPlus size={15} /> Add to Calendar
                    </button>
                </div>

                {/* Embedded map */}
                <div
                    className="rounded-lg overflow-hidden border shadow-sm"
                    style={{ borderColor: "rgba(201,162,75,0.4)" }}
                >
                    <iframe
                        title="Venue map"
                        src={WEDDING_CONFIG.mapEmbedUrl}
                        className="w-full h-64 sm:h-80"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}