import { Link } from "react-router-dom";

function HomeCTA() {
  return (
    <section className="bg-[#07152f] px-6 pb-28 text-white">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-blue-500/20 via-white/10 to-blue-900/30 p-10 text-center shadow-2xl shadow-blue-950/50 backdrop-blur-xl md:p-16">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-200">
          Start your bridge
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
          Ndërto lidhjen e duhur mes talentit dhe mundësisë.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-blue-100/70">
          Bashkohu me Si Mik dhe bëje procesin e punësimit në IT më të qartë,
          më të shpejtë dhe më profesional.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="rounded-full bg-white px-8 py-3 font-bold text-[#07152f] shadow-xl shadow-blue-500/30 hover:bg-blue-100"
          >
            Regjistrohu
          </Link>

          <Link
            to="/jobs"
            className="rounded-full border border-white/20 bg-white/10 px-8 py-3 font-bold text-white hover:bg-white/20"
          >
            Shiko Punët
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeCTA;