import type { Config } from 'tailwindcss';

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
      colors: {
        'token-gray-100': 'var(--primariMode1Gray100)',
        'token-gray-700': 'var(--primariMode1Gray700)',
        'token-red-100': 'var(--primariMode1Red100)',
        'token-green-300': 'var(--primariMode1Green300)',
        'token-yellow-300': 'var(--primariMode1Yellow300)',
        'token-sky-600': 'var(--primariMode1Sky600)',
        'token-border-grey-100': 'var(--tokensLightBorderBorderGrey100)',
        'token-border-grey-700': 'var(--tokensLightBorderBorderGrey700)',
        'token-button-red-100': 'var(--tokensLightButtonButtonRed100)',
        'token-button-green-300': 'var(--tokensLightButtonButtonGreen300)',
        'token-background-yellow-100': 'var(--tokensLightBackgroundBackgroundYellow100)',
        'token-background-sky-600': 'var(--tokensLightBackgroundBackgroundSky600)'
      }
    }
  }
} satisfies Config;
