"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Poznaj mnie", href: "#about" },
    { label: "Zakres wsparcia", href: "#services" },
    { label: "Napisz do mnie", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-(--bg-soft)/90 backdrop-blur-xl shadow-md">
      <div className="container-custom flex justify-between items-center py-3 xl:py-10 px-6">
        {/* Logo / nazwa */}
        <div className="2xl:ml-74 xl:ml-34 md:ml-16">
          <a
            href="/"
            className="xl:text-5xl text-3xl font-extralight tracking-widest cursor-pointer flex flex-col text-center md:text-left md:flex-row items-center md:gap-2"
            style={{ color: "var(--primary)" }}
          >
            <span>Paulina Misztal.</span>
            <span className="text-base md:text-lg">ODNOWA WEWNĘTRZNA</span>
          </a>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition transform hover:scale-105 hover:text-(--accent)"
              style={{ color: "var(--text)" }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="px-5 py-2 rounded-xl transition hover:opacity-90 hover:shadow-md"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--bg-soft)",
            }}
          >
            Spotkajmy się
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-3xl"
            style={{ color: "var(--text)" }}
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-(--bg-soft) shadow-md overflow-hidden transition-all duration-300 ease-out">
          <div className="flex flex-col items-center py-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg transition hover:text-(--accent)"
                style={{ color: "var(--text)" }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              className="mt-2 px-6 py-2 rounded-xl text-center transition hover:opacity-90"
              style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
              onClick={() => setIsOpen(false)}
            >
              Spotkajmy się
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
