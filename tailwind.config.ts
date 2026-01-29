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
      colors: {
        // CSS-variable driven color system.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(280 80% 70%)",
          dark: "hsl(280 70% 40%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        // Global font stack; used via `font-sans`.
        sans: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Semantic type scale.
        h1plus: ["clamp(4rem, 23vw, 25rem)", { lineHeight: "0.7", fontWeight: "400", letterSpacing: "-0.08em" }],
        h1: ["2.25rem", { lineHeight: "1.15", fontWeight: "400" }],
        h2: ["1.5rem", { lineHeight: "1.3", fontWeight: "400" }],
        h3: ["1.25rem", { lineHeight: "1.35", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "350" }],
        bodysmall: ["0.775rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "350" }],
      },
      borderRadius: {
        // Use CSS variables so radius is themeable.
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Accordion animations (Radix).
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        // Accordion animation shortcuts.
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // Tailwind plugins and shared component utilities.
  plugins: [
    require("tailwindcss-animate"),
    function ({ addComponents, addUtilities }: PluginAPI) {
      addComponents({
        ".bg-top-splotches": {
          backgroundImage:
            "radial-gradient(95% 105% at 12% 0%, rgba(222, 11, 197, 0.75) 0%, rgba(222, 11, 197, 0) 75%), radial-gradient(100% 110% at 50% -2%, rgba(222, 11, 197, 0.6) 0%, rgba(222, 11, 197, 0) 76%), radial-gradient(105% 115% at 88% 0%, rgba(255, 106, 0, 0.75) 0%, rgba(255, 106, 0, 0) 75%)",
          filter: "blur(12px)",
          transform: "translateZ(0)",
        },
      });
      addUtilities({
        ".text-bodysmall": {
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
      });
    },
  ],
} satisfies Config;
