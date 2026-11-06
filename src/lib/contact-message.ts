import { normalizeEmail, validateEmail } from "@/lib/email";

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

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 5000;

export function validateContactField(
  field: ContactField,
  value: string,
): string | null {
  const trimmed = value.trim();
  switch (field) {
    case "name":
      if (trimmed.length < 2) return "Podaj imię i nazwisko (min. 2 znaki).";
      if (trimmed.length > 120) return "Imię i nazwisko: maks. 120 znaków.";
      return null;
    case "email":
      return validateEmail(trimmed);
    case "message":
      if (trimmed.length < MESSAGE_MIN_LENGTH) {
        return `Wiadomość powinna mieć co najmniej ${MESSAGE_MIN_LENGTH} znaków.`;
      }
      if (trimmed.length > MESSAGE_MAX_LENGTH) {
        return `Wiadomość: maks. ${MESSAGE_MAX_LENGTH} znaków.`;
      }
      return null;
  }
}

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of ["name", "email", "message"] as const) {
    const error = validateContactField(field, payload[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export function parseContactPayload(body: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string; fields?: ContactErrors } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Nieprawidłowe dane formularza." };
  }

  const raw = body as Record<string, unknown>;
  const data: ContactPayload = {
    name: typeof raw.name === "string" ? raw.name.trim() : "",
    email: typeof raw.email === "string" ? normalizeEmail(raw.email) : "",
    message: typeof raw.message === "string" ? raw.message.trim() : "",
  };

  const fields = validateContact(data);
  const firstError = Object.values(fields)[0];
  if (firstError) {
    return { ok: false, error: firstError, fields };
  }

  return { ok: true, data };
}
