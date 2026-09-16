import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050507",
        surface: "#111116",
        primary: "#0070F3",
        accent: "#00E5FF",
        border: "rgba(255,255,255,0.1)"
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-outfit)']
      }
    },
  },
  plugins: [],
}
export default config
