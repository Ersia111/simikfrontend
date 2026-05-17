function EmployeeApplicationCard({ application }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
            Application
          </span>

          <h3 className="mt-4 text-xl font-black text-white">
            {application.jobPost?.title || "Njoftim pune"}
          </h3>

          <p className="mt-2 text-sm text-blue-100/60">
            Punëdhënësi: {application.jobPost?.employer?.email || "Nuk ka të dhëna"}
          </p>
        </div>

        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
          {application.status}
        </span>
      </div>

      <p className="mt-5 text-sm text-blue-100/55">
        Aplikuar më: {application.appliedAt}
      </p>
    </div>
  );
}

export default EmployeeApplicationCard;