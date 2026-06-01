# Guida Setup: Figma Tokens → GitHub → Tailwind

## Indice
1. [Installazione Tokens Studio](#installazione-tokens-studio)
2. [Creazione Personal Access Token](#creazione-personal-access-token)
3. [Collegamento GitHub in Tokens Studio](#collegamento-github-in-tokens-studio)
4. [Cosa genera il processo](#cosa-genera-il-processo)
5. [Come funzionano gli script](#come-funzionano-gli-script)
6. [Workflow operativo](#workflow-operativo)

---

## Installazione Tokens Studio

### Passo 1: Installa il plugin
1. Apri Figma
2. Vai su **Community → Plugins**
3. Cerca **"Tokens Studio"**
4. Clicca **Install**

### Passo 2: Apri il plugin
- Nel documento Figma, clicca l'icona **Resources** (in alto a destra)
- Seleziona **Tokens Studio**
- Si aprirà il pannello del plugin

---

## Creazione Personal Access Token

### Perché serve?
Un **Personal Access Token** è una password speciale che permette a Tokens Studio di scrivere i token direttamente nel tuo GitHub senza doverti loggare ogni volta.

### Crea il token (passaggi esatti)

1. **Vai su GitHub** → profilo (icona in alto a destra) → **Settings**
2. Scendi in fondo a sinistra → **Developer settings**
3. Clicca **Personal access tokens**
4. Scegli **Fine-grained tokens** (consigliato)
5. Clicca **Generate new token**

### Configura il token

| Campo | Valore |
|-------|--------|
| **Token name** | Tokens Studio Sync |
| **Expiration** | 90 days (o quello che preferisci) |
| **Repository access** | Only select repositories → scegli `Peachkaaa/tokens` |
| **Permissions** | |
| → Contents | Read and write |
| → Metadata | Read-only |

6. Clicca **Generate token**
7. **COPIA SUBITO IL TOKEN** (vedrai una stringa lunga, non potrai vederla di nuovo)

### Permessi essenziali
- **Contents: Read and write** → permette al plugin di scrivere i JSON token
- **Metadata: Read-only** → permette solo di leggere i metadati della repo
- **Repository selection** → specifica solo la repo `Peachkaaa/tokens` (sicurezza)

---

## Collegamento GitHub in Tokens Studio

### Passo 1: Apri Settings nel plugin
Nel pannello Tokens Studio:
1. Clicca **Settings** (in alto)
2. Clicca **Sync**

### Passo 2: Configura GitHub

| Campo | Valore |
|-------|--------|
| **Provider** | GitHub |
| **Personal Access Token** | [Incolla il token copiato] |
| **Repository** | Peachkaaa/tokens |
| **Branch** | main |
| **Token storage location** | tokens |
| **Base URL - Enterprise** | [Lascia vuoto] |

### Passo 3: Primo sync
1. Clicca **Pull** (scarica i token attuali dalla repo)
2. Clicca **Push** (pubblica i tuoi token attuali su GitHub)

✅ Da questo momento, ogni volta che fai Push nel plugin, i token si sincronizzano automaticamente a GitHub.

---

## Cosa genera il processo

### Flusso automatico

```
Modifica token in Figma
        ↓
Plugin Tokens Studio
        ↓
Push dal plugin
        ↓
JSON token in GitHub (tokens/global.json)
        ↓
GitHub Actions (build-token-css.yml)
        ↓
CSS variables generate (app/assets/css/tokens.css)
        ↓
Script di generazione Tailwind
        ↓
Tailwind colors generate (tailwind.tokens.generated.ts)
        ↓
Tailwind usa i colori nelle classi
```

### I 3 file principali generati

| File | Generato da | Contiene | Uso |
|------|-------------|----------|-----|
| **tokens/global.json** | Plugin Tokens Studio | Definizioni token da Figma | Sorgente principale |
| **app/assets/css/tokens.css** | Style Dictionary | Variabili CSS (--nomeToken) | Caricato globalmente in Nuxt |
| **tailwind.tokens.generated.ts** | Script Node.js | Mappe token categorizzate per Tailwind | Importato in tailwind.config.ts |

### Come il sistema scala a tutti i tipi di token

Il sistema **non è limitato ai colori**. Può gestire automaticamente:
- **Colori**: primariMode1*, tokensLightButton*
- **Bordi**: tokensLightBorder*
- **Border Radius**: Radius* in CSS
- **Font Sizes**: FontSize*, Typography*
- **Spacing**: Spacing*, Gap*
- **Shadows**: Shadow*

Lo script legge il **nome della variabile CSS** e categorizza automaticamente:

```javascript
if (varName.includes('Border')) → tokenBorder
if (varName.includes('Radius')) → tokenBorderRadius
if (varName.includes('FontSize')) → tokenFontSize
if (varName.includes('Spacing')) → tokenSpacing
// ... default: tokenColors
```

---

## Come funzionano gli script

### 1. Style Dictionary
**File config:** `style-dictionary.config.mjs`

```
Legge: tokens/global.json
  ↓
Applica trasformazioni (@tokens-studio/sd-transforms)
  ↓
Genera: app/assets/css/tokens.css
  ↓
Output: :root { --primariMode1Sky600: #008bc4; ... }
```

### 2. Script di generazione Tailwind
**File script:** `scripts/generate-tailwind-token-colors.mjs`

```
Legge: app/assets/css/tokens.css
  ↓
Estrae: tutte le variabili CSS (--nomeToken)
  ↓
Categorizza per tipo:
  - primariMode1* → tokenColors
  - Border* → tokenBorder
  - Radius* → tokenBorderRadius
  - FontSize* → tokenFontSize
  - Spacing* → tokenSpacing
  ↓
Trasforma: primariMode1Sky600 → token-sky-600
  ↓
Genera: tailwind.tokens.generated.ts
  ↓
Output:
  export const tokenColors = { 'token-sky-600': 'var(...)', ... }
  export const tokenBorder = { 'token-border-grey-100': 'var(...)', ... }
  export const tokenFontSize = { 'token-body': 'var(...)', ... }
```

**La chiave: Naming Convention in Figma**
Il nome che dai ai token in Figma determina la categoria automaticamente:
- Nomi con "Border" → categoria border
- Nomi con "Radius" → categoria borderRadius
- Nomi con "FontSize" o "Typography" → categoria fontSize
- Nomi con "Spacing" o "Gap" → categoria spacing
- Tutto il resto → categoria colors

### 3. Tailwind Config
**File config:** `tailwind.config.ts`

```typescript
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
  theme: {
    extend: {
      colors: tokenColors,              // Colori primitivi
      borderColor: tokenBorder,         // Colori bordo
      borderRadius: tokenBorderRadius,  // Border radius
      fontSize: tokenFontSize,          // Dimensioni testo
      spacing: tokenSpacing,            // Spaziature
      boxShadow: tokenBoxShadow         // Ombre
    }
  }
}
```

Così le classi Tailwind supportano tutte le categorie:
- `bg-token-sky-600` (colore)
- `border-token-border-grey-100` (bordo)
- `rounded-token-sm` (border radius)
- `text-token-body` (font size)
- `p-token-md` (spacing)

### 4. GitHub Actions (CI)
**File workflow:** `.github/workflows/build-token-css.yml`

Quando cambi il file `tokens/global.json` in repo:
1. GitHub Actions parte automaticamente
2. Esegue `npm run build:tokens`
3. Rigenera il CSS
4. Fa commit automatico se il CSS è cambiato

---

## Workflow operativo

### Caso 1: Modificare un token da Figma (consigliato)

1. **Figma**
   - Modifica un token nel plugin Tokens Studio
   - Es: cambia grigio da `#495057` a `#5a6570`

2. **Plugin**
   - Clicca **Push**
   - Token aggiornato a GitHub

3. **GitHub Actions**
   - Parte il workflow automaticamente
   - Rigenera `app/assets/css/tokens.css`
   - Commit automatico

4. **Local Dev (opzionale)**
   - In terminal: `npm run build:tokens`
   - Genera `tailwind.tokens.generated.ts`
   - Tailwind hot-reload automatico

5. **Risultato**
   - Le classe Tailwind riflettono il nuovo colore
   - No refresh, tutto aggiornato

### Caso 2: Pull & Push manuale

Se hai modifiche locali non sincronizzate:

```bash
git pull origin main     # Scarica i token remoti
npm run build:tokens    # Rigenera CSS + Tailwind
git push origin main    # Pubblica i tuoi commit
```

---

## Checklist Setup

- [ ] Tokens Studio installato in Figma
- [ ] Personal Access Token creato su GitHub
- [ ] Token linkato in Tokens Studio → Settings → Sync
- [ ] Primo Pull e Push eseguito
- [ ] File `tokens/global.json` visibile su GitHub
- [ ] GitHub Actions workflow attivo (`.github/workflows/build-token-css.yml`)
- [ ] `style-dictionary.config.mjs` configurato
- [ ] `scripts/generate-tailwind-token-colors.mjs` presente
- [ ] `tailwind.config.ts` importa tokenColors
- [ ] Test: `npm run build:tokens` genera i file senza errori

---

## Risoluzione problemi rapidi

| Problema | Soluzione |
|----------|-----------|
| "Token non sync" in Figma | Verifica Base URL Enterprise vuoto, repo corretta, token valido |
| GitHub Actions non parte | Controlla che il file sia in `tokens/global.json` e il workflow sia abilitato |
| CSS non genera | Esegui `npm install` per reinstallare dipendenze |
| Tailwind non aggiorna | Esegui `npm run build:tokens` in locale |

---

## Note finali

- **Ordine corretto:** Figma → GitHub → CSS → Tailwind
- **Non editare manualmente:** `app/assets/css/tokens.css` e `tailwind.tokens.generated.ts` sono auto-generati
- **Sempre fare Commit:** Dopo modifiche token, fai sempre commit nella repo
- **Backup token:** Salva il Personal Access Token in un gestore password sicuro

### Come aggiungere nuove categorie di token

Se in Figma aggiungi nuove categorie (es: `BorderWidth`, `LineHeight`, `Opacity`):

**In Figma:**
- Nomina i nuovi token con prefissi chiari (es: `BorderWidth500`, `LineHeight16`)

**Lo script lo farà automaticamente:**
1. Leggerà il CSS generato
2. Riconoscerà il prefisso nel nome della variabile
3. Categorizzarà il nuovo token
4. Genererà il nuovo export

**In tailwind.config.ts:**
- Importa la nuova categoria: `import { tokenBorderWidth, tokenLineHeight } from './tailwind.tokens.generated'`
- Estendi il theme: `borderWidth: tokenBorderWidth, lineHeight: tokenLineHeight`

**Zero configurazione richiesta nel codice** — il sistema scala in automatico.
