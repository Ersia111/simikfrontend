import { Link } from "react-router-dom";

function HomeCTA() {
  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[#050b1a]" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(37,99,235,0.20), transparent 50%), radial-gradient(circle at 75% 70%, rgba(167,139,250,0.12), transparent 42%)",
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.18), rgba(167,139,250,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center justify-center">
        <div className="absolute h-[560px] w-[560px] rounded-full border border-blue-300/10" />
        <div className="absolute h-[430px] w-[430px] rounded-full border border-purple-300/10" />
        <div className="absolute h-[300px] w-[300px] rounded-full border border-cyan-300/10" />

        <div
          className="absolute h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg, transparent, rgba(96,165,250,0.18), transparent, rgba(167,139,250,0.18), transparent)",
            filter: "blur(1px)",
            animation: "ctaSpin 18s linear infinite",
          }}
        />

        <div
          className="relative z-10 mx-auto max-w-4xl rounded-[3rem] border border-white/10 bg-white/[0.045] p-10 text-center shadow-2xl backdrop-blur-2xl md:p-16"
          style={{
            boxShadow:
              "0 45px 140px rgba(0,0,0,0.48), 0 0 90px rgba(96,165,250,0.18)",
          }}
        >
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-200/80">
            Start your bridge
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Ndërto urën tënde{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              profesionale
            </span>
            .
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-blue-100/65 md:text-base">
            Bashkohu me Si Mik dhe lidhu me talentin, mundësitë dhe kompanitë
            që kërkojnë njerëzit e duhur.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-full bg-white px-9 py-4 font-bold text-[#050b1a] shadow-xl shadow-blue-500/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-100 hover:shadow-blue-400/40"
            >
              Regjistrohu
            </Link>

            <Link
              to="/jobs"
              className="rounded-full border border-white/20 bg-white/10 px-9 py-4 font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              Shiko Punët
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-xl gap-3 text-left md:grid-cols-3">
            {["Talent", "Mundësi", "Lidhje"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-blue-100/55"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ctaSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

export default HomeCTA;