import { useEffect, useRef } from "react";

function HomeFeatures() {
  const features = [
    {
      title: "Për Punonjësit",
      text: "Krijo profilin, ngarko CV dhe portfolio, dhe apliko në mundësi pune në fushën e IT.",
      glow: "rgba(96,165,250,0.15)",
      border: "rgba(96,165,250,0.25)",
    },
    {
      title: "Për Punëdhënësit",
      text: "Posto njoftime pune, menaxho aplikantët dhe gjej kandidatët më të përshtatshëm.",
      glow: "rgba(167,139,250,0.15)",
      border: "rgba(167,139,250,0.25)",
    },
    {
      title: "Proces i strukturuar",
      text: "Çdo hap është i organizuar: nga profili, aplikimi, dokumentet dhe statusi i kandidatit.",
      glow: "rgba(99,102,241,0.15)",
      border: "rgba(99,102,241,0.25)",
    },
  ];

  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0px)";
            }, i * 150);

            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      obs.observe(card);
      return obs;
    });

    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <section className="relative -mt-24 overflow-hidden px-6 pb-32 pt-0 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[#050b1a]" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.20) 0%, transparent 48%), radial-gradient(circle at 80% 30%, rgba(167,139,250,0.12) 0%, transparent 42%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle, rgba(96,165,250,0.65) 1px, transparent 1px)",
          backgroundSize: "90px 90px, 140px 140px",
          backgroundPosition: "0 0, 40px 60px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,11,26,0) 0%, rgba(5,11,26,0.35) 18%, rgba(5,11,26,0.92) 55%, rgba(5,11,26,1) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute left-[-100px] top-[20px] h-[320px] w-[320px] rounded-full blur-[90px]"
        style={{ background: "rgba(59,130,246,0.10)" }}
      />

      <div
        className="pointer-events-none absolute right-[-100px] bottom-[-60px] h-[320px] w-[320px] rounded-full blur-[90px]"
        style={{ background: "rgba(99,102,241,0.10)" }}
      />

      <div className="relative mx-auto max-w-7xl pt-40">
        <div className="mb-12 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(147,197,253,0.6)" }}
          >
            Si funksionon
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Gjithçka që të duhet,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              në një vend
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                borderRadius: "1.5rem",
                border: `1px solid ${item.border}`,
                background: `radial-gradient(circle at 30% 20%, ${item.glow}, rgba(255,255,255,0.04) 60%)`,
                backdropFilter: "blur(16px)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: item.glow,
                  filter: "blur(40px)",
                  pointerEvents: "none",
                }}
              />

              <h3 className="text-lg font-black">{item.title}</h3>

              <p
                className="mt-3 text-sm leading-7"
                style={{ color: "rgba(191,219,254,0.65)" }}
              >
                {item.text}
              </p>

              <div
                className="mt-6 text-[0.7rem] font-bold uppercase tracking-widest"
                style={{ color: item.border }}
              >
                0{i + 1} —
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFeatures;