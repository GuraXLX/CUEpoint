/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F", // Near Black (from reference)
        foreground: "#FFFFFF", // Pure White
        primary: {
          DEFAULT: "#D4FF00", // Neon Yellow-Green (from reference)
          glow: "rgba(212, 255, 0, 0.4)",
          foreground: "#000000", // Black text on primary background
        },
        accent: {
          DEFAULT: "#FF8C00", // Dark Orange (secondary accent)
          glow: "rgba(255, 140, 0, 0.4)",
        },
        navy: "#1A1A1A", // Dark Gray (Cards/Panels from reference)
        muted: "#8A8A8A", // Muted Gray (from reference)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Barlow Condensed', 'sans-serif'], // Updated to Barlow Condensed
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(26, 26, 26, 0.7) 0%, rgba(15, 15, 15, 0.8) 100%)',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(212, 255, 0, 0.3)',
        'orange-glow': '0 0 20px rgba(255, 140, 0, 0.3)',
        'primary-btn': '0 0 15px rgba(212, 255, 0, 0.3)', // Moved from arbitrary value to fix build
      }
    },
  },
  plugins: [],
}
