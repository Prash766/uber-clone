import baseConfig from "@repo/tailwind-config";

export default {
    ...baseConfig,
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
    ]
  } 