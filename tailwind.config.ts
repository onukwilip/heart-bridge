import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#007AFF",
        ["primary-grey"]: "rgba(255, 255, 255, 0.3)",
        ["primary-grey-dark"]: "rgba(255, 255, 255, 0.5)",
        ["weak-white"]: "#FFFFFF66",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      borderColor: {
        ["primary-grey"]: "rgba(255, 255, 255, 0.3)",
        ["primary-grey-dark"]: "rgba(255, 255, 255, 0.5)",
      },
      outlineColor: {
        ["primary-grey"]: "rgba(255, 255, 255, 0.3)",
        ["primary-grey-dark"]: "rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
