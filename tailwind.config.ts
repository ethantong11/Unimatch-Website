import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

export default {
  darkMode: ["class"],
  // Scan these paths for Tailwind class usage.
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      zIndex: {
        // Semantic layering scale.
        background: "0",
        content: "10",
        menu: "30",
        header: "40",
        transition: "50",
        cursor: "10000",
      },
      colors: {
        // CSS-variable driven color system.
        background: "var(--background)",
        border: "var(--border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        "surface-strong-foreground": "var(--surface-strong-foreground)",
        glass: "var(--glass-surface)",
        "glass-subtle": "var(--glass-surface-subtle)",
        "glass-hover": "var(--glass-surface-hover)",
        "glass-border": "var(--glass-border)",
        "glass-border-strong": "var(--glass-border-strong)",
        "outline-subtle": "var(--outline-subtle)",
        "menu-foreground": "var(--menu-foreground)",
        support: "var(--support-bg)",
        "support-splotch-1": "var(--support-splotch-1)",
        "support-splotch-2": "var(--support-splotch-2)",
        "support-splotch-3": "var(--support-splotch-3)",
      },
      fontFamily: {
        // Global font stack; used via `font-sans`.
        sans: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Semantic type scale.
        h1plus: ["clamp(4rem, 23vw, 25rem)", { lineHeight: "0.7", fontWeight: "400", letterSpacing: "-0.08em" }],
        h1: ["clamp(2.25rem, 7vw, 15rem)", { lineHeight: "1.15", fontWeight: "400", letterSpacing: "-0.05em"  }],
        h2: ["clamp(1.5rem, 3vw, 10rem)", { lineHeight: "1.15", fontWeight: "400", letterSpacing: "-0.05em"  }],
        h3: ["1.3rem", { lineHeight: "1.35", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "350" }],
        bodysmall: ["0.775rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "350" }],
      },
      borderRadius: {
        // Use CSS variables so radius is themeable.
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // Tailwind plugins and shared component utilities.
  plugins: [
    require("tailwindcss-animate"),
    function ({ addComponents, addUtilities }: PluginAPI) {
      addComponents({});
      addUtilities({});
    },
  ],
} satisfies Config;
