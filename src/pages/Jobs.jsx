import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import JobCard from "../components/JobCard";
import { getAllJobs, applyToJob } from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

    fetchJobs();
  }, []);

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
          <div className="mb-12 max-w-3xl">
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

          {!loading && !error && jobs.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 shadow-xl backdrop-blur-xl">
              Nuk ka ende njoftime aktive.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Jobs;