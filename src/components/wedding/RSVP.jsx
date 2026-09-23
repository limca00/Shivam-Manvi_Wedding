import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";
import OrnamentalDivider from "./OrnamentalDivider";

const inputClass =
    "w-full rounded-md border bg-white/70 px-4 py-2.5 text-sm outline-none transition focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]/40";
const inputStyle = { borderColor: "rgba(201,162,75,0.4)", color: "#3A4A3C" };

export default function RSVP() {
    const [form, setForm] = useState({
        name: "",
        guests: "1",
        attendance: "Joyfully Accept",
        message: "",
    });
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error | notconnected

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const onSubmit = async (e) => {
        e.preventDefault();
        const endpoint = WEDDING_CONFIG.rsvpEndpoint;

        if (!endpoint) {
            console.warn(
                "RSVP endpoint not yet connected. Set rsvpEndpoint (and rsvpFieldMapping) in src/lib/weddingConfig.js to enable submissions."
            );
            setStatus("notconnected");
            return;
        }

        setStatus("submitting");
        try {
            // Apps Script web apps don't reliably send CORS headers back to the
            // browser even on success, so we fire the request opaquely (no-cors)
            // and treat a resolved fetch as success. text/plain avoids a CORS
            // preflight (OPTIONS), which Apps Script doesn't handle.
            await fetch(endpoint, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    name: form.name,
                    guests: form.guests,
                    attendance: form.attendance,
                    message: form.message,
                }),
            });
            setStatus("success");
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <section
            id="rsvp"
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
                Will You Join Us?
            </motion.h2>
            <OrnamentalDivider />

            <form
                onSubmit={onSubmit}
                className="max-w-lg mx-auto space-y-5"
                style={{ color: "#3A4A3C" }}
            >
                <div>
                    <label className="block text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#9B6A2E" }}>
                        Your Name
                    </label>
                    <input
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Full name"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#9B6A2E" }}>
                        Number of Guests
                    </label>
                    <select
                        value={form.guests}
                        onChange={(e) => update("guests", e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                    >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#9B6A2E" }}>
                        Attendance
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {["Joyfully Accept", "Regretfully Decline"].map((opt) => (
                            <label
                                key={opt}
                                className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-md border cursor-pointer transition"
                                style={{
                                    borderColor:
                                        form.attendance === opt ? "#C9A24B" : "rgba(201,162,75,0.4)",
                                    backgroundColor:
                                        form.attendance === opt ? "rgba(201,162,75,0.12)" : "rgba(255,255,255,0.6)",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="attendance"
                                    value={opt}
                                    checked={form.attendance === opt}
                                    onChange={(e) => update("attendance", e.target.value)}
                                    className="accent-[#C9A24B]"
                                />
                                <span className="text-sm">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#9B6A2E" }}>
                        Message for the Couple <span className="opacity-60">(optional)</span>
                    </label>
                    <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Send your blessings…"
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 rounded-full font-heading text-base tracking-wide transition disabled:opacity-60 shadow-sm"
                    style={{ backgroundColor: "#3A4A3C", color: "#FBF7F0" }}
                >
                    {status === "submitting" ? (
                        <span className="inline-flex items-center justify-center gap-2">
                            <Loader2 size={16} className="animate-spin" /> Sending…
                        </span>
                    ) : (
                        "Send Your RSVP"
                    )}
                </button>

                {status === "success" && (
                    <p className="flex items-center justify-center gap-2 text-sm" style={{ color: "#3A4A3C" }}>
                        <Check size={16} style={{ color: "#3A4A3C" }} />
                        Thank you! Your response has been received.
                    </p>
                )}
                {status === "error" && (
                    <p className="flex items-center justify-center gap-2 text-sm text-red-700">
                        <AlertCircle size={16} /> Something went wrong. Please try again.
                    </p>
                )}
                {status === "notconnected" && (
                    <p className="flex items-center justify-center gap-2 text-sm text-center" style={{ color: "#9B6A2E" }}>
                        <AlertCircle size={16} />
                        RSVP endpoint not yet connected — your details were not saved. Please check back soon.
                    </p>
                )}
            </form>
        </section>
    );
}