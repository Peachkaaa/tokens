# Guida Setup: Figma Tokens → GitHub → Tailwind

## Indice
1. [Figma Tokens e Variables](#figma-tokens-e-variables)
2. [Installazione Tokens Studio](#installazione-tokens-studio)
3. [Creazione Personal Access Token](#creazione-personal-access-token)
4. [Collegamento GitHub in Tokens Studio](#collegamento-github-in-tokens-studio)
5. [Cosa genera il processo](#cosa-genera-il-processo)
6. [Come funzionano gli script](#come-funzionano-gli-script)
7. [Workflow operativo](#workflow-operativo)

---

## Figma Tokens e Variabili della libreria Figma

### Cosa sono i design token

I **design token** sono valori di design salvati in modo strutturato e riutilizzabile.

Esempi:
- colore primario
- border radius
- spacing
- typography

Un token non dice dove viene usato, ma **qual è il valore ufficiale del sistema**.

Esempio:
- `color.primary = #008BC4`
- `radius.small = 4px`
- `text.base = 16px`

Nel nostro workflow, i token sono la sorgente che parte da Figma, passa da GitHub e arriva nel codice.

### Cosa sono le variabili della libreria Figma

Le **variabili di Figma** sono una funzione nativa di Figma che permette di applicare valori riutilizzabili dentro la libreria e nei file di design.

Servono per:
- assegnare valori a colori, testi, spacing o effetti
- riutilizzare gli stessi valori in più componenti
- cambiare modalità come light e dark mode
- aggiornare più elementi insieme dentro Figma

Esempio:
- una variabile colore può essere collegata a bottoni, card e testo
- se la variabile cambia, i componenti collegati si aggiornano

### Differenza principale

- **Design token** = definisce il valore del sistema di design
- **Variabile Figma** = applica e riusa quel valore dentro la libreria e i layout Figma

Detto in modo semplice:
- i **token** definiscono le regole
- le **variabili di Figma** aiutano a usare quelle regole nel file di design

### La differenza pratica

Se crei una variabile direttamente nel pannello nativo di Figma, stai migliorando soprattutto il lavoro **dentro Figma**.

Se invece gestisci quel valore come token, stai creando un dato che può essere usato anche **fuori da Figma**.

Quindi:

- **Variabile Figma** = utile per librerie, componenti, temi e layout nel file di design
- **Token** = utile per collegare design system, repository e codice front-end

### Perché non sono la stessa cosa

Sembrano simili, ma hanno due ruoli diversi.

- I **token** sono pensati per essere esportati, sincronizzati e trasformati anche nel codice
- Le **variabili native di Figma** sono pensate soprattutto per gestire bene il design dentro Figma

### Nel nostro progetto

In questo flusso usiamo i **token** come sorgente principale perché:

- possono essere sincronizzati con GitHub
- possono essere trasformati in CSS variables
- possono essere letti dagli script
- possono essere riutilizzati in Tailwind

Le variabili della libreria Figma sono molto utili per lavorare nel file di design, ma da sole non bastano a costruire il collegamento automatico con GitHub, Style Dictionary e Tailwind.

### Confronto rapido

| Aspetto | Variabile Figma | Token |
|--------|------------------|-------|
| Dove lavora meglio | Dentro Figma | Tra Figma e codice |
| Scopo principale | Gestire componenti e layout | Definire valori del design system |
| Uso in libreria Figma | Sì | Indiretto |
| Sync con GitHub | No, non in modo diretto | Sì |
| Trasformazione in CSS/Tailwind | No, non da sola | Sì |

### Sintesi finale

Le variabili di Figma sono ottime per progettare.

I token sono fondamentali quando vuoi che quei valori diventino parte di un flusso tecnico condiviso tra design e sviluppo.

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

---

## Perché questo processo è utile

### Cosa migliora davvero

- **Unica fonte di verità**: i token partono da Figma e non vengono riscritti a mano nel codice
- **Meno errori manuali**: non devi copiare colori, radius o typography in più file diversi
- **Design e sviluppo restano allineati**: quello che decide il designer arriva più facilmente nel progetto
- **Aggiornamenti più veloci**: cambi un token una sola volta e il sistema rigenera i file necessari
- **Maggiore coerenza visiva**: componenti e pagine usano sempre gli stessi valori
- **Scalabilità**: quando i token aumentano, il flusso continua a funzionare senza gestione manuale file per file

### Cosa cambia in meglio nel lavoro del team

- **Per il designer**: aggiorna i token in Figma senza dover spiegare ogni volta i valori agli sviluppatori
- **Per lo sviluppatore**: usa classi e variabili già pronte, senza ricostruire i valori a mano
- **Per il progetto**: il sistema diventa più stabile, ripetibile e facile da mantenere

### Se non sfrutti questa possibilità

Il progetto funziona lo stesso, ma con più lavoro manuale.

Le difficoltà principali sono:

- **Duplicazione dei valori**: lo stesso colore o font size può essere scritto in Figma, CSS, Tailwind e componenti
- **Rischio disallineamento**: Figma mostra un valore, il codice ne usa un altro
- **Più tempo perso**: ogni modifica va riportata manualmente in più punti
- **Più probabilità di bug visivi**: basta dimenticare un file per avere interfacce incoerenti
- **Manutenzione più difficile**: quando i token diventano tanti, aggiornarli manualmente diventa fragile
- **Dipendenza dalle persone**: il sistema funziona solo se tutti ricordano sempre cosa aggiornare

### In sintesi

Senza questo workflow, i token restano solo un elenco di valori.

Con questo workflow, i token diventano un **sistema automatico** che collega design e codice.

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

---

## Spunto per slide

Questa sezione serve come traccia per costruire una presentazione breve e chiara.

### Slide 1 - Obiettivo

**Titolo:** Perché creare un workflow per i design token

**Messaggio chiave:**
- collegare Figma e codice in modo più ordinato
- evitare copia-incolla manuali
- mantenere design e sviluppo allineati

### Slide 2 - Problema iniziale

**Titolo:** Il problema senza automazione

**Punti:**
- i valori vengono copiati a mano in più file
- Figma e codice possono disallinearsi
- ogni modifica richiede più passaggi manuali
- aumenta il rischio di errori visivi

### Slide 3 - Cosa sono i token

**Titolo:** Cosa sono i design token

**Punti:**
- sono valori di design riutilizzabili
- possono rappresentare colori, spaziature, radius, typography
- diventano una base comune tra designer e developer

### Slide 4 - Token vs Variables

**Titolo:** Differenza tra Tokens e Variables

**Punti:**
- i token definiscono i valori del sistema
- le variables applicano quei valori dentro Figma
- i token sono più utili per collegare design e codice

### Slide 5 - Architettura del flusso

**Titolo:** Come funziona il processo

**Flusso:**

```text
Figma
  ↓
Tokens Studio
  ↓
GitHub
  ↓
Style Dictionary
  ↓
CSS variables
  ↓
Script Tailwind
  ↓
Classi utility pronte nel progetto
```

### Slide 6 - Ruolo dei file principali

**Titolo:** I file più importanti

**Punti:**
- `tokens/global.json`: sorgente dei token
- `app/assets/css/tokens.css`: variabili CSS generate
- `tailwind.tokens.generated.ts`: mappa per Tailwind
- `tailwind.config.ts`: punto in cui Tailwind usa i token

### Slide 7 - Ruolo della GitHub Action

**Titolo:** A cosa serve la GitHub Action

**Punti:**
- automatizza la build dei token su GitHub
- evita che qualcuno dimentichi di rigenerare i file
- mantiene aggiornato l'output generato
- è utile ma non obbligatoria

**Messaggio da dire a voce:**
Se la Action non c'è, il flusso funziona comunque, ma il team deve ricordarsi di lanciare manualmente `npm run build:tokens`.

### Slide 8 - Vantaggi del workflow

**Titolo:** Cosa migliora in pratica

**Punti:**
- una sola fonte di verità
- meno errori manuali
- aggiornamenti più veloci
- maggiore coerenza visiva
- più scalabilità nel tempo

### Slide 9 - Pro e contro

**Titolo:** Pro e contro del sistema

**Pro:**
- processo più ordinato
- design e sviluppo più vicini
- facile aggiornare il sistema grafico

**Contro:**
- setup iniziale più tecnico
- serve disciplina nel naming dei token
- se manca automazione, bisogna ricordarsi la build manuale

### Slide 10 - Caso pratico

**Titolo:** Esempio di modifica reale

**Punti:**
- il designer cambia un token in Figma
- Tokens Studio aggiorna GitHub
- lo script rigenera CSS e Tailwind
- il nuovo valore arriva subito nel progetto

### Slide 11 - Cosa succede senza questo processo

**Titolo:** Senza workflow automatizzato

**Punti:**
- i token restano solo valori statici
- il team aggiorna più file a mano
- aumenta la possibilità di incoerenze
- il sistema diventa più fragile quando cresce

### Slide 12 - Conclusione

**Titolo:** Risultato finale

**Messaggio finale:**
Questo workflow trasforma i token da semplice documentazione a **sistema operativo del design**, capace di collegare Figma, repository e front-end in modo coerente.

### Suggerimento per la presentazione

Per rendere le slide più efficaci:

- usa poco testo per slide
- affianca ogni slide con uno schema visivo
- mostra almeno un esempio reale di token che cambia da Figma al codice
- chiudi con il confronto: prima manuale / dopo automatizzato
