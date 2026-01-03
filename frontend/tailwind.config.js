/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        spotify: {
          green: "#4cce54ff",
          dark: "#121212",
          darker: "#0b0b0b",
          card: "#181818",
          hover: "#282828",
        },
      },

      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        fadeIn: "fadeIn 0.6s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
      },

      keyframes: {
        glow: {
          "0%": {
            boxShadow: "0 0 10px rgba(29,185,84,0.4)",
          },
          "100%": {
            boxShadow: "0 0 30px rgba(29,185,84,0.9)",
          },
        },

        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },

      boxShadow: {
        spotify: "0 8px 24px rgba(0,0,0,0.5)",
        glow: "0 0 20px rgba(29,185,84,0.6)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
