function EmployerJobCard({ job, onViewApplications }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
            My Job Post
          </span>

          <h3 className="mt-4 text-2xl font-black text-white">
            {job.title}
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100/70">
            {job.description}
          </p>
        </div>

        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
          Aktiv
        </span>
      </div>

      <button
        onClick={() => onViewApplications(job.id)}
        className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100"
      >
        Shiko aplikantët
      </button>
    </div>
  );
}

export default EmployerJobCard;