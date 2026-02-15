"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      4000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-4 px-10 overflow-hidden bg-linear-to-br from-bg bg-(--accent)/30">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-snug">
            Konsultacje psychologiczne, hipnoterapia
          </h1>

          <p className="text-lg md:text-xl text-text-muted mb-4 max-w-md mx-auto md:mx-0">
            Bezpieczna przestrzeń do rozmowy, zrozumienia i realnej zmiany.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="bg-(--primary) text-(--bg-soft) px-6 py-3 rounded-xl hover:opacity-90 transition text-center"
            >
              {" "}
              Spotkajmy się{" "}
            </a>

            <a
              href="#services"
              className="border border-(--primary) text-(--primary) px-6 py-3 rounded-xl hover:bg-(--pri) bg-(--bg-soft)  transition text-center"
            >
              Sprawdź zakres wsparcia
            </a>
          </div>
        </motion.div>

        {/* RIGHT — IMAGE SLIDER */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto md:mx-0 w-full max-w-sm md:max-w-md lg:max-w-lg"
        >
          <div className="relative rounded-xl border border-(--accent) p-1">
            <div className="overflow-hidden rounded-xl aspect-4/5 relative">
              {images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="image"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 rounded-xl ${i === index ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />
            </div>

            {/* dots */}
            <div className="flex justify-center gap-3 m-3">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-(--primary) scale-125" : "bg-(--text-muted)/40"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
