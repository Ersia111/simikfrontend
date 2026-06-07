import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAllJobs } from "../services/api";

function Companies() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Gabim gjatë marrjes së kompanive.");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const companies = useMemo(() => {
    const map = new Map();

    jobs.forEach((job) => {
      const email = job.employer?.email;

      if (!email) return;

      if (!map.has(email)) {
        map.set(email, {
          email,
          jobsCount: 0,
          latestJob: job.title,
        });
      }

      const company = map.get(email);
      company.jobsCount += 1;
      company.latestJob = job.title;
    });

    return Array.from(map.values()).filter((company) =>
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#050b1a] px-6 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(96,165,250,0.35),transparent_32%),radial-gradient(circle_at_10%_75%,rgba(37,99,235,0.22),transparent_38%)]" />
        <div className="absolute left-[-180px] top-[-180px] h-[480px] w-[480px] rounded-full bg-blue-500/25 blur-[130px]" />
        <div className="absolute bottom-[-180px] right-[-180px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl pt-20">
          <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            Kompanitë në SiMik
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-6xl">
            Companies
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100/70">
            Shiko punëdhënësit që kanë publikuar mundësi pune në platformë.
          </p>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kërko kompani sipas email-it..."
              className="w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-5 py-4 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
            />

            <p className="mt-4 text-sm text-blue-100/60">
              U gjetën {companies.length} kompani.
            </p>
          </div>

          {loading && (
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 shadow-xl backdrop-blur-xl">
              Duke ngarkuar kompanitë...
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-[2rem] border border-red-300/20 bg-red-500/10 p-6 text-red-100 shadow-xl backdrop-blur-xl">
              {error}
            </div>
          )}

          {!loading && !error && companies.length === 0 && (
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 shadow-xl backdrop-blur-xl">
              Nuk u gjet asnjë kompani.
            </div>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {companies.map((company) => (
              <div
                key={company.email}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-violet-500 text-xl font-black text-white">
                    {company.email.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      {company.email.split("@")[0]}
                    </h3>

                    <p className="text-sm text-blue-100/55">
                      {company.email}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#0c1f44]/60 p-4">
                  <p className="text-sm text-blue-100/60">Latest job</p>
                  <h4 className="mt-2 font-black text-white">
                    {company.latestJob}
                  </h4>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-blue-400/15 px-4 py-2 text-xs font-bold text-blue-100">
                    {company.jobsCount} jobs posted
                  </span>

                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-200">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Companies;