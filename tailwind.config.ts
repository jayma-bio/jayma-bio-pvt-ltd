import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const svgToDataUri = require("mini-svg-data-uri");
import { withUt } from "uploadthing/tw";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontWeight: {
        "bold-custom": "850",
        "extra-bold-custom": "1000",
      },
      fontFamily: {
        dmSans: ["var(--font-dmSans)", "sans"],
        kotka: ["var(--font-kotka)", "sans"],
        mocha: ["var(--font-mocha)", "sans"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        dark: "#000000",
        lightGreen: "#D9E6BA",
        green: "#0D2A25",
        lightText:"#A7A5A5",
        separator:"#D9D9D9",
        rating:'#DF7A10',
        primary: {
          DEFAULT: "#0D2A25",
          foreground: "hsl(var(--primary-foreground))",
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
      },
      fontSize: {
        medium: "16px",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        updown: {
          "from, to": {
            transform: "translateY(-20px)",
          },
          "50%": {
            transform: "translateY(20px)",
          },
        },
        light: {
          "from, to": {
            opacity: "0.7",
          },
          "50%": {
            opacity: "1",
          },
        },
        stroke: {
          from: {
            "stroke-dasharray": "1000",
          },
          to: {
            "stroke-dasharray": "1000",
            "stroke-dashoffset": "2000",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        flashing: {
          "0%, 100%": { opacity: "0.2" },
          "20%": { opacity: "1" },
        },
        "logo-cloud": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 4rem))" },
        },
        smoothSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        zoom: {
          "0%": {
            transform: "scale(1)",
          },
          " 50%": {
            transform: "scale(1.2)",
          },
          " 100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        stroke: "stroke 5s linear infinite",
        light: "light 2s ease-in-out infinite",
        updown: "updown 3s ease-in-out infinite",
        "logo-cloud": "logo-cloud 30s linear infinite",
        scroll:
          "scroll var(--animation-duration, 30s) var(--animation-direction, forwards) linear infinite",
        flashing: "flashing 1.4s infinite linear",
        smoothSpin: "smoothSpin 8s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        zoom: "zoom 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default withUt(config);
