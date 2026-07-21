/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
          "surface-tint": "#0053db",
          "on-primary-fixed": "#00174b",
          "surface-container": "#e7eeff",
          "surface-container-low": "#f0f3ff",
          "on-secondary-fixed": "#23005c",
          "on-secondary": "#ffffff",
          "surface-container-high": "#dee8ff",
          "tertiary": "#4d556b",
          "on-tertiary": "#ffffff",
          "secondary-container": "#8455ef",
          "inverse-primary": "#b4c5ff",
          "secondary-fixed-dim": "#d0bcff",
          "on-tertiary-fixed-variant": "#3f465c",
          "on-error": "#ffffff",
          "on-surface": "#111c2d",
          "secondary-fixed": "#e9ddff",
          "inverse-surface": "#263143",
          "surface": "#f9f9ff",
          "outline-variant": "#c3c6d7",
          "outline": "#737686",
          "tertiary-fixed-dim": "#bec6e0",
          "primary-fixed-dim": "#b4c5ff",
          "on-background": "#111c2d",
          "inverse-on-surface": "#ecf1ff",
          "on-tertiary-container": "#eef0ff",
          "surface-bright": "#f9f9ff",
          "on-primary-container": "#eeefff",
          "secondary": "#6b38d4",
          "on-primary": "#ffffff",
          "on-tertiary-fixed": "#131b2e",
          "surface-dim": "#cfdaf2",
          "surface-container-lowest": "#ffffff",
          "on-secondary-fixed-variant": "#5516be",
          "error-container": "#ffdad6",
          "on-surface-variant": "#434655",
          "error": "#ba1a1a",
          "tertiary-fixed": "#dae2fd",
          "primary-fixed": "#dbe1ff",
          "on-primary-fixed-variant": "#003ea8",
          "surface-variant": "#d8e3fb",
          "surface-container-highest": "#d8e3fb",
          "on-error-container": "#93000a",
          "background": "#f9f9ff",
          "primary-container": "#2563eb",
          "primary": "#004ac6",
          "on-secondary-container": "#fffbff",
          "tertiary-container": "#656d84"
      },
      "borderRadius": {
          "DEFAULT": "0.25rem",
          "lg": "0.5rem",
          "xl": "1.5rem",
          "full": "9999px"
      },
      "fontFamily": {
          "headline": ["Inter"],
          "body": ["Inter"],
          "label": ["Inter"]
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
