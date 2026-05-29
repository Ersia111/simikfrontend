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
  const [showSavedOnly, setShowSavedOnly] = useState(false);

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

      const matchesSaved =
        !showSavedOnly || savedJobs.includes(job.id);

      return matchesSearch && matchesCategory && matchesSaved;
    });
  }, [jobs, searchTerm, category, showSavedOnly, savedJobs]);

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
      <section className="relative min-h-screen overflow-hidden bg-[#050b1a] px-6 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(96,165,250,0.35),transparent_32%),radial-gradient(circle_at_10%_75%,rgba(37,99,235,0.22),transparent_38%)]" />
        <div className="absolute left-[-180px] top-[-180px] h-[480px] w-[480px] rounded-full bg-blue-500/25 blur-[130px]" />
        <div className="absolute bottom-[-180px] right-[-180px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
              Mundësi pune në teknologji
            </span>

            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-6xl">
              Njoftimet e Punës
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100/70">
              Eksploro mundësitë më të fundit në Programim, IT, Marketing
              Digjital, Content Creation dhe Graphic Design.
            </p>
          </div>

          <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_auto]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kërko sipas titullit, skills, kompanisë..."
                className="w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-5 py-4 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-5 py-4 text-white outline-none focus:border-blue-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0c1f44]">
                    {cat === "ALL" ? "Të gjitha kategoritë" : cat}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowSavedOnly((prev) => !prev)}
                className={`rounded-2xl px-5 py-4 text-sm font-bold ${
                  showSavedOnly
                    ? "bg-white text-[#07152f]"
                    : "border border-white/10 bg-[#0c1f44]/70 text-white"
                }`}
              >
                Saved
              </button>
            </div>

            <p className="mt-4 text-sm text-blue-100/60">
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
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0c1f44] p-8 text-white shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-200">
                    Job Details
                  </span>

                  <h2 className="mt-4 text-3xl font-black">
                    {selectedJob.title}
                  </h2>

                  <p className="mt-2 text-sm text-blue-100/60">
                    Punëdhënësi: {selectedJob.employer?.email || "Nuk ka të dhëna"}
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
                    {selectedJob.benefits || "Nuk ka përfitime të specifikuara."}
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