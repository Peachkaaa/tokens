# Tokens Manuali in Nuxt

Questo progetto usa token gestiti manualmente nel file CSS:

- `assets/css/tokens.css`

Nuxt carica questo file globalmente, quindi le variabili sono disponibili in tutta l'app.

## Flusso manuale

1. Copia i nomi token da Figma.
2. Inserisci/aggiorna le variabili CSS in `assets/css/tokens.css`.
3. Usa le variabili nei componenti (`var(--nomeToken)`).

## Comandi principali

```bash
npm install
npm run dev
npm run build
```

## Esempio

```css
button {
  background: var(--buttonRed100);
  border: 1px solid var(--borderGrey700);
}
```
