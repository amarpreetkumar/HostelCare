export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        root: "#0A0A0B",
        base: "#111113",
        elevated: "#18181C",
        overlay: "#1F1F25",
        subtle: "#26262E",
        "border-soft": "#2C2C36",
        "border-med": "#3A3A47",
        primary: "#FF6B35",
        "primary-dim": "rgba(255,107,53,0.12)",
        secondary: "#FFAA00",
        "secondary-dim": "rgba(255,170,0,0.1)",
        success: "#3ECF8E",
        "success-dim": "rgba(62,207,142,0.1)",
        danger: "#FF5370",
        "danger-dim": "rgba(255,83,112,0.1)",
        info: "#A78BFA",
        "info-dim": "rgba(167,139,250,0.1)",
        "text-high": "#F2F2F3",
        "text-mid": "#A0A0AE",
        "text-low": "#5C5C6E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        "glow-primary": "0 0 24px rgba(255,107,53,0.25)",
        "glow-success": "0 0 24px rgba(62,207,142,0.2)",
        "inner-soft": "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
}
