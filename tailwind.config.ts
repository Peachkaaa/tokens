import type { Config } from 'tailwindcss';
import { 
  tokenColors,
  tokenBorder,
  tokenBorderRadius,
  tokenButton,
  tokenBackground,
  tokenFontSize,
  tokenSpacing,
  tokenBoxShadow
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
      borderRadius: tokenBorderRadius,
      backgroundColor: {
        ...tokenColors,
        ...tokenBackground
      },
      fontSize: tokenFontSize,
      spacing: tokenSpacing,
      boxShadow: tokenBoxShadow,
      // Utilizziamo anche i token colore per textColor e altri usi
      textColor: tokenColors
    }
  }
} satisfies Config;
