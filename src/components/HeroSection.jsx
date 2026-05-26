import { Link } from "react-router-dom";
import bridge from "../assets/bridge.png";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#050b1a] px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(96,165,250,0.38),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(37,99,235,0.25),transparent_38%)]" />
      <div className="absolute left-[-200px] top-[-200px] h-[520px] w-[520px] rounded-full bg-blue-500/30 blur-[140px]" />
      <div className="absolute bottom-[-220px] right-[-180px] h-[540px] w-[540px] rounded-full bg-indigo-500/30 blur-[150px]" />

      <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            Platformë për karriera në IT
          </span>

          <h1 className="mt-7 text-6xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Connect. <br />
            Build. <br />
            Thrive.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100/75">
            Si Mik ndërton urën mes talenteve digjitale dhe kompanive që
            kërkojnë njerëzit e duhur për ekipet e tyre.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/jobs"
              className="rounded-full bg-white px-7 py-3 font-bold text-[#07152f] shadow-xl shadow-blue-500/30 hover:bg-blue-100"
            >
              Explore jobs
            </Link>

            <Link
              to="/register"
              className="rounded-full border border-white/20 bg-white/10 px-7 py-3 font-bold text-white backdrop-blur hover:bg-white/20"
            >
              Post a job
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative h-[520px] w-full max-w-[620px] rounded-[42px] border border-white/10 bg-white/5 p-10 shadow-[0_45px_130px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="absolute right-10 top-10 z-20 rounded-full border border-white/10 bg-white/15 px-5 py-2 text-sm font-bold text-white shadow-xl backdrop-blur-md">
              Career Bridge
            </div>

            <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[90px]" />

            <img
              src={bridge}
              alt="Career bridge"
              className="absolute left-1/2 top-20 z-10 w-[560px] -translate-x-1/2 select-none drop-shadow-[0_45px_75px_rgba(59,130,246,0.35)]"
            />

            <div className="absolute left-12 bottom-10 z-20 w-48 rounded-3xl border border-white/10 bg-[#0c1f44]/85 p-6 shadow-xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Employee
              </p>
              <h3 className="mt-2 text-xl font-black">Build profile</h3>
              <p className="mt-2 text-sm text-blue-100/70">CV + Portfolio</p>
            </div>

            <div className="absolute right-12 bottom-10 z-20 w-48 rounded-3xl border border-white/10 bg-[#0c1f44]/85 p-6 shadow-xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Employer
              </p>
              <h3 className="mt-2 text-xl font-black">Find talent</h3>
              <p className="mt-2 text-sm text-blue-100/70">Post IT jobs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;