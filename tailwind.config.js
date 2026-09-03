/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        executive: {
          950: "#020617",
          900: "#0f172a",
          850: "#111827",
          800: "#172033",
          700: "#1e293b",
          600: "#334155"
        },
        gold: {
          50: "#fffbea",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#f5c542",
          500: "#d4af37",
          600: "#b8941f",
          700: "#8f7014"
        }
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "Inter", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 25px 80px rgba(0, 0, 0, 0.45)",
        gold: "0 0 40px rgba(212, 175, 55, 0.14)",
        goldStrong: "0 0 35px rgba(212, 175, 55, 0.28)",
        glass: "0 20px 70px rgba(0, 0, 0, 0.32)"
      },
      backgroundImage: {
        "executive-gradient": "linear-gradient(135deg, #020617 0%, #0f172a 50%, #172033 100%)",
        "gold-gradient": "linear-gradient(135deg, #8f7014 0%, #d4af37 45%, #f5c542 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(212,175,55,0)" },
          "50%": { boxShadow: "0 0 35px rgba(212,175,55,0.22)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" }
        }
      }
    }
  },
  plugins: []
};