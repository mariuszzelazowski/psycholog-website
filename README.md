# Psycholog Warszawa — strona wizytówka

Landing page gabinetu psychologicznego (Next.js 16, React 19, Tailwind CSS 4).

## Szybki podgląd (spotkanie / demo)

**Tryb developerski** — hot reload:

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000). Na telefonie w tej samej sieci Wi‑Fi możesz wejść przez adres IP komputera i port `3000` (np. `http://192.168.1.x:3000`).

**Tryb produkcyjny** — bliżej tego, co pójdzie na hosting:

```bash
npm run build
npm start
```

Domyślnie: [http://localhost:3000](http://localhost:3000).

## Responsywność (RWD)

Strona jest układana mobile-first: nawigacja z menu hamburger na małych ekranach, siatki sekcji 1→2 kolumny, czytelna typografia i odstępy. Przy demo warto sprawdzić DevTools (iPhone / iPad) oraz prawdziwy telefon w tej samej sieci.

## SEO

- Metadane: `src/config/content.ts` → `seo` (+ `src/lib/metadata.ts`)
- Przed publikacją ustaw `NEXT_PUBLIC_SITE_URL` w `.env.local` (kanoniczny adres)
- Automatycznie: `/sitemap.xml`, `/robots.txt`, JSON-LD (`ProfessionalService`)

## Edycja treści (kontakt, oferta, teksty)

Większość danych jest w **`src/config/content.ts`** (marka, kontakt, usługi, teksty sekcji).  
Enumy (sekcje, typy kontaktu, formy usług): **`src/config/enums.ts`**.

E-mail / Instagram można też nadpisać w `.env.local` — patrz `env.example`.

## Kontakt i Instagram

Formularz wysyła wiadomości **automatycznie** przez [Web3Forms](https://web3forms.com) (`/api/contact` + `WEB3FORMS_ACCESS_KEY` w env). Bez klucza — awaryjnie `mailto:`.  
Instrukcja darmowa: **[docs/VERCEL.md](docs/VERCEL.md)**.  
Facebook i Instagram: `content.ts` → `socialProfiles`.

## Wdrożenie na Vercel (darmowy plan, bez własnej domeny)

Szczegóły krok po kroku: **[docs/VERCEL.md](docs/VERCEL.md)**.

Krótko: połącz repo z [vercel.com](https://vercel.com), ustaw zmienne z `env.example` (Web3Forms + e-mail), deploy → adres `*.vercel.app`.  
`NEXT_PUBLIC_SITE_URL` ustaw po pierwszym deploy na ten adres i zrób redeploy.

```bash
npm run deploy:vercel   # wymaga: npm i -g vercel && vercel login
```

## Uwagi przed publikacją

- Ustaw właściwy nick Instagram w `.env.local` / Vercel env.
- Ilustracje w hero i „O mnie” to lokalne SVG — docelowo można podmienić na zdjęcia.

## Skrypty

| Polecenie      | Opis                    |
| -------------- | ----------------------- |
| `npm run dev`  | Serwer deweloperski     |
| `npm run build`| Build produkcyjny       |
| `npm start`    | Serwer po `build`       |
| `npm run lint` | ESLint                  |
