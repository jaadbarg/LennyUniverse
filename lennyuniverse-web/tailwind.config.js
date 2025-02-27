/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonPink: "#FF00FF",
        neonPurple: "#9D00FF",
        neonTeal: "#00FFFF",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        glow: {
          "0%": { 
            textShadow: "0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF" 
          },
          "100%": { 
            textShadow: "0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF" 
          },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}