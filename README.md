# Figma Tokens in Nuxt

Questo progetto e' configurato per il flusso Tokens Studio -> GitHub -> CSS variables.

## Come funziona

1. Modifichi i token in Figma con Tokens Studio.
2. Dal plugin fai sync su GitHub nella cartella `tokens/`.
3. La repo riceve il JSON aggiornato.
4. `style-dictionary` converte i token in `app/assets/css/tokens.css`.
5. Nuxt carica quel CSS globalmente tramite `nuxt.config.ts`.

## Setup Tokens Studio

Nel plugin Tokens Studio:

1. Apri `Settings` -> `Sync`.
2. Scegli `GitHub` come provider.
3. Configura:
   - repository: `Peachkaaa/tokens`
   - branch: `main`
   - path: `tokens`
4. Salva e fai `Push` dal plugin.

Il file starter in repo e' `tokens/global.json`, ma il plugin puo' creare anche altri file o set.

## Build locale

```bash
npm install
npm run build:tokens
npm run dev
```

`dev`, `build` e `generate` eseguono automaticamente `build:tokens` prima di Nuxt.

## Build automatica in GitHub

La repo include il workflow GitHub Actions `.github/workflows/build-token-css.yml`.

Quando cambia un file in `tokens/`, GitHub Actions:

1. installa le dipendenze
2. esegue `npm run build:tokens`
3. aggiorna `app/assets/css/tokens.css` e `tailwind.tokens.generated.ts`
4. fa commit dei file generati se sono cambiati

## Dove trovi i file principali

- sorgente token: `tokens/`
- config build: `style-dictionary.config.mjs`
- output CSS: `app/assets/css/tokens.css`

## Esempio d'uso

```css
button {
  background: var(--buttonRed100);
  border: 1px solid var(--borderGrey700);
}
```
