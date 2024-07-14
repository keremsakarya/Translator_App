/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       righteous: ["Righteous", "sans-serif"],
       russoOne: ["Russo One", "sans-serif"],
       notoSansJp: ["Noto Sans JP", "sans-serif"],
       shojumaru: ["Shojumaru", "system-ui"],
      }
    },

    translate: ["active"],

    colors: {
      darkBackground: '#121212',
      lightPurple: '#6A3255',
      turquoise: '#03DAC5',
      divBackground: '#1F1B24',
      hColor: '#fff',
      iconColor:'#fff',
      textContainer:'#C0C0C0',
      darkTurq:"#00796B"
    },

    boxShadow: {
      custom: '0 4px 6px -1px rgba(107, 114, 128, 0.7), 0 2px 4px -1px rgba(107, 114, 128, 0.06)',
    },

  },
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".scrollbar-hide": {
          "::-webkit-scrollbar": {display: "none"},
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      }

      addUtilities(newUtilities)
    },
  ],
}

