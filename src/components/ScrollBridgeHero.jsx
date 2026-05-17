import { useEffect, useState } from "react";
import bridge from "../assets/bridge.png";

function ScrollBridgeHero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const maxScroll = window.innerHeight * 0.65;
      const value = Math.min(window.scrollY / maxScroll, 1);
      setProgress(value);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const moveX = progress * 520;
  const moveY = Math.sin(progress * Math.PI) * -120;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050b1a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(37,99,235,0.45),transparent_45%)]" />
      <div className="absolute left-[-220px] top-[-200px] h-[520px] w-[520px] rounded-full bg-blue-500/25 blur-[140px]" />
      <div className="absolute bottom-[-220px] right-[-180px] h-[540px] w-[540px] rounded-full bg-indigo-500/25 blur-[150px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-16">
        <div className="z-20 text-center">
          <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            Platformë për karriera në IT
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
            Connecting IT Talent
          </h1>

          <p className="mt-4 text-lg text-blue-100/75">
            Where employees and employers meet.
          </p>
        </div>

        <div className="relative mt-2 h-[520px] w-full">
          <img
            src={bridge}
            alt="Bridge"
            className="absolute left-1/2 top-0 z-10 w-[980px] -translate-x-1/2 select-none opacity-95 drop-shadow-[0_50px_90px_rgba(59,130,246,0.35)]"
          />

          <div
            style={{
              transform: `translate(${moveX}px, ${moveY}px)`,
            }}
            className="absolute left-[20%] top-[63%] z-30 transition-transform duration-75"
          >
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.9)]" />
              <p className="mt-2 text-sm font-bold">Employee</p>
            </div>
          </div>

          <div className="absolute right-[18%] top-[52%] z-30">
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-blue-300 shadow-[0_0_45px_rgba(147,197,253,0.9)]" />
              <p className="mt-2 text-sm font-bold">Employer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollBridgeHero;