import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#f4f4f5",
        brand: {
          DEFAULT: "#ccff00", // Electric Lime
          hover: "#b3e600",
          muted: "rgba(204, 255, 0, 0.15)",
          glow: "rgba(204, 255, 0, 0.35)",
        },
        dark: {
          950: "#09090b",
          900: "#111115",
          850: "#15151a",
          800: "#1c1c22",
          700: "#272730",
          600: "#3f3f4e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(204, 255, 0, 0.3)",
        "glow-lg": "0 0 45px -8px rgba(204, 255, 0, 0.45)",
        card: "0 8px 30px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
