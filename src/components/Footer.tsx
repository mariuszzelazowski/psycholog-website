export default function Footer() {
  return (
    <footer className="bg-(--primary)/60 border-t border-textMuted py-3 text-center text-textMuted text-sm">
      <p className="mb-2">
        © 2026 |{" "}
        <span className="font-semibold text-(--bg-soft)">Paulina Misztal</span>
      </p>
      <p className="space-x-2">
        <span>Psycholog</span> • <span>Hipnoterapia</span> •{" "}
        <span>Warszawa</span> • <span>Online</span>
      </p>
      <p className="mt-2 text-xs text-thin text-(--bg-soft)">
        {" "}
        Strona wykonana z pasją dla bezpieczeństwa i komfortu pacjentów.{" "}
      </p>
    </footer>
  );
}
