import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Original Brown & Gold palette
        "brand-brown-dark": "var(--brand-brown-dark)",
        "brand-brown": "var(--brand-brown)",
        "brand-brown-light": "var(--brand-brown-light)",
        "brand-gold": "var(--brand-gold)",
        "brand-gold-light": "var(--brand-gold-light)",
        // Legacy color mappings for backward compatibility
        "brand-green-dark": "var(--brand-green-dark)",
        "brand-green": "var(--brand-green)",
        "brand-green-light": "var(--brand-green-light)",
        "brand-orange": "var(--brand-orange)",
        "brand-orange-light": "var(--brand-orange-light)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        "great-vibes": ["var(--font-great-vibes)", "cursive"],
      },
    },
  },
};

export default config;
