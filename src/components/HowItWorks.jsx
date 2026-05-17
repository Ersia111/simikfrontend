function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Krijo profilin",
      text: "Punonjësi regjistrohet, plotëson profilin profesional dhe ngarkon CV ose portfolio.",
    },
    {
      number: "02",
      title: "Publiko mundësi",
      text: "Punëdhënësi zgjedh paketën dhe publikon njoftime pune për pozicione në IT.",
    },
    {
      number: "03",
      title: "Lidhu me kandidatët",
      text: "Platforma i afron të dyja palët në një proces më të qartë dhe më të strukturuar.",
    },
  ];

  return (
    <section className="bg-[#07152f] px-6 pb-24 text-white">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-950/40 backdrop-blur-xl md:p-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
            How it works
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Një proces i thjeshtë, nga profili te aplikimi.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[2rem] border border-white/10 bg-[#0c1f44]/70 p-7"
            >
              <span className="text-4xl font-black text-blue-300">
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-black">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-blue-100/70">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;