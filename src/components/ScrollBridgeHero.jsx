 
import { useEffect, useState, useRef } from "react";
import leftHand from "../assets/lefthand.png";
import rightHand from "../assets/righthand.png";

function ScrollHandsHero() {
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const connectedRef = useRef(false);

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

  // Lëvizja horizontale: nga jashtë drejt qendrës
  const startOffset = 420; // sa larg fillojnë (px)
  const endOffset = 0;     // ku ndalen (qendra)
  const offset = startOffset - progress * (startOffset - endOffset);

  // Hark i butë lart gjatë rrugës
  const arcY = Math.sin(progress * Math.PI) * -40;

  // Rotacion i lehtë kur afrohen
  const rotL = progress * 8;
  const rotR = progress * -8;

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
      <div className="relative z-10 w-full flex items-center justify-center mt-4"
           style={{ height: "340px" }}>

        {/* Burst flash kur bashkohen */}
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
            transition: "background 0.1s",
            scale: burst ? "4" : "1",
            opacity: burst ? "1" : "0",
            transitionDuration: burst ? "0.1s" : "0.5s",
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
            transition: "transform 0.05s linear",
          }}
        >
          <img
            src={leftHand}
            alt="Left hand"
            style={{
              width: "360px",
              maxWidth: "45vw",
              display: "block",
              filter: `drop-shadow(0 0 ${18 + progress * 20}px rgba(96,165,250,${0.4 + progress * 0.5}))`,
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
            transition: "transform 0.05s linear",
          }}
        >
          <img
            src={rightHand}
            alt="Right hand"
            style={{
              width: "360px",
              maxWidth: "45vw",
              display: "block",
              filter: `drop-shadow(0 0 ${18 + progress * 20}px rgba(167,139,250,${0.4 + progress * 0.5}))`,
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