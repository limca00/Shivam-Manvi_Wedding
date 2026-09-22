import React, { useState, useEffect, useRef } from "react";
import LoadingScreen from "@/components/wedding/LoadingScreen";
import EnvelopeIntro from "@/components/wedding/EnvelopeIntro";
import Navbar from "@/components/wedding/Navbar";
import Hero from "@/components/wedding/Hero";
import Countdown from "@/components/wedding/Countdown";
import Venue from "@/components/wedding/Venue";
import Footer from "@/components/wedding/Footer";
import FloatingButtons from "@/components/wedding/FloatingButtons";
import { WEDDING_CONFIG } from "@/lib/weddingConfig";

const INTRO_KEY = "ms_wedding_intro_seen";
const MUSIC_KEY = "ms_wedding_music";
const MUSIC_VOLUME = 0.5;

export default function Invitation() {
    const [loading, setLoading] = useState(true);
    const [introDone, setIntroDone] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(() => {
        const saved = localStorage.getItem(MUSIC_KEY);
        return saved === null ? true : saved === "true";
    });
    const audioRef = useRef(null);

    // Brief loading screen
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1300);
        return () => clearTimeout(t);
    }, []);

    // Repeat visitors skip straight to the invitation
    useEffect(() => {
        if (localStorage.getItem(INTRO_KEY) === "true") setIntroDone(true);
    }, []);

    // Must run synchronously inside the intro's own click handler — Safari/iOS
    // only allows audio.play() to start unmuted playback when it's called
    // directly within a genuine user gesture's call stack, not from a effect
    // that fires after a later state update. Volume starts at 0 so it doesn't
    // clash with the intro video's own audio; fadeInMusic brings it up once
    // the intro finishes.
    const startMusicFromGesture = () => {
        const audio = audioRef.current;
        if (!audio || !musicPlaying) return;
        audio.volume = 0;
        audio.play().catch(() => { });
    };

    const fadeInMusic = () => {
        const audio = audioRef.current;
        if (!audio || !musicPlaying) return;
        const rampVolume = () => {
            let v = audio.volume || 0;
            const fade = setInterval(() => {
                v = Math.min(MUSIC_VOLUME, v + 0.05);
                audio.volume = v;
                if (v >= MUSIC_VOLUME) clearInterval(fade);
            }, 60);
        };
        if (audio.paused) {
            audio.volume = 0;
            audio.play().then(rampVolume).catch(() => { });
        } else {
            rampVolume();
        }
    };

    const handleOpen = () => {
        localStorage.setItem(INTRO_KEY, "true");
        setIntroDone(true);
        fadeInMusic();
    };

    const replayIntro = () => {
        localStorage.removeItem(INTRO_KEY);
        setIntroDone(false);
        window.scrollTo(0, 0);
    };

    // Reacts to the visitor toggling the floating music button once the site
    // is open — initial playback is started above, from the intro's own gesture.
    useEffect(() => {
        if (!introDone) return;
        const audio = audioRef.current;
        if (!audio) return;
        if (musicPlaying) {
            if (audio.paused) audio.play().then(fadeInMusic).catch(() => { });
        } else {
            audio.pause();
        }
        localStorage.setItem(MUSIC_KEY, String(musicPlaying));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicPlaying, introDone]);

    return (
        <>
            <audio ref={audioRef} src={WEDDING_CONFIG.musicFilePath} loop preload="auto" />

            {loading ? (
                <LoadingScreen />
            ) : !introDone ? (
                <EnvelopeIntro onOpen={handleOpen} onUserGesture={startMusicFromGesture} />
            ) : (
                <div
                    className="min-h-screen overflow-x-hidden"
                    style={{ backgroundColor: "#FBF7F0", color: "#3A4A3C" }}
                >
                    <Navbar />
                    <main>
                        <Hero />
                        <Countdown />
                        <Venue />
                    </main>
                    <Footer onReplayIntro={replayIntro} />
                    <FloatingButtons
                        playing={musicPlaying}
                        onToggle={() => setMusicPlaying((p) => !p)}
                    />
                </div>
            )}
        </>
    );
}
