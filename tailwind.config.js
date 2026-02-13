/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg1: '#06060f',
        bg2: '#0c0c1d',
        neon: '#00e6b8',
        neonPurple: '#7b5cff',
        neonPink: '#ff6b9d'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
