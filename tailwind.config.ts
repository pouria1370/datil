import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./client/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./client/container/**/*.{js,ts,jsx,tsx,mdx}",
    "./client/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontSize: {
      xs: '0.6rem',
      sm: '0.7rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['Open Sans'],
      "vazir":['vazir-matn'],
      "vazir-adad":['vazir-adad'],
    },
    colors: {
      dark: '#161B25',
      smoky: "#343D48",
      success: "#0D9276",
      gray: "#212B35",
      primary:'#614BC3',
      secondary:'#33BBC5',
      info:"#0079FF",
      danger:"#CD1818",
      text:"#374259",
      warning:"#BA942E",
      light:"#FFF",
      light_gray:"#555D66",
      text_disablity:"#626971"
    }
  },
  plugins: [],
};
export default config;
