import { useEffect, useState, useRef } from "react";
import leftHand from "../assets/lefthand.png";
import rightHand from "../assets/righthand.png";

function ScrollHandsHero() {
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const [startOffset, setStartOffset] = useState(280);
  const connectedRef = useRef(false);

  // startOffset dinamik bazuar në madhësinë e ekranit
  useEffect(() => {
    function updateOffset() {
      const w = window.innerWidth;
      if (w < 480) setStartOffset(100);       // mobile i vogël — shumë afër
      else if (w < 768) setStartOffset(150);  // mobile i madh
      else if (w < 1024) setStartOffset(220); // tablet
      else setStartOffset(280);               // desktop
    }
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const maxScroll = window.innerHeight * 0.65;
      const value = Math.min(window.scrollY / maxScroll, 1);
      setProgress(value);

      if (value > 0.97 && !connectedRef.current) {
        connectedRef.current = true;
        setBurst(true);
        setTimeout(() => setBurst(false), 800);
      }
      if (value < 0.9) connectedRef.current = false;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const offset = startOffset - progress * startOffset;
  const arcY = Math.sin(progress * Math.PI) * -30;
  const rotL = progress * 8;
  const rotR = progress * -8;

  // madhësia e duarve dinamike
  const handSize = typeof window !== "undefined"
    ? window.innerWidth < 480 ? "160px"
    : window.innerWidth < 768 ? "220px"
    : window.innerWidth < 1024 ? "280px"
    : "340px"
    : "340px";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050b1a] text-white flex flex-col items-center justify-center">

      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(37,99,235,0.45),transparent_45%)] pointer-events-none" />
      <div className="absolute top-[-120px] left-[-120px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-140px] right-[-100px] h-[440px] w-[440px] rounded-full bg-indigo-500/20 blur-[110px] pointer-events-none" />

      {/* Hero text */}
      <div className="relative z-20 text-center px-4">
        <span className="inline-block rounded-full border border-blue-300/20 bg-white/8 backdrop-blur px-5 py-2 text-xs font-semibold tracking-widest uppercase text-blue-100">
          Employee &bull; Employer &bull; Opportunities
        </span>
        <h1 className="mt-5 text-5xl md:text-7xl font-black tracking-tight leading-tight">
          Connecting<br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            IT Talent
          </span>
        </h1>
        <p className="mt-3 text-blue-100/75 text-base md:text-lg">
          Where employers and employees come together<br />
          to build the{" "}
          <span className="text-blue-400">future of technology</span>.
        </p>
      </div>

      {/* Hands stage */}
      <div
        className="relative z-10 w-full flex items-center justify-center mt-4"
        style={{ height: "260px" }}
      >
        {/* Burst */}
        <div
          className="absolute z-30 rounded-full pointer-events-none"
          style={{
            width: "80px",
            height: "80px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: burst
              ? "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(120,180,255,0.6) 40%, transparent 70%)"
              : "transparent",
            scale: burst ? "4" : "1",
            opacity: burst ? "1" : "0",
            transition: burst ? "all 0.1s" : "all 0.5s",
          }}
        />

        {/* Dora e majtë */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-100% - ${offset}px), calc(-50% + ${arcY}px)) rotate(${rotL}deg)`,
            transformOrigin: "right center",
          }}
        >
          <img
            src={leftHand}
            alt="Left hand"
            style={{
              width: handSize,
              maxWidth: "44vw",
              display: "block",
              filter: `drop-shadow(0 0 ${14 + progress * 18}px rgba(96,165,250,${0.5 + progress * 0.4}))`,
            }}
          />
        </div>

        {/* Dora e djathtë */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(${offset}px, calc(-50% + ${arcY}px)) rotate(${rotR}deg)`,
            transformOrigin: "left center",
          }}
        >
          <img
            src={rightHand}
            alt="Right hand"
            style={{
              width: handSize,
              maxWidth: "44vw",
              display: "block",
              filter: `drop-shadow(0 0 ${14 + progress * 18}px rgba(167,139,250,${0.5 + progress * 0.4}))`,
            }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-20 flex flex-col items-center gap-1 mt-2 text-blue-300/70 text-[11px] uppercase tracking-widest">
        <span>Scroll down</span>
        <div className="w-px h-7 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent" />
        <div className="w-5 h-7 rounded-xl border border-blue-300/40 flex justify-center pt-1">
          <div className="w-[3px] h-2 rounded-full bg-blue-300/80 animate-bounce" />
        </div>
        <div className="w-px h-7 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent" />
        <span className="text-blue-400">to connect</span>
      </div>

    </section>
  );
}

export default ScrollHandsHero;