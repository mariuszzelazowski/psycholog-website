export default function Services() {
  const services = [
    "Konsultacje psychologiczne",
    "Hipnoterapia",
    "Wsparcie w kryzysie",
    "Zarządzanie stresem",
  ];

  return (
    <section id="services" className="py-8 bg-(--bg-soft)">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-light mb-8 text-(--primary)">
          Zakres wsparcia
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service}
              className="p-8 bg-(--bg) shadow-md hover:shadow-lg transition"
            >
              <p className="text-lg">{service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
