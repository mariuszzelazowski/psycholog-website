const DEFAULT_DEV_ORIGIN = "http://127.0.0.1:3000";

function normalizeOrigin(url: string) {
  return url.replace(/\/$/, "");
}

/** Kanoniczny adres strony — w dev zawsze lokalny host (bez pętli przekierowań). */
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (process.env.NODE_ENV === "development") {
    return DEFAULT_DEV_ORIGIN;
  }

  if (fromEnv) {
    return normalizeOrigin(fromEnv);
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return DEFAULT_DEV_ORIGIN;
}

/** metadataBase tylko gdy mamy sensowny adres produkcyjny. */
export function getMetadataBaseUrl(): URL | undefined {
  if (process.env.NODE_ENV === "development") {
    return new URL(DEFAULT_DEV_ORIGIN);
  }

  const url = getSiteUrl();
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}
