function JobCard({ job, onApply, onViewDetails, onSave, isSaved }) {
  const tags = [
    job.criteria?.split(",")[0],
    job.benefits?.split(",")[0],
    "IT Job",
  ].filter(Boolean);

  return (
    <div className="group relative overflow-hidden rounded-[1.8rem] border border-blue-300/15 bg-[#07152f]/75 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-[#0b1d3f]/90">
      <div className="absolute bottom-[-70px] right-[-70px] h-48 w-48 rounded-full bg-violet-500/20 blur-[60px]" />
      <div className="absolute left-[-80px] top-[-80px] h-44 w-44 rounded-full bg-blue-500/20 blur-[60px]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-blue-100 shadow-lg shadow-blue-500/10">
            IT Job
          </span>

          <button
            onClick={() => onSave(job.id)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition ${
              isSaved
                ? "border-yellow-300/40 bg-yellow-300/20 text-yellow-200"
                : "border-white/10 bg-white/10 text-blue-100 hover:bg-white/20"
            }`}
            title={isSaved ? "Saved" : "Save"}
          >
            {isSaved ? "★" : "☆"}
          </button>
        </div>

        <h3 className="mt-6 min-h-[64px] text-2xl font-black leading-tight text-white">
          {job.title}
        </h3>

        <p className="mt-3 text-sm text-blue-100/55">
          {job.employer?.email || "Nuk ka të dhëna"}
        </p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <p className="line-clamp-3 text-sm leading-6 text-blue-100/75">
            {job.description || "Nuk ka përshkrim të vendosur."}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-300/10 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-100/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => onViewDetails(job)}
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/20"
          >
            Detaje
          </button>

          <button
            onClick={() => onApply(job.id)}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-black text-white shadow-xl shadow-blue-500/25 transition hover:scale-[1.02]"
          >
            Apliko
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;