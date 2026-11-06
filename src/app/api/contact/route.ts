import { parseContactPayload } from "@/lib/contact-message";
import { sendContactViaWeb3Forms } from "@/lib/web3forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Nieprawidłowy format żądania." },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(json);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  try {
    await sendContactViaWeb3Forms(parsed.data);
    return Response.json({ ok: true, via: "web3forms" as const });
  } catch (err) {
    if (err instanceof Error && err.message === "WEB3FORMS_NOT_CONFIGURED") {
      return Response.json(
        {
          ok: false,
          fallbackMailto: true,
          error:
            "Nieprawidłowy lub brakujący WEB3FORMS_ACCESS_KEY (musi być UUID z web3forms.com).",
        },
        { status: 503 },
      );
    }

    const message =
      err instanceof Error ? err.message : "Nie udało się wysłać wiadomości.";
    return Response.json({ ok: false, error: message }, { status: 502 });
  }
}
