/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        primary: "0px 0px 23px 0px #9494942B",
      },
      colors: {
        brand: {
          violet: "#8b5cf6",
          indigo: "#6366f1",
          bg: "#0f0f1a",
          card: "#1a1a2e",
        },
      },
    },
  },
  plugins: [],
};
