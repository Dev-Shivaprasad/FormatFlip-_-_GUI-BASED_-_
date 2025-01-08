/** @type {import('tailwindcss').Config} */
function Withopacity(CustomColor) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${CustomColor}),${opacityValue})`;
    } else {
      return `rgba(var(${CustomColor}), 1)`;
    }
  };
}
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Default: ["Custom", "mono", "Consolas"],
      },
      colors: {
        Text: Withopacity("--text"),
        Background: Withopacity("--background"),
        Primary: Withopacity("--primary"),
        Secondary: Withopacity("--secondary"),
        Accent: Withopacity("--accent"),
      },
    },
  },
  plugins: [],
};
