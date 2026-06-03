import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import HeroScene3D from "./HeroScene3D";
import leftHand from "../assets/lefthand.png";
import rightHand from "../assets/righthand.png";

function ScrollHandsHero() {
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const [startOffset, setStartOffset] = useState(260);

  const connectedRef = useRef(false);

  useEffect(() => {
    function updateOffset() {
      const width = window.innerWidth;

      if (width < 480) setStartOffset(85);
      else if (width < 768) setStartOffset(130);
      else if (width < 1024) setStartOffset(200);
      else setStartOffset(260);
    }

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const maxScroll = window.innerHeight * 0.75;
      const value = Math.min(window.scrollY / maxScroll, 1);

      setProgress(value);

      if (value > 0.97 && !connectedRef.current) {
        connectedRef.current = true;
        setBurst(true);

        setTimeout(() => setBurst(false), 800);
      }

      if (value < 0.9) {
        connectedRef.current = false;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const offset = startOffset - progress * startOffset;
  const arcY = Math.sin(progress * Math.PI) * -24;
  const rotateLeft = progress * 7;
  const rotateRight = progress * -7;

  const handSize =
    typeof window !== "undefined"
      ? window.innerWidth < 480
        ? "145px"
        : window.innerWidth < 768
        ? "200px"
        : window.innerWidth < 1024
        ? "260px"
        : "320px"
      : "320px";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
          <HeroScene3D />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_45%,rgba(5,11,26,0)_20%,rgba(5,11,26,0.92)_100%)]" />

      <div className="relative z-20 -mt-10 px-4 text-center md:-mt-16">
        <span className="inline-block rounded-full border border-blue-300/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-blue-100 backdrop-blur">
          Employee &bull; Employer &bull; Opportunities
        </span>

        <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
          Connecting
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            IT Talent
          </span>
        </h1>

        <p className="mt-4 text-base leading-7 text-blue-100/75 md:text-lg">
          Where employers and employees come together
          <br />
          to build the <span className="text-blue-400">future of technology</span>.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/jobs"
            className="rounded-full bg-white px-7 py-3 font-bold text-[#050b1a] shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:bg-blue-100"
          >
            Explore Jobs
          </Link>

          <Link
            to="/register"
            className="rounded-full border border-white/25 bg-white/10 px-7 py-3 font-bold text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
          >
            Post a Job
          </Link>
        </div>
      </div>

      <div
        className="relative z-10 mt-2 flex w-full items-center justify-center"
        style={{ height: "220px" }}
      >
        <div
          className="pointer-events-none absolute z-30 rounded-full"
          style={{
            width: "90px",
            height: "90px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: burst
              ? "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(96,165,250,0.8) 50%, transparent 70%)"
              : "transparent",
            scale: burst ? "6" : "1",
            opacity: burst ? "1" : "0",
            transition: burst ? "all 0.1s" : "all 0.6s",
          }}
        />

        <div
          className="pointer-events-none absolute select-none"
          style={{
            left: "50%",
            top: "46%",
            transform: `translate(calc(-100% - ${offset}px), calc(-50% + ${arcY}px)) rotate(${rotateLeft}deg)`,
            transformOrigin: "right center",
          }}
        >
          <img
            src={leftHand}
            alt="Left hand"
            style={{
              width: handSize,
              maxWidth: "42vw",
              display: "block",
              filter: `drop-shadow(0 0 ${
                14 + progress * 18
              }px rgba(96,165,250,${0.5 + progress * 0.4}))`,
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute select-none"
          style={{
            left: "50%",
            top: "46%",
            transform: `translate(${offset}px, calc(-50% + ${arcY}px)) rotate(${rotateRight}deg)`,
            transformOrigin: "left center",
          }}
        >
          <img
            src={rightHand}
            alt="Right hand"
            style={{
              width: handSize,
              maxWidth: "42vw",
              display: "block",
              filter: `drop-shadow(0 0 ${
                14 + progress * 18
              }px rgba(167,139,250,${0.5 + progress * 0.4}))`,
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-20 z-20 flex flex-col items-center gap-1 text-[11px] uppercase tracking-widest text-blue-300/50">
        <span>Scroll down</span>

        <div className="flex h-6 w-4 justify-center rounded-xl border border-blue-300/30 pt-1">
          <div className="h-1.5 w-[2px] animate-bounce rounded-full bg-blue-300/70" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-[-1px] left-0 right-0 z-20 h-72"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,11,26,0) 0%, rgba(5,11,26,0.25) 32%, rgba(5,11,26,0.72) 68%, rgba(5,11,26,1) 100%)",
        }}
      />
    </section>
  );
}

export default ScrollHandsHero;