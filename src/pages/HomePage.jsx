import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import ScrollHandsHero from "../components/ScrollHandsHero";
import HomeFeatures from "../components/HomeFeatures";

function HomePage() {
  return (
    <main className="bg-[#050b1a] text-white">
      <ScrollHandsHero />
      <HomeFeatures />
      <HowItWorks />
      <HomeStats />
      <HomeCTA />
    </main>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Krijo profilin",
      text: "Punonjësi regjistrohet, plotëson profilin profesional dhe ngarkon CV ose portfolio.",
      glow: "rgba(96,165,250,0.2)",
      border: "rgba(96,165,250,0.3)",
      color: "#60a5fa",
    },
    {
      number: "02",
      title: "Publiko mundësi",
      text: "Punëdhënësi zgjedh paketën dhe publikon njoftime pune për pozicione në IT.",
      glow: "rgba(167,139,250,0.2)",
      border: "rgba(167,139,250,0.3)",
      color: "#a78bfa",
    },
    {
      number: "03",
      title: "Lidhu me kandidatët",
      text: "Platforma i afron të dyja palët në një proces më të qartë dhe më të strukturuar.",
      glow: "rgba(99,102,241,0.2)",
      border: "rgba(99,102,241,0.3)",
      color: "#818cf8",
    },
  ];

  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [animated, steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-32 pt-10 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300/60">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Një proces i thjeshtë,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              nga profili te aplikimi
            </span>
          </h2>
        </div>

        <div className="relative flex flex-col items-center md:flex-row md:items-stretch md:justify-center">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center md:flex-row md:items-stretch"
            >
              <div
                onClick={() => setActive(i)}
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s ease ${
                    i * 0.18
                  }s, transform 0.6s ease ${i * 0.18}s, border 0.4s, box-shadow 0.4s, background 0.4s`,
                  borderRadius: "1.5rem",
                  border: `1.5px solid ${
                    active === i ? step.border : "rgba(255,255,255,0.08)"
                  }`,
                  background:
                    active === i
                      ? `radial-gradient(circle at 30% 20%, ${step.glow}, rgba(255,255,255,0.04) 70%)`
                      : "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(16px)",
                  padding: "2rem 1.75rem",
                  width: "220px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow:
                    active === i
                      ? `0 0 40px ${step.glow}, 0 8px 32px rgba(0,0,0,0.3)`
                      : "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="mb-4 text-xs font-bold uppercase tracking-widest"
                  style={{
                    color:
                      active === i ? step.color : "rgba(255,255,255,0.25)",
                  }}
                >
                  {step.number}
                </div>

                <h3
                  className="mb-3 text-base font-black"
                  style={{
                    color: active === i ? "#fff" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-xs leading-6"
                  style={{
                    color:
                      active === i
                        ? "rgba(191,219,254,0.75)"
                        : "rgba(255,255,255,0.3)",
                  }}
                >
                  {step.text}
                </p>

                {active === i && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden rounded-b-3xl"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${step.color}, transparent)`,
                        animation: "progressbar 3s linear forwards",
                      }}
                    />
                  </div>
                )}
              </div>

              {i < steps.length - 1 && (
                <div className="flex items-center justify-center md:px-2">
                  <div className="flex flex-col items-center gap-1 py-2 md:hidden">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        style={{
                          width: "2px",
                          height: "10px",
                          borderRadius: "2px",
                          background:
                            active > i
                              ? steps[i].color
                              : "rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}
                  </div>

                  <div className="hidden items-center gap-1 px-1 md:flex">
                    {[0, 1, 2, 3].map((d) => (
                      <div
                        key={d}
                        style={{
                          width: "10px",
                          height: "2px",
                          borderRadius: "2px",
                          background:
                            active > i
                              ? steps[i].color
                              : "rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}

                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: `7px solid ${
                          active > i
                            ? steps[i].color
                            : "rgba(255,255,255,0.12)"
                        }`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {steps.map((step, i) => (
            <button
              key={step.number}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background:
                  active === i ? step.color : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progressbar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}

function HomeStats() {
  const stats = [
    { value: "500+", label: "Punë aktive", color: "#60a5fa" },
    { value: "1K+", label: "IT Profesionistë", color: "#a78bfa" },
    { value: "200+", label: "Kompani", color: "#818cf8" },
    { value: "360°", label: "Proces i plotë", color: "#34d399" },
  ];

  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-10 text-white">
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300/60">
            Platforma në numra
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Numrat që{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              flasin vetë
            </span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                borderRadius: "1.5rem",
                border: `1px solid ${s.color}33`,
                background: `radial-gradient(circle at 30% 20%, ${s.color}18, rgba(255,255,255,0.03) 70%)`,
                backdropFilter: "blur(16px)",
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div className="text-4xl font-black" style={{ color: s.color }}>
                {s.value}
              </div>

              <div className="mt-2 text-sm font-semibold text-blue-100/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCTA() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-10 text-white">
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          borderRadius: "2rem",
          border: "1px solid rgba(96,165,250,0.2)",
          background:
            "radial-gradient(circle at 30% 40%, rgba(37,99,235,0.25), rgba(99,102,241,0.1) 60%, rgba(255,255,255,0.04))",
          backdropFilter: "blur(20px)",
          padding: "4rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
          Start your bridge
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          Ndërto lidhjen e duhur mes{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            talentit dhe mundësisë
          </span>
          .
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100/65">
          Bashkohu me Si Mik dhe bëje procesin e punësimit në IT më të qartë, më
          të shpejtë dhe më profesional.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="rounded-full bg-white px-8 py-3 font-bold text-[#050b1a] shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:bg-blue-100"
          >
            Regjistrohu
          </Link>

          <Link
            to="/jobs"
            className="rounded-full border border-white/25 bg-white/10 px-8 py-3 font-bold text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
          >
            Shiko Punët
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;