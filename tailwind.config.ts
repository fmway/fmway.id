import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: '#00DFC0',
      },
      fontFamily: {
        'sans': ['Montserrat', 'Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
