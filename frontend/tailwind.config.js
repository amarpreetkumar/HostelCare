export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0D1117",
        "bg-secondary": "#161B27",
        "bg-card": "#1A2030",
        "bg-surface": "#1E2535",
        "border-dark": "#2A3348",
        "accent-blue": "#4F7EF7",
        "accent-purple": "#7C5CFC",
        "accent-green": "#22C97A",
        "accent-amber": "#F5A623",
        "accent-red": "#F0554E",
        "accent-teal": "#2DD4BF",
        "text-primary": "#E8EDF5",
        "text-muted": "#8B95A8",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.3)",
        "glow-blue": "0 0 20px rgba(79,126,247,0.3)",
      },
    },
  },
  plugins: [],
}
