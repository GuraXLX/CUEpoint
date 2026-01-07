/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F", // Void Black
        foreground: "#EAEAEA", // Off-White
        primary: {
          DEFAULT: "#00F2FE", // Electric Cyan
          glow: "rgba(0, 242, 254, 0.4)",
        },
        accent: {
          DEFAULT: "#FF3366", // Signal Pink
          glow: "rgba(255, 51, 102, 0.4)",
        },
        navy: "#1A1A2E", // Deep Navy (Cards/Panels)
        muted: "#8D8D9B", // Muted Silver
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(26, 26, 46, 0.7) 0%, rgba(10, 10, 15, 0.8) 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 242, 254, 0.3)',
        'pink-glow': '0 0 20px rgba(255, 51, 102, 0.3)',
      }
    },
  },
  plugins: [],
}
