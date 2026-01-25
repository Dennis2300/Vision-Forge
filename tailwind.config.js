/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        acme: ["var(--font-acme)", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        quaternary: "var(--quaternary)",

        text: "var(--text)",

        filter: "var(--filter-color)",
        "filter-hover": "var(--filter-color-hover)",
        "filter-active": "var(--filter-color-active)",

        footer: "#0b192c",
      },
    },
  },
  plugins: [require("daisyui")],
};
