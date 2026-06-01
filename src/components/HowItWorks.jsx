import { useEffect, useRef, useState } from "react";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Krijo profilin",
      text: "Punonjësi regjistrohet, plotëson profilin profesional dhe ngarkon CV ose portfolio.",
      icon: "1",
      glow: "rgba(96,165,250,0.2)",
      border: "rgba(96,165,250,0.3)",
      color: "#60a5fa",
    },
    {
      number: "02",
      title: "Publiko mundësi",
      text: "Punëdhënësi zgjedh paketën dhe publikon njoftime pune për pozicione në IT.",
      icon: "2",
      glow: "rgba(167,139,250,0.2)",
      border: "rgba(167,139,250,0.3)",
      color: "#a78bfa",
    },
    {
      number: "03",
      title: "Lidhu me kandidatët",
      text: "Platforma i afron të dyja palët në një proces më të qartë dhe më të strukturuar.",
      icon: "3",
      glow: "rgba(99,102,241,0.2)",
      border: "rgba(99,102,241,0.3)",
      color: "#818cf8",
    },
  ];

  const [active, setActive] = useState(0);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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
  }, [animated]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 pb-32 pt-10 text-white overflow-hidden"
      style={{ background: "#050b1a" }}
    >
      {/* Background glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-[-100px] top-[-60px] h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ background: "rgba(59,130,246,0.1)" }}
      />
      <div
        className="pointer-events-none absolute right-[-100px] bottom-[-60px] h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ background: "rgba(99,102,241,0.1)" }}
      />

      {/* Divider */}
      <div className="mx-auto mb-16 max-w-xs">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(96,165,250,0.4), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(147,197,253,0.6)" }}
          >
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Një proces i thjeshtë,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              nga profili te aplikimi
            </span>
          </h2>
        </div>

        {/* Diagram */}
        <div className="relative flex flex-col items-center gap-0 md:flex-row md:items-stretch md:justify-center">

          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center md:flex-row md:items-stretch">

              {/* Karta */}
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => setActive(i)}
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s ease ${i * 0.18}s, transform 0.6s ease ${i * 0.18}s`,
                  borderRadius: "1.5rem",
                  border: `1.5px solid ${active === i ? step.border : "rgba(255,255,255,0.08)"}`,
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
                {/* Glow brenda */}
                {active === i && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-30px",
                      right: "-30px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: step.glow,
                      filter: "blur(30px)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                {/* Numri */}
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: active === i ? step.color : "rgba(255,255,255,0.25)" }}
                >
                  {step.number}
                </div>

                {/* Ikona */}
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                  style={{
                    background: active === i ? step.glow : "rgba(255,255,255,0.05)",
                    border: `1px solid ${active === i ? step.border : "rgba(255,255,255,0.08)"}`,
                    transition: "background 0.4s, border 0.4s",
                  }}
                >
                  {step.icon}
                </div>

                <h3
                  className="text-base font-black mb-3"
                  style={{ color: active === i ? "#fff" : "rgba(255,255,255,0.6)" }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-xs leading-6"
                  style={{
                    color: active === i ? "rgba(191,219,254,0.75)" : "rgba(255,255,255,0.3)",
                    transition: "color 0.4s",
                  }}
                >
                  {step.text}
                </p>

                {/* Progress bar poshtë */}
                {active === i && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-3xl overflow-hidden"
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

              {/* Lidhësi midis kartave */}
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center md:px-2">
                  {/* vertical (mobile) */}
                  <div
                    className="flex md:hidden flex-col items-center py-2 gap-1"
                  >
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
                          transition: "background 0.4s",
                          transitionDelay: `${d * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>
                  {/* horizontal (desktop) */}
                  <div className="hidden md:flex items-center gap-1 px-1">
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
                          transition: "background 0.4s",
                          transitionDelay: `${d * 0.06}s`,
                        }}
                      />
                    ))}
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: `7px solid ${active > i ? steps[i].color : "rgba(255,255,255,0.12)"}`,
                        transition: "border-left-color 0.4s",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dot navigimi poshtë */}
        <div className="mt-10 flex justify-center gap-3">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: active === i ? step.color : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "width 0.4s, background 0.4s",
                padding: 0,
              }}
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

export default HowItWorks;