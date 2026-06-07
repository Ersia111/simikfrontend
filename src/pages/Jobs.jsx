import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import JobCard from "../components/JobCard";
import { getAllJobs, applyToJob } from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);

    fetchJobs();
  }, []);

  const categories = [
    "ALL",
    "Programming",
    "IT",
    "Marketing",
    "Content Creation",
    "Graphic Design",
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `
        ${job.title || ""}
        ${job.description || ""}
        ${job.criteria || ""}
        ${job.benefits || ""}
        ${job.employer?.email || ""}
      `.toLowerCase();

      const matchesSearch = text.includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "ALL" || text.includes(category.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchTerm, category]);

  function handleSaveJob(jobId) {
    let updatedSavedJobs;

    if (savedJobs.includes(jobId)) {
      updatedSavedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      updatedSavedJobs = [...savedJobs, jobId];
    }

    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  }

  async function handleApply(jobId) {
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole");

    if (!email) {
      alert("Duhet të bëni login për të aplikuar.");
      return;
    }

    if (role !== "PUNONJES") {
      alert("Vetëm punonjësit mund të aplikojnë.");
      return;
    }

    try {
      const result = await applyToJob({
        employeeEmail: email,
        jobPostId: jobId,
      });

      alert(result);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#020617] px-6 pb-24 pt-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(147,51,234,0.26),transparent_28%),radial-gradient(circle_at_70%_25%,rgba(59,130,246,0.24),transparent_35%),radial-gradient(circle_at_15%_75%,rgba(37,99,235,0.18),transparent_38%)]" />
        <div className="absolute inset-0 jobs-stars opacity-70" />
        <div className="absolute right-[-140px] top-[80px] h-[620px] w-[780px] rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="absolute left-[-180px] top-[260px] h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-b-[3rem] border-b border-white/10 pb-10 pt-10">
            <div className="absolute right-[-80px] top-[-40px] hidden h-[520px] w-[760px] lg:block">
              <div className="cosmic-orb relative h-full w-full" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-bold text-blue-100 backdrop-blur-xl">
                ✦ E ardhmja fillon këtu
              </span>

              <h1 className="mt-7 text-6xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Njoftimet <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  e Punës
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100/75">
                Zbulo mundësitë më të fundit në Programim, IT, Marketing
                Digjital, Content Creation dhe Graphic Design.
              </p>
            </div>
          </div>

          <div className="mb-8 mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl">
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_auto]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kërko sipas titullit, skills, kompanisë..."
                className="w-full rounded-2xl border border-blue-300/20 bg-[#07152f]/70 px-5 py-4 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-blue-300/20 bg-[#07152f]/70 px-5 py-4 text-white outline-none focus:border-blue-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#07152f]">
                    {cat === "ALL" ? "Të gjitha kategoritë" : cat}
                  </option>
                ))}
              </select>

              <button className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/25">
                Search
              </button>
            </div>

            <p className="mt-5 text-sm text-blue-100/70">
              U gjetën {filteredJobs.length} nga {jobs.length} njoftime.
            </p>
          </div>

          {loading && (
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 shadow-xl backdrop-blur-xl">
              Duke ngarkuar njoftimet...
            </div>
          )}

          {error && (
            <div className="rounded-[2rem] border border-red-300/20 bg-red-500/10 p-6 text-red-100 shadow-xl backdrop-blur-xl">
              {error}
            </div>
          )}

          {!loading && !error && filteredJobs.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 shadow-xl backdrop-blur-xl">
              Nuk u gjet asnjë njoftim me këto kritere.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onViewDetails={setSelectedJob}
                onSave={handleSaveJob}
                isSaved={savedJobs.includes(job.id)}
              />
            ))}
          </div>
        </div>

        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#07152f] p-8 text-white shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
                    Job Details
                  </span>

                  <h2 className="mt-4 text-3xl font-black">
                    {selectedJob.title}
                  </h2>

                  <p className="mt-2 text-sm text-blue-100/60">
                    Punëdhënësi:{" "}
                    {selectedJob.employer?.email || "Nuk ka të dhëna"}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
                >
                  Mbyll
                </button>
              </div>

              <div className="mt-8 space-y-6 text-blue-100/75">
                <div>
                  <h3 className="font-bold text-white">Përshkrimi</h3>
                  <p className="mt-2 leading-7">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="font-bold text-white">Kriteret</h3>
                  <p className="mt-2 leading-7">
                    {selectedJob.criteria || "Nuk ka kritere të specifikuara."}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-white">Përfitimet</h3>
                  <p className="mt-2 leading-7">
                    {selectedJob.benefits ||
                      "Nuk ka përfitime të specifikuara."}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleApply(selectedJob.id)}
                className="mt-8 w-full rounded-full bg-white px-5 py-3 font-black text-[#07152f] hover:bg-blue-100"
              >
                Apliko për këtë punë
              </button>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default Jobs;