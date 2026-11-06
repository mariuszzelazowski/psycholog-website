import { buildContactPlainText, type ContactPayload } from "@/lib/contact-message";

const WEB3FORMS_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Klucz tylko na serwerze (Vercel env). Stary PUBLIC_* nadal działa lokalnie. */
export function getWeb3FormsAccessKey() {
  const raw =
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
    "";

  if (!raw || !WEB3FORMS_UUID.test(raw)) {
    return "";
  }

  return raw;
}

export async function sendContactViaWeb3Forms(
  payload: ContactPayload,
): Promise<void> {
  const accessKey = getWeb3FormsAccessKey();
  if (!accessKey) {
    throw new Error("WEB3FORMS_NOT_CONFIGURED");
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: "Kontakt ze strony — Odnowa wewnętrzna",
      from_name: payload.name,
      email: payload.email,
      replyto: payload.email,
      message: buildContactPlainText(payload),
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !data.success) {
    throw new Error(data.message ?? "Nie udało się wysłać wiadomości.");
  }
}
