// ============================================================
// WEDDING CONFIG — single source of truth for the whole site.
// Edit values here; every section renders from this object.
// ============================================================

export const WEDDING_CONFIG = {
    // --- Couple ---
    brideName: "Manvi",
    groomName: "Shivam",
    envelopeInitials: "M & S",

    // --- Opening text ---
    openingLine: "Om Shri Ganeshay Namah",
    welcomeTagline: "Welcome you all to the wedding",

    // --- Event date & time (ISO string — drives countdown + .ics) ---
    weddingDate: "2027-01-25T11:00:00",
    weddingTime: "7:00 PM onwards",
    weddingDateDisplay: "25 January 2027",

    // --- Venue ---
    venueName: "Royal Ambience Party Lawn",
    venueAddress: "Indirapuram, Ghaziabad, Uttar Pradesh 201014",
    googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Royal+Ambience+Party+Lawn+Indirapuram",
    mapEmbedUrl:
        "https://maps.google.com/maps?q=Royal%20Ambience%20Party%20Lawn%20Indirapuram&output=embed",

    // --- Hero ---
    heroImage: "/images/couple-portrait.jpg",
    heroMessage: "We can't wait to celebrate this special day with you!",

    // --- Gallery ---
    galleryImages: [],

    // --- Story / about ---
    storyText:
        "Two souls, one journey. Surrounded by the love of their families, Manvi and Shivam invite you to witness the beginning of their forever — a celebration of love, laughter, and happily ever after.",

    // --- Event details ---
    eventDetails: {
        title: "The Wedding Ceremony",
        date: "25 January 2027",
        time: "7:00 PM onwards",
        venue: "Royal Ambience Party Lawn, Indirapuram",
    },

    // --- Family ---
    familyNames: {
        brideFamily: "Daughter of Katia Family",
        groomFamily: "Son of kalra Family",
    },

    // --- RSVP (Google Apps Script web app) ---
    rsvpEndpoint:
        "https://script.google.com/macros/s/AKfycbxhtWGFu9Czi7l5RE4XiaO4BAEJ7SEE0zUV_7Tj739k0Z1nAajbYuLa72c7en-SWa59fw/exec",

    // --- Share ---
    whatsappShareMessage:
        "We're getting married! We would love for you to be part of our special day. View our wedding invitation: [WEBSITE_URL]",

    // --- Music ---
    musicFilePath: "/audio/wedding-music.mp3",
};
