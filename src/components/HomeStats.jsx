function HomeStats() {
  const stats = [
    { value: "3", label: "Role kryesore" },
    { value: "IT", label: "Fokus i specializuar" },
    { value: "CV", label: "Portfolio & dokumente" },
    { value: "360°", label: "Proces i plotë aplikimi" },
  ];

  return (
    <section className="bg-[#07152f] px-6 pb-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-xl shadow-blue-950/30 backdrop-blur-xl"
            >
              <h3 className="text-4xl font-black text-blue-200">
                {item.value}
              </h3>
              <p className="mt-3 text-sm font-semibold text-blue-100/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeStats;