/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary psychedelic palette
        psychedelicMagenta: "#E233FF",
        psychedelicPurple: "#8B31FF",
        psychedelicBlue: "#3F7DFF",
        psychedelicTeal: "#00D1D1",
        psychedelicIndigo: "#5C14E8",
        
        // Secondary accents
        psychedelicGold: "#FFD034",
        psychedelicAmethyst: "#9345FF",
        psychedelicPeacock: "#37BDFF",
        
        // Neutral tones
        deepSpace: "#0A020F",
        cosmicGray: "#232135",
        starWhite: "#F2EAFF",
        
        // Legacy colors for backward compatibility
        neonPink: "#E233FF",
        neonPurple: "#8B31FF",
        neonTeal: "#00D1D1",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'pulse-slow': 'pulse-slow 8s infinite ease-in-out',
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