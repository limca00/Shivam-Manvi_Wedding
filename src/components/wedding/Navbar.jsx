import React from "react";

export default function Navbar({ onHero = false }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (onHero) {
    return (
      <nav
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5"
        style={{ background: "transparent" }}
      >
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.9rem", color: "#f0d99a", textDecoration: "none", lineHeight: 1 }}
          aria-label="Manvi & Shivam — home"
        >
          M&amp;S
        </a>
        <div className="flex items-center gap-7">
          {["hero", "rsvp"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ fontFamily: "Montserrat,sans-serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", background: "transparent", border: "none", cursor: "pointer" }}
            >
              {id === "hero" ? "Home" : "RSVP"}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="navbar"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
    >
      <a
        href="#hero"
        className="navbar-logo"
        onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
        aria-label="Manvi & Shivam — home"
      >
        M&amp;S
      </a>
      <div style={{ display: "flex", gap: "1.75rem" }}>
        {["hero", "rsvp"].map((id) => (
          <button key={id} onClick={() => scrollTo(id)}
            style={{ fontFamily: "Montserrat,sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A24B", background: "transparent", border: "none", cursor: "pointer" }}
          >
            {id === "hero" ? "Home" : "RSVP"}
          </button>
        ))}
      </div>
    </nav>
  );
}
