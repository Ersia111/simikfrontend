import { useEffect, useRef, useState } from "react";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      label: "Employee",
      title: "Krijo profilin",
      text: "Punonjësi ndërton profilin profesional me aftësi, CV dhe portfolio.",
      meta: ["CV", "Portfolio", "Skills"],
      glow: "rgba(96,165,250,0.22)",
      border: "rgba(96,165,250,0.32)",
      color: "#60a5fa",
    },
    {
      number: "02",
      label: "Opportunity",
      title: "Apliko ose publiko mundësi",
      text: "Punëdhënësi publikon pozicione, ndërsa kandidati aplikon në mundësitë që i përshtaten.",
      meta: ["Jobs", "Criteria", "Apply"],
      glow: "rgba(167,139,250,0.22)",
      border: "rgba(167,139,250,0.32)",
      color: "#a78bfa",
    },
    {
      number: "03",
      label: "Connection",
      title: "Lidhu me kandidatin",
      text: "Platforma ndihmon që lidhja mes talentit dhe kompanisë të jetë më e qartë dhe profesionale.",
      meta: ["Match", "Status", "Contact"],
      glow: "rgba(99,102,241,0.22)",
      border: "rgba(99,102,241,0.32)",
      color: "#818cf8",
    },
  ];

  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;

    if (percent < 0.34) setActive(0);
    else if (percent < 0.67) setActive(1);
    else setActive(2);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden px-6 pb-36 pt-16 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#050b1a]" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.15), transparent 48%), radial-gradient(circle at 15% 70%, rgba(96,165,250,0.10), transparent 38%), radial-gradient(circle at 85% 70%, rgba(167,139,250,0.10), transparent 38%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/60">
            How it works
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Nga profili te lidhja,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              çdo hap ndërton urën
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/60 md:text-base">
            Lëvize mausin nga e majta në të djathtë për të parë procesin hap pas hapi.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const isActive = active === index;
            const isPassed = active > index;

            return (
              <div
                key={step.number}
                className="relative"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? isActive
                      ? "translateY(-18px) scale(1.06)"
                      : "translateY(0px) scale(1)"
                    : `translateY(${50 + index * 14}px)`,
                  transition: `opacity 0.7s ease ${
                    index * 0.15
                  }s, transform 0.55s ease`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="group relative w-full text-left"
                >
                  <div
                    className="relative min-h-[360px] overflow-hidden rounded-[2.4rem] border p-9 shadow-2xl backdrop-blur-xl transition duration-500"
                    style={{
                      borderColor:
                        isActive || isPassed
                          ? step.border
                          : "rgba(255,255,255,0.09)",
                      background:
                        isActive || isPassed
                          ? `radial-gradient(circle at 30% 20%, ${step.glow}, rgba(255,255,255,0.045) 65%)`
                          : "rgba(255,255,255,0.035)",
                      boxShadow: isActive
                        ? `0 35px 110px rgba(0,0,0,0.45), 0 0 65px ${step.glow}`
                        : "0 25px 80px rgba(0,0,0,0.32)",
                    }}
                  >
                    <div
                      className="absolute right-[-70px] top-[-70px] h-52 w-52 rounded-full blur-[75px]"
                      style={{
                        background: isActive
                          ? step.glow
                          : "rgba(255,255,255,0.04)",
                      }}
                    />

                    <div className="relative mb-10 flex items-center justify-between">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border text-base font-black"
                        style={{
                          borderColor:
                            isActive || isPassed
                              ? step.border
                              : "rgba(255,255,255,0.1)",
                          color:
                            isActive || isPassed
                              ? step.color
                              : "rgba(255,255,255,0.35)",
                          background:
                            isActive || isPassed
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(255,255,255,0.03)",
                        }}
                      >
                        {step.number}
                      </div>

                      <span
                        className="rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em]"
                        style={{
                          borderColor:
                            isActive || isPassed
                              ? step.border
                              : "rgba(255,255,255,0.08)",
                          color:
                            isActive || isPassed
                              ? step.color
                              : "rgba(255,255,255,0.35)",
                        }}
                      >
                        {step.label}
                      </span>
                    </div>

                    <h3
                      className="relative text-2xl font-black"
                      style={{
                        color:
                          isActive || isPassed
                            ? "#ffffff"
                            : "rgba(255,255,255,0.65)",
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="relative mt-5 text-sm leading-8"
                      style={{
                        color: isActive
                          ? "rgba(191,219,254,0.82)"
                          : "rgba(191,219,254,0.50)",
                      }}
                    >
                      {step.text}
                    </p>

                    <div className="relative mt-7 flex flex-wrap gap-2">
                      {step.meta.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold text-blue-100/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-9 h-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: isActive || isPassed ? "100%" : "0%",
                          background: `linear-gradient(90deg, ${step.color}, transparent)`,
                        }}
                      />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActive(index)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: active === index ? "32px" : "9px",
                background:
                  active === index ? step.color : "rgba(255,255,255,0.2)",
              }}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;