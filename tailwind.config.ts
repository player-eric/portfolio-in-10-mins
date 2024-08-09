import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        blackOpsOne: ["BlackOpsOne", "sans-serif"],
        courierPrime: ["CourierPrime", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
