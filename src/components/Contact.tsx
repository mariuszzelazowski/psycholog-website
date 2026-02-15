"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaFacebookMessenger } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const colors = {
    primary: "var(--primary)",
    accent: "var(--accent)",
    bg: "var(--bg)",
    text: "var(--text)",
    textMuted: "var(--text-muted)",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const contactInfo = [
    { label: "Email", value: "kontakt@psycholog.pl" },
    { label: "Telefon", value: "+48 123 456 789" },
    { label: "Adres", value: "Warszawa, Bródno" },
  ];

  const InputField = ({
    name,
    placeholder,
    type = "text",
    rows,
  }: {
    name: string;
    placeholder: string;
    type?: string;
    rows?: number;
  }) =>
    rows ? (
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className="w-full p-4 rounded-xl border focus:ring-2 transition"
        style={{
          borderColor: colors.accent,
          color: colors.text,
          backgroundColor: colors.bg,
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className="w-full p-4 rounded-xl border focus:ring-2 transition"
        style={{
          borderColor: colors.accent,
          color: colors.text,
          backgroundColor: colors.bg,
        }}
      />
    );

  return (
    <section id="contact" className="py-10 flex flex-col items-center">
      {/* Nagłówek */}
      <h2
        className="text-3xl md:text-4xl font-light text-center mb-10"
        style={{ color: colors.primary }}
      >
        Napisz do mnie
      </h2>

      <div className="container mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start justify-center md:justify-start max-w-6xl">
        {/* Info + Socials */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-6 text-center md:text-left max-w-md"
        >
          <p style={{ color: colors.textMuted }}>
            Masz pytania lub chcesz umówić wizytę? <br /> Odezwij się. <br />{" "}
            Odpowiem tak szybko, jak to możliwe.
          </p>

          <div
            className="flex flex-col gap-3"
            style={{ color: colors.textMuted }}
          >
            {contactInfo.map((item) => (
              <div key={item.label}>
                <strong>{item.label}:</strong> {item.value}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center md:justify-start gap-6">
            <a
              href="https://www.facebook.com/paulina.misztal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} style={{ color: colors.textMuted }} />
            </a>
            <a
              href="https://www.messenger.com/t/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookMessenger
                size={24}
                style={{ color: colors.textMuted }}
              />
            </a>
            <a
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} style={{ color: colors.textMuted }} />
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-4 p-4 mx-20 rounded-xl shadow-lg max-w-md w-90"
          style={{ backgroundColor: colors.bg }}
        >
          <InputField name="name" placeholder="Imię" />
          <InputField name="email" placeholder="Email" type="email" />
          <InputField name="message" placeholder="Wiadomość" rows={8} />

          <button
            type="submit"
            className="mt-1 py-3 rounded-xl hover:opacity-90 transition"
            style={{ backgroundColor: colors.primary }}
          >
            Napisz mi wiadomość
          </button>
        </motion.form>
      </div>
    </section>
  );
}
