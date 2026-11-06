import { siteConfig } from "@/config/site";
import {
  buildContactPlainText,
  type ContactPayload,
} from "@/lib/contact-message";

export type { ContactPayload } from "@/lib/contact-message";

export type ContactResult =
  | { ok: true; via: "web3forms" | "mailto" }
  | { ok: false; error: string };

function openMailClient(mailto: string) {
  const anchor = document.createElement("a");
  anchor.href = mailto;
  anchor.rel = "noopener noreferrer";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function sendViaMailto(payload: ContactPayload): ContactResult {
  const subject = encodeURIComponent("Wiadomość ze strony — kontakt");
  const body = encodeURIComponent(buildContactPlainText(payload));
  openMailClient(
    `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`,
  );
  return { ok: true, via: "mailto" };
}

/** Wysyłka przez `/api/contact` (Web3Forms). Mailto tylko gdy brak klucza na serwerze. */
export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  let data: {
    ok?: boolean;
    via?: "web3forms";
    error?: string;
    fallbackMailto?: boolean;
  };

  try {
    data = (await res.json()) as typeof data;
  } catch {
    return {
      ok: false,
      error: "Błąd połączenia z serwerem. Spróbuj ponownie za chwilę.",
    };
  }

  if (res.ok && data.ok) {
    return { ok: true, via: "web3forms" };
  }

  if (res.status === 503 && data.fallbackMailto) {
    return sendViaMailto(payload);
  }

  return {
    ok: false,
    error: data.error ?? "Nie udało się wysłać wiadomości.",
  };
}
