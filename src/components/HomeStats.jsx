import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function HomeStats() {
  const stats = useMemo(
    () => [
      {
        value: "3",
        label: "Role kryesore",
        title: "3 role kryesore",
        details: ["Punonjës", "Punëdhënës", "Administrator"],
        color: "#60a5fa",
        glow: "rgba(96,165,250,0.28)",
      },
      {
        value: "IT",
        label: "Fokus",
        title: "Fokus i specializuar",
        details: ["Teknologji", "Programim", "Punë digjitale"],
        color: "#22d3ee",
        glow: "rgba(34,211,238,0.24)",
      },
      {
        value: "CV",
        label: "Portfolio",
        title: "Profil profesional",
        details: ["CV", "Portfolio", "Aftësi"],
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.26)",
      },
      {
        value: "360°",
        label: "Proces",
        title: "Proces i plotë",
        details: ["Regjistrim", "Aplikim", "Lidhje"],
        color: "#818cf8",
        glow: "rgba(129,140,248,0.26)",
      },
    ],
    []
  );

  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const reverseRotation = useTransform(orbitRotation, (value) => -value);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.18, 1]);
  const dashOffset = useTransform(scrollYProgress, (value) => 1 - value);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value < 0.22) setActive(0);
      else if (value < 0.47) setActive(1);
      else if (value < 0.72) setActive(2);
      else setActive(3);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[240vh] overflow-visible px-6 text-white"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-[#050b1a]" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(37,99,235,0.18), transparent 52%), radial-gradient(circle at 80% 70%, rgba(167,139,250,0.10), transparent 42%)",
          }}
        />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{
            scale: glowScale,
            background:
              "radial-gradient(circle, rgba(96,165,250,0.16), rgba(167,139,250,0.08), transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/60">
              Platforma në numra
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Numrat që{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                flasin vetë
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/60 md:text-base">
              Scroll poshtë dhe shiko si ndërtohet struktura e Si Mik hap pas
              hapi.
            </p>
          </div>

          <div className="relative mx-auto flex min-h-[660px] max-w-6xl items-center justify-center">
            <div className="absolute h-[640px] w-[640px] rounded-full border border-blue-300/10" />
            <div className="absolute h-[500px] w-[500px] rounded-full border border-purple-300/10" />

            <svg
              className="pointer-events-none absolute h-[640px] w-[640px] -rotate-90"
              viewBox="0 0 640 640"
            >
              <circle
                cx="320"
                cy="320"
                r="300"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />

              <motion.circle
                cx="320"
                cy="320"
                r="300"
                fill="none"
                stroke={stats[active].color}
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                style={{
                  strokeDashoffset: dashOffset,
                  filter: "drop-shadow(0 0 18px rgba(96,165,250,0.9))",
                }}
              />
            </svg>

            <motion.div
              className="absolute z-20 h-[640px] w-[640px]"
              style={{ rotate: orbitRotation }}
            >
              {stats.map((item, index) => {
                const angle = index * 90 - 90;
                const radius = 320;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const isActive = active === index;

                return (
                  <motion.div
                    key={item.label}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      x,
                      y,
                      translateX: "-50%",
                      translateY: "-50%",
                      rotate: reverseRotation,
                    }}
                  >
                    <div
                      className="rounded-[1.6rem] border px-6 py-5 text-center backdrop-blur-xl transition duration-500"
                      style={{
                        minWidth: "155px",
                        transform: isActive ? "scale(1.16)" : "scale(0.9)",
                        opacity: isActive ? 1 : 0.38,
                        borderColor: isActive
                          ? item.color
                          : "rgba(255,255,255,0.12)",
                        background: isActive
                          ? `radial-gradient(circle at 50% 0%, ${item.glow}, rgba(255,255,255,0.05) 70%)`
                          : "rgba(255,255,255,0.04)",
                        boxShadow: isActive
                          ? `0 0 60px ${item.glow}`
                          : "0 20px 60px rgba(0,0,0,0.25)",
                      }}
                    >
                      <div
                        className="text-3xl font-black"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </div>

                      <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100/65">
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute z-30 w-[360px] rounded-[2.3rem] border p-9 text-center shadow-2xl backdrop-blur-2xl"
              style={{
                borderColor: `${stats[active].color}55`,
                background: `radial-gradient(circle at 50% 0%, ${stats[active].glow}, rgba(255,255,255,0.06) 68%)`,
                boxShadow: `0 40px 120px rgba(0,0,0,0.45), 0 0 80px ${stats[active].glow}`,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: stats[active].color }}
              >
                {stats[active].label}
              </p>

              <h3 className="mt-4 text-4xl font-black">
                {stats[active].title}
              </h3>

              <div className="mt-8 space-y-3">
                {stats[active].details.map((detail) => (
                  <div
                    key={detail}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-blue-100/75"
                  >
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeStats;