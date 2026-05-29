function JobCard({ job, onApply, onViewDetails, onSave, isSaved }) {
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

        <button
          onClick={() => onSave(job.id)}
          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
            isSaved
              ? "bg-yellow-400 text-[#07152f]"
              : "border border-white/10 bg-white/10 text-blue-100"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0c1f44]/60 p-4">
        <p className="line-clamp-4 text-sm leading-6 text-blue-100/70">
          {job.description}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => onViewDetails(job)}
          className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/20"
        >
          Detaje
        </button>

        <button
          onClick={() => onApply(job.id)}
          className="rounded-full bg-white px-4 py-3 text-sm font-black text-[#07152f] shadow-xl shadow-blue-500/20 hover:bg-blue-100"
        >
          Apliko
        </button>
      </div>
    </div>
  );
}

export default JobCard;