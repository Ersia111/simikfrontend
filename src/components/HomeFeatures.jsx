import { useEffect, useRef } from "react";

function HomeFeatures() {
  const features = [
    {
      title: "Për Punonjësit",
      subtitle: "Ndërto profilin tënd profesional",
      text: "Krijo profilin, ngarko CV dhe portfolio, dhe apliko në mundësi pune në fushën e IT.",
      backTitle: "Çfarë përfiton?",
      points: ["Profil profesional", "CV & portfolio", "Aplikim i shpejtë", "Mundësi në IT"],
      glow: "rgba(96,165,250,0.18)",
      border: "rgba(96,165,250,0.28)",
      color: "#60a5fa",
    },
    {
      title: "Për Punëdhënësit",
      subtitle: "Gjej kandidatët e duhur",
      text: "Posto njoftime pune, menaxho aplikantët dhe gjej kandidatët më të përshtatshëm.",
      backTitle: "Çfarë menaxhon?",
      points: ["Postime pune", "Aplikantë", "Kandidatë të filtruar", "Proces më i qartë"],
      glow: "rgba(167,139,250,0.18)",
      border: "rgba(167,139,250,0.28)",
      color: "#a78bfa",
    },
    {
      title: "Proces i strukturuar",
      subtitle: "Nga profili te aplikimi",
      text: "Çdo hap është i organizuar: nga profili, aplikimi, dokumentet dhe statusi i kandidatit.",
      backTitle: "Si funksionon?",
      points: ["Regjistrim", "Dokumente", "Aplikim", "Status kandidati"],
      glow: "rgba(99,102,241,0.18)",
      border: "rgba(99,102,241,0.28)",
      color: "#818cf8",
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

    return () => observers.forEach((observer) => observer && observer.disconnect());
  }, []);

  return (
    <section className="relative -mt-24 overflow-hidden px-6 pb-32 pt-0 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[#050b1a]" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 48%), radial-gradient(circle at 85% 35%, rgba(167,139,250,0.12) 0%, transparent 45%), radial-gradient(circle at 10% 65%, rgba(59,130,246,0.10) 0%, transparent 42%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(circle, rgba(96,165,250,0.55) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 190px 190px",
          backgroundPosition: "0 0, 60px 80px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,11,26,0) 0%, rgba(5,11,26,0.50) 30%, rgba(5,11,26,0.94) 72%, rgba(5,11,26,1) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute left-[-120px] top-[80px] h-[360px] w-[360px] rounded-full blur-[100px]"
        style={{ background: "rgba(59,130,246,0.12)" }}
      />

      <div
        className="pointer-events-none absolute right-[-120px] bottom-[-80px] h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: "rgba(99,102,241,0.12)" }}
      />

      <div className="relative mx-auto max-w-7xl pt-32">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/60">
            Si funksionon
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Gjithçka që të duhet,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              në një vend
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/60 md:text-base">
            Një eksperiencë moderne për punonjësit dhe punëdhënësit, ku lidhja
            bëhet më e qartë, më profesionale dhe më e shpejtë.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {features.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group relative h-[310px] [perspective:1200px]"
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div
                  className="absolute inset-0 overflow-hidden rounded-[2rem] border p-8 shadow-2xl [backface-visibility:hidden]"
                  style={{
                    borderColor: item.border,
                    background: `radial-gradient(circle at 30% 20%, ${item.glow}, rgba(255,255,255,0.045) 58%)`,
                    backdropFilter: "blur(18px)",
                    boxShadow: `0 30px 90px rgba(0,0,0,0.35), 0 0 45px ${item.glow}`,
                  }}
                >
                  <div
                    className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full blur-[50px]"
                    style={{ background: item.glow }}
                  />

                  <div
                    className="absolute bottom-[-70px] left-[-70px] h-44 w-44 rounded-full blur-[70px]"
                    style={{ background: item.glow }}
                  />

                  <div
                    className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black"
                    style={{
                      color: item.color,
                      border: `1px solid ${item.border}`,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    0{i + 1}
                  </div>

                  <p
                    className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ color: item.color }}
                  >
                    {item.subtitle}
                  </p>

                  <h3 className="text-2xl font-black">{item.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-blue-100/65">
                    {item.text}
                  </p>

                  <div className="absolute bottom-7 left-8 right-8 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/35">
                      Click card
                    </span>

                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>

                <div
                  className="absolute inset-0 overflow-hidden rounded-[2rem] border p-8 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{
                    borderColor: item.border,
                    background: `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035)), radial-gradient(circle at 70% 20%, ${item.glow}, transparent 55%)`,
                    backdropFilter: "blur(20px)",
                    boxShadow: `0 30px 90px rgba(0,0,0,0.38), 0 0 55px ${item.glow}`,
                  }}
                >
                  <div
                    className="absolute inset-x-10 top-0 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${item.color}, transparent)`,
                    }}
                  />

                  <p
                    className="text-xs font-bold uppercase tracking-[0.3em]"
                    style={{ color: item.color }}
                  >
                    Details
                  </p>

                  <h3 className="mt-4 text-2xl font-black">{item.backTitle}</h3>

                  <div className="mt-7 space-y-4">
                    {item.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-blue-100/75"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: item.color }}
                        />
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-7 left-8 right-8 text-xs font-bold uppercase tracking-widest text-white/35">
                 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .group:hover [style] {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default HomeFeatures;