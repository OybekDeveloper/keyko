/* eslint-disable import/no-anonymous-default-export */

import { Open_Sans } from "next/font/google";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        Open_Sans: ['"Open Sans"', "sans-serif"], // "Open Sans" shrift
        Abril: ['"Abril Fatface"', "sans-serif"], // "Abril Fatface" shrift
        Poppins: ['"Poppins"', "sans-serif"], // "Poppins" shrift
        Inter: ['"Inter"', "sans-serif"], // "Inter" shrift
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        text: {
          DEFAULT: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          thin: "hsl(var(--thin))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        ten: "10px",
        "3xl": "30px",
        "10xl": "100px",
      },
      fontSize: {
        "2xl": "25px",
        "4xl": "45px",
      },
      boxShadow: {
        "box": "0px 10px 25px 0px rgba(0, 0, 0, 0.07)",
      },
      backgroundImage: {
        "header-gradient":
          "linear-gradient(to right, rgba(52, 78, 65, 0.95), rgba(0, 0, 0, 0.13))",
        "reels-gradient":
          "linear-gradient(to top, rgba(52, 78, 65, 0.83),rgba(0, 0, 0, 0.04))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
