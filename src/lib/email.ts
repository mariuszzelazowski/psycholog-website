/** Wspólna walidacja e-maila — formularz (na żywo) i `/api/contact` (ostatecznie). */

const LOCAL_PART = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
const DOMAIN_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const TLD = /^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/;

/** Najczęstsze skrzynki w Polsce — podstawa podpowiedzi przy literówkach. */
const POPULAR_DOMAINS = [
  "gmail.com",
  "wp.pl",
  "o2.pl",
  "onet.pl",
  "onet.eu",
  "op.pl",
  "poczta.fm",
  "int.pl",
  "spoko.pl",
  "buziaczek.pl",
  "interia.pl",
  "interia.eu",
  "poczta.onet.pl",
  "vp.pl",
  "tlen.pl",
  "gazeta.pl",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "yahoo.com",
  "yahoo.pl",
  "googlemail.com",
  "proton.me",
  "protonmail.com",
] as const;

const COMMON_TLDS = ["pl", "com", "eu", "net", "org", "me"] as const;

export function normalizeEmail(raw: string) {
  const trimmed = raw.trim();
  const at = trimmed.lastIndexOf("@");
  if (at < 0) return trimmed;
  return `${trimmed.slice(0, at)}@${trimmed.slice(at + 1).toLowerCase()}`;
}

/** Zwraca komunikat błędu albo `null`, gdy adres jest poprawny. */
export function validateEmail(raw: string): string | null {
  const email = normalizeEmail(raw);

  if (!email) return "Podaj adres e-mail.";
  if (/\s/.test(email)) return "Adres e-mail nie może zawierać spacji.";
  if (email.includes(",")) return "W adresie e-mail użyj kropki zamiast przecinka.";
  if (email.length > 254) return "Adres e-mail jest za długi.";

  const atCount = email.split("@").length - 1;
  if (atCount === 0) return "Brakuje znaku @ w adresie e-mail.";
  if (atCount > 1) return "Adres e-mail może zawierać tylko jeden znak @.";

  const [local, domain] = email.split("@");

  if (!local) return "Brakuje części przed znakiem @.";
  if (local.length > 64) return "Część przed znakiem @ jest za długa.";
  if (!LOCAL_PART.test(local)) {
    return "Adres e-mail zawiera niedozwolone znaki (np. polskie litery lub przecinek).";
  }
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return "Kropka nie może stać na początku, na końcu ani dwa razy pod rząd.";
  }

  if (!domain) return "Brakuje domeny po znaku @ (np. gmail.com).";
  if (domain.includes("..") || domain.startsWith(".") || domain.endsWith(".")) {
    return "Domena po znaku @ ma błędnie postawioną kropkę.";
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return "Brakuje końcówki domeny, np. .pl lub .com.";
  }
  if (!labels.every((label) => DOMAIN_LABEL.test(label))) {
    return "Domena po znaku @ zawiera niedozwolone znaki.";
  }
  if (!TLD.test(labels[labels.length - 1])) {
    return "Końcówka domeny wygląda na błędną (np. .pl lub .com).";
  }

  return null;
}

function editDistance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, row[j], row[j - 1]);
      prev = current;
    }
  }
  return row[b.length];
}

function closest(value: string, candidates: readonly string[], maxDistance: number) {
  let best: string | null = null;
  let bestDistance = maxDistance + 1;
  for (const candidate of candidates) {
    const distance = editDistance(value, candidate);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

/** Podpowiedź przy literówce w domenie (np. gmial.com → gmail.com) albo `null`. */
export function suggestEmail(raw: string): string | null {
  const typed = normalizeEmail(raw);
  const email = typed.replace(/,/g, ".");
  if (email !== typed && !validateEmail(email)) {
    return suggestEmail(email) ?? email;
  }
  const at = email.lastIndexOf("@");
  if (at < 1) return null;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!domain || (POPULAR_DOMAINS as readonly string[]).includes(domain)) {
    return null;
  }

  const fixedDomain = domain.includes(".")
    ? closest(domain, POPULAR_DOMAINS, domain.length <= 6 ? 1 : 2)
    : POPULAR_DOMAINS.find((d) => editDistance(domain, d.split(".")[0]) <= 1) ??
      null;

  if (fixedDomain && fixedDomain !== domain) {
    return `${local}@${fixedDomain}`;
  }

  const dot = domain.lastIndexOf(".");
  if (dot > 0) {
    const tld = domain.slice(dot + 1);
    if (!(COMMON_TLDS as readonly string[]).includes(tld)) {
      const fixedTld = closest(tld, COMMON_TLDS, 1);
      if (fixedTld) return `${local}@${domain.slice(0, dot)}.${fixedTld}`;
    }
  }

  return null;
}
