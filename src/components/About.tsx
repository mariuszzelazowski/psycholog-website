"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="w-full p-2 max-w-m aspect-4/5 bg-(--bg) rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-(--text-muted)">
              Tutaj będzie moje profesjonalne zdjęcie
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-4xl md: text-center lg:text-left font-light mb-6 text-(--primary)">
            Poznaj mnie
          </h2>

          <p className="mb-4 text-(--text-muted)">
            Nazywam się Paulina Misztal i jestem psychologiem...
          </p>

          <p className="text-(--text-muted)">
            W swojej pracy łączę empatię i profesjonalizm...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
