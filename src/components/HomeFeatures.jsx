
import { useEffect, useRef } from "react";

function HomeFeatures() {
  const features = [
    {
      icon: "+",
      title: "Për Punonjësit",
      text: "Krijo profilin, ngarko CV dhe portfolio, dhe apliko në mundësi pune në fushën e IT.",
      glow: "rgba(96,165,250,0.15)",
      border: "rgba(96,165,250,0.25)",
    },
    {
      icon: "+",
      title: "Për Punëdhënësit",
      text: "Posto njoftime pune, menaxho aplikantët dhe gjej kandidatët më të përshtatshëm.",
      glow: "rgba(167,139,250,0.15)",
      border: "rgba(167,139,250,0.25)",
    },
    {
      icon: "+",
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
    <section
      className="relative px-6 pb-32 pt-10 text-white overflow-hidden"
      style={{ background: "#050b1a" }}
    >
      {/* vazhdimësi glow nga hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-[-100px] top-[-60px] h-[320px] w-[320px] rounded-full blur-[90px]"
        style={{ background: "rgba(59,130,246,0.12)" }}
      />
      <div
        className="pointer-events-none absolute right-[-100px] bottom-[-60px] h-[320px] w-[320px] rounded-full blur-[90px]"
        style={{ background: "rgba(99,102,241,0.12)" }}
      />

      {/* divider vizual nga hero */}
      <div className="mx-auto mb-16 max-w-xs">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(96,165,250,0.4), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* titull seksioni */}
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

        {/* kartat */}
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
              {/* glow dekorativ brenda kartës */}
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

              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                style={{
                  background: item.glow,
                  border: `1px solid ${item.border}`,
                }}
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-black">{item.title}</h3>
              <p
                className="mt-3 text-sm leading-7"
                style={{ color: "rgba(191,219,254,0.65)" }}
              >
                {item.text}
              </p>

              {/* numri dekorativ */}
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