export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export function buildContactPlainText({
  name,
  email,
  message,
}: ContactPayload) {
  return [
    "Wiadomość ze strony — kontakt",
    "",
    `Imię i nazwisko: ${name}`,
    `E-mail: ${email}`,
    "",
    message,
  ].join("\n");
}

export function parseContactPayload(body: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Nieprawidłowe dane formularza." };
  }

  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Podaj imię i nazwisko (min. 2 znaki)." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, error: "Podaj poprawny adres e-mail." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { ok: false, error: "Wiadomość: od 10 do 5000 znaków." };
  }

  return { ok: true, data: { name, email, message } };
}
