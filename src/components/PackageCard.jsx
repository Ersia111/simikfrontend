function PackageCard({ pkg, onBuy }) {
  return (
    <div className="group rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14] hover:shadow-[0_0_45px_rgba(59,130,246,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
            Package
          </span>

          <h3 className="mt-4 text-xl font-black text-white">
            {pkg.name}
          </h3>
        </div>

        <span className="rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-100">
          Approval
        </span>
      </div>

      <div className="mt-6 space-y-3 text-sm text-blue-100/70">
        <p>Kohëzgjatja: {pkg.durationDays} ditë</p>
        <p>Postime: {pkg.maxPosts}</p>
      </div>

      <p className="mt-6 text-4xl font-black text-white">
        {pkg.price}€
      </p>

      <p className="mt-3 text-sm leading-6 text-blue-100/60">
        Kërkesa dërgohet te admini dhe aktivizohet vetëm pas aprovimit.
      </p>

      <button
        onClick={() => onBuy(pkg.name)}
        className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100"
      >
        Kërko aktivizim
      </button>
    </div>
  );
}

export default PackageCard;