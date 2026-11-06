# Darmowe wdrożenie (Vercel + Web3Forms)

Bez płatnego planu Vercel i bez własnej domeny. Koszt: **0 zł** (limit darmowy).

| Usługa | Co dostajesz |
|--------|----------------|
| [Vercel Hobby](https://vercel.com) | Hosting Next.js, adres `https://nazwa.vercel.app` |
| [Web3Forms](https://web3forms.com) | Formularz wysyła e-mail automatycznie (~250 wiad./mies. na free) |

Własną domenę możesz podpiąć później (Vercel → Domains).

---

## Krok 1 — Web3Forms (automatyczna wysyłka)

1. Wejdź na [https://web3forms.com](https://web3forms.com)
2. **Create Access Key** → podaj e-mail odbiorcy (np. `zelazowskimariusz91@gmail.com`)
3. Potwierdź link w skrzynce
4. Skopiuj **Access Key**

Lokalnie (`.env.local`):

```env
WEB3FORMS_ACCESS_KEY=twój_klucz
NEXT_PUBLIC_CONTACT_EMAIL=zelazowskimariusz91@gmail.com
```

Zrestartuj: `npm run fresh` → wyślij test z formularza → sprawdź skrzynkę (i spam).

---

## Krok 2 — GitHub

Wypchnij aktualny kod na `origin` (repo `psycholog-website`).

---

## Krok 3 — Vercel (darmowe konto)

1. [vercel.com](https://vercel.com) → **Sign Up** (GitHub)
2. **Add New → Project** → wybierz `psycholog-website`
3. **Environment Variables** (Production **i** Preview):

| Nazwa | Wartość |
|--------|---------|
| `WEB3FORMS_ACCESS_KEY` | klucz z Web3Forms |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ten sam e-mail odbiorcy |

4. **Deploy**

5. Po deploy skopiuj URL (np. `https://psycholog-website.vercel.app`), dodaj zmienną:

| `NEXT_PUBLIC_SITE_URL` | `https://psycholog-website.vercel.app` |

6. **Deployments → Redeploy** (żeby sitemap/SEO miały dobry canonical).

---

## Jak działa formularz

- Przeglądarka wysyła POST na **`/api/contact`** (Next.js na Vercel).
- Serwer woła Web3Forms — **klucz nie jest widoczny w kodzie strony**.
- Bez `WEB3FORMS_ACCESS_KEY` API zwraca błąd; lokalnie nadal możliwy awaryjny **mailto** (program pocztowy).

---

## Domena własna (później, opcjonalnie)

Vercel → Project → **Settings → Domains**.  
Możesz kupić domenę w Vercel lub podpiąć u home.pl / OVH itd.  
Potem ustaw `NEXT_PUBLIC_SITE_URL=https://twoja-domena.pl` i redeploy.

---

## Checklist

- [ ] Web3Forms: klucz + test maila
- [ ] Vercel: deploy OK
- [ ] `NEXT_PUBLIC_SITE_URL` + redeploy
- [ ] Formularz na telefonie (bez otwierania poczty)
- [ ] `/sitemap.xml` działa
