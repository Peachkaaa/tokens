import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { 
  tokenColors,
  tokenSizing,
  tokenTypography,
} from './tailwind.tokens.generated';

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: tokenColors,
      padding: tokenSizing,
      gap: tokenSizing,
      fontSize: tokenSizing,
    }
  },
} satisfies Config;
