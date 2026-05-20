# kurikulum-app

Slovenian-language web app for generating structured kindergarten curriculum plans (*načrti tematskih sklopov*) using Claude AI, grounded in the official **Kurikulum za vrtce (2025)**.

**Live:** https://tranquil-brioche-091409.netlify.app/

---

## Kaj aplikacija počne

Vzgojitelju ali vzgojiteljici omogoča, da vnese temo in starostno skupino otrok, aplikacija pa na podlagi tega generira strukturiran tematski sklop, ki pokriva vseh 6 področij dejavnosti iz Kurikuluma za vrtce:

- Družba
- Gibanje
- Jezik
- Matematika
- Narava
- Umetnost

---

## Strokovni vir

Aplikacija temelji na uradnem dokumentu:

**Kurikulum za vrtce** (posodobljena izdaja, 1. 9. 2025)  
Ministrstvo za vzgojo in izobraževanje Republike Slovenije  
https://www.gov.si/assets/ministrstva/MVI/Dokumenti/Vrtci/Kurikulum-za-vrtce_1.-9.-2025.pdf

Sistemski poziv (system prompt) modelu Claude vključuje vse cilje za vsa področja dejavnosti iz tega dokumenta.

---

## Stack

| Sloj | Tehnologija |
|---|---|
| Frontend | Statični HTML + vanilla JS (`index.html`) |
| Backend | Netlify Edge Function (Deno runtime) |
| AI model | Anthropic Claude (`claude-sonnet-4-6`) |
| Hosting | Netlify |

---

## Struktura projekta

```
kuri-app/
├── index.html                        # Celotna frontend aplikacija
├── netlify/
│   └── edge-functions/
│       └── generate.js               # Edge function — proxy do Anthropic API (SSE streaming)
├── netlify.toml                      # Konfiguracija: pot edge funkcije
└── README.md
```

---

## Nastavitev (Netlify)

1. Poveži repozitorij z Netlify.
2. V Netlify **Site settings → Environment variables** dodaj:

   | Spremenljivka | Vrednost |
   |---|---|
   | `ANTHROPIC_API_KEY` | Tvoj Anthropic API ključ |

3. Deploy se sproži avtomatsko ob vsakem `git push`.

---

## Lokalni razvoj

Ker aplikacija nima build koraka, jo lahko preprosto odpreš v brskalniku:

```bash
open index.html
```

Edge funkcija lokalno ne deluje brez Netlify CLI. Za testiranje backend dela:

```bash
npm install -g netlify-cli
netlify dev
```

---

## Opombe

- Načrti se generirajo in prikažejo v brskalniku, **niso shranjeni** — ob ponovnem nalaganju strani se izgubijo.
- Odgovori se pretakajo (*streaming*) sproti, kar prepreči timeout napake pri dolgih generacijah.
