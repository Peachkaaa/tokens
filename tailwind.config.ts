import type { Config } from 'tailwindcss';
import { 
  tokenColors,
  tokenBorder,
  tokenBackground,
  tokenButton,
  
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
      borderColor: tokenBorder,
      backgroundColor: {
        ...tokenColors,
        ...tokenBackground,
        ...tokenButton
      },

      textColor: tokenColors
    }
  }
} satisfies Config;
