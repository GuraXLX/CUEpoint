/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        primary: "#6366f1", // Indigo 500
        secondary: "#a855f7", // Purple 500
        accent: "#ec4899", // Pink 500
        card: "#18181b", // Zinc 900
        "card-hover": "#27272a", // Zinc 800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
