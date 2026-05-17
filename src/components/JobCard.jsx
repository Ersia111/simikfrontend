function JobCard({ job, onApply }) {
  return (
    <div className="group rounded-[1.7rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-blue-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14]">
      
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex rounded-full bg-blue-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-200">
            IT Job
          </span>

          <h3 className="mt-3 text-xl font-black text-white">
            {job.title}
          </h3>

          <p className="mt-2 text-xs text-blue-100/55">
            {job.employer?.email || "Nuk ka të dhëna"}
          </p>
        </div>

        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-200">
          Aktiv
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0c1f44]/60 p-4">
        <p className="text-sm leading-6 text-blue-100/70 line-clamp-4">
          {job.description}
        </p>
      </div>

      <button
        onClick={() => onApply(job.id)}
        className="mt-5 w-full rounded-full bg-white px-5 py-3 text-sm font-black text-[#07152f] shadow-xl shadow-blue-500/20 hover:bg-blue-100"
      >
        Apliko
      </button>
    </div>
  );
}

export default JobCard;