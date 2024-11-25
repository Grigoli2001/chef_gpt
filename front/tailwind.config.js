import { light } from "@mui/material/styles/createPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#63b3ed", // Light shade
          DEFAULT: "#4299e1", // Default shade
          dark: "#3182ce", // Dark shade
        },
        secondary: {
          light: "#fbd38d",
          DEFAULT: "#f6ad55",
          dark: "#ed8936",
        },
        customGray: {
          light: "#f7fafc",
          DEFAULT: "#edf2f7",
          dark: "#e2e8f0",
        },
        background: {
          DEFAULT: "#121212",
          light: "#181818",
          dark: "#060606",
        },
        backgroundGray: {
          DEFAULT: "#1f2937",
          light: "#2a2a2a",
          dark: "#1e1e1e",
        },
        backgroundLightGray: {
          DEFAULT: "#2a3241",
          light: "#374151",
          dark: "#252d3d",
        },
        // Single Custom Colors
        success: "#48bb78",
        danger: "#e53e3e",
        warning: "#ecc94b",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
