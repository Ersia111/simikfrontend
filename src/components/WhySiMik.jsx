import { useRef } from "react";
import { motion as m, useScroll, useTransform } from "framer-motion";

function WhySiMik() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const lineScale = useTransform(scrollYProgress, [0.18, 0.82], [0, 1]);

  const story = [
    {
      year: "2022",
      title: "Ideja nisi nga një realitet",
      text: "Në Shqipëri shpesh dëgjojmë se puna gjendet “me mik”.",
    },
    {
      year: "Si Mik",
      title: "Ne e kthyem konceptin në urë",
      text: "Jo mik për favor, por mik si lidhje mes aftësive dhe mundësive reale.",
    },
    {
      year: "Sot",
      title: "Një platformë për lidhje profesionale",
      text: "Si Mik ndihmon punonjësit dhe punëdhënësit të takohen në mënyrë më të qartë.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-36 pt-16 text-white"
    >
      <m.div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-5xl rounded-full blur-[120px]"
        style={{
          y: glowY,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.18), rgba(167,139,250,0.08), transparent 68%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px), radial-gradient(circle, rgba(96,165,250,0.45) 1px, transparent 1px)",
          backgroundSize: "130px 130px, 210px 210px",
          backgroundPosition: "0 0, 80px 120px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <m.div
          className="mx-auto mb-20 max-w-3xl text-center"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/60">
            Pse Si Mik?
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Nga një shprehje e njohur,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              në një urë digjitale
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/60 md:text-base">
            Si Mik ka lindur nga ideja që lidhjet nuk duhet të jenë favor, por
            mundësi të drejta për talentin dhe kompanitë.
          </p>
        </m.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 overflow-hidden bg-white/10 md:block">
            <m.div
              className="h-full w-full origin-top bg-gradient-to-b from-blue-400 via-cyan-300 to-purple-400"
              style={{ scaleY: lineScale }}
            />
          </div>

          <div className="space-y-14">
            {story.map((item, index) => {
              const isRight = index % 2 === 1;

              return (
                <m.div
                  key={item.title}
                  className={`relative grid items-center gap-8 md:grid-cols-2 ${
                    isRight ? "md:[&>*:first-child]:col-start-2" : ""
                  }`}
                  initial={{
                    opacity: 0,
                    y: 70,
                    x: isRight ? 60 : -60,
                    rotateY: isRight ? -10 : 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotateY: 0,
                  }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.85,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                >
                  <m.div
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl backdrop-blur-xl"
                    whileHover={{
                      y: -8,
                      rotateX: 3,
                      rotateY: isRight ? -5 : 5,
                      scale: 1.02,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 18,
                    }}
                    style={{
                      boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-500/10 blur-[55px] transition group-hover:bg-blue-400/20" />

                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />

                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300/70">
                      {item.year}
                    </p>

                    <h3 className="mt-4 text-2xl font-black">{item.title}</h3>

                    <p className="mt-4 text-sm leading-7 text-blue-100/65">
                      {item.text}
                    </p>
                  </m.div>

                  <div className="hidden md:block" />

                  <m.div
                    className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/40 bg-[#050b1a] md:block"
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                    }}
                    style={{
                      boxShadow: "0 0 35px rgba(96,165,250,0.75)",
                    }}
                  />
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySiMik;