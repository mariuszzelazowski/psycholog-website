import type { ReactNode } from "react";

/**
 * W `content.ts`: [[słowo kluczowe]] — akcent, **mocny nacisk**.
 * Zwykły tekst bez znaczników pozostaje bez zmian.
 */
const TOKEN =
  /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g;

/** Jednoliterowe spójniki i przyimki („w”, „z”, „i”…) nie mogą zostawać na końcu wiersza. */
const ORPHAN = /(?<=^|[\s(„])([aiouwzAIOUWZ])\s+/g;

export function bindOrphans(text: string): string {
  return text.replace(ORPHAN, "$1\u00A0");
}

export function parseRichCopy(input: string): ReactNode[] {
  const text = bindOrphans(input);
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const raw = match[0];
    const key = `rich-${tokenIndex++}`;

    if (raw.startsWith("[[")) {
      nodes.push(
        <span key={key} className="copy-key">
          {raw.slice(2, -2)}
        </span>,
      );
    } else {
      nodes.push(
        <strong key={key} className="copy-strong">
          {raw.slice(2, -2)}
        </strong>,
      );
    }

    lastIndex = start + raw.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

type RichCopyProps = {
  children: string;
  as?: "p" | "span";
  className?: string;
};

export default function RichCopy({
  children,
  as: Tag = "span",
  className = "",
}: RichCopyProps) {
  return <Tag className={className}>{parseRichCopy(children)}</Tag>;
}
