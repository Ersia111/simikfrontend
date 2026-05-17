import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PackageCard from "../components/PackageCard";
import EmployerJobCard from "../components/EmployerJobCard";
import ApplicationCard from "../components/ApplicationCard";
import {
  createJob,
  getPackages,
  buyPackage,
  getAllJobs,
  getApplicationsByJob,
  getEmployerSubscriptions,
} from "../services/api";

function EmployerDashboard() {
  const email = localStorage.getItem("userEmail");

  const [packages, setPackages] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    criteria: "",
    benefits: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingJob, setLoadingJob] = useState(false);

  const today = new Date();

  const approvedSubscription = subscriptions.find((sub) => {
    const endDate = new Date(sub.endDate);

    return (
      sub.status === "APPROVED" &&
      sub.active === true &&
      endDate >= today &&
      sub.postsUsed < sub.subscriptionPackage?.maxPosts
    );
  });

  const pendingSubscription = subscriptions.find(
    (sub) => sub.status === "PENDING"
  );

  const hasExpiredApprovedPackage = subscriptions.some((sub) => {
    const endDate = new Date(sub.endDate);

    return (
      sub.status === "APPROVED" &&
      sub.active === true &&
      endDate < today
    );
  });

  const hasReachedPostLimit = subscriptions.some(
    (sub) =>
      sub.status === "APPROVED" &&
      sub.active === true &&
      sub.postsUsed >= sub.subscriptionPackage?.maxPosts
  );

  const canPostJob = Boolean(approvedSubscription);

  async function fetchSubscriptions() {
    if (!email) return;

    try {
      const data = await getEmployerSubscriptions(email);
      setSubscriptions(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchJobs() {
    try {
      const data = await getAllJobs();
      const employerJobs = data.filter((job) => job.employer?.email === email);
      setJobs(employerJobs);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingPackages(false);
      }
    }

    if (email) {
      fetchPackages();
      fetchJobs();
      fetchSubscriptions();

      const interval = setInterval(() => {
        fetchSubscriptions();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [email]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleBuy(packageName) {
    setMessage("");
    setError("");

    try {
      const result = await buyPackage({
        employerEmail: email,
        packageName,
      });

      setMessage(result);
      await fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!canPostJob) {
      setError(
        "Nuk mund të postoni ende. Paketa juaj duhet të aprovohet nga admini."
      );
      return;
    }

    setLoadingJob(true);

    try {
      const result = await createJob({
        employerEmail: email,
        ...formData,
      });

      setMessage(result);

      setFormData({
        title: "",
        description: "",
        criteria: "",
        benefits: "",
      });

      await fetchJobs();
      await fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingJob(false);
    }
  }

  async function handleViewApplications(jobId) {
    setSelectedJobId(jobId);
    setLoadingApplications(true);

    try {
      const data = await getApplicationsByJob(jobId);
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingApplications(false);
    }
  }

  function getStatusStyle(status) {
    if (status === "APPROVED") {
      return "bg-emerald-500/20 text-emerald-200";
    }

    if (status === "PENDING") {
      return "bg-yellow-500/20 text-yellow-200";
    }

    if (status === "EXPIRED") {
      return "bg-orange-500/20 text-orange-200";
    }

    return "bg-red-500/20 text-red-200";
  }

  function getPostingMessage() {
    if (canPostJob) {
      return `Paketa aktive: ${approvedSubscription.subscriptionPackage?.name}. Mund të postoni njoftime.`;
    }

    if (pendingSubscription) {
      return "Kërkesa juaj është në pritje të aprovimit nga admini.";
    }

    if (hasReachedPostLimit) {
      return "Keni arritur limitin e postimeve për paketën tuaj.";
    }

    if (hasExpiredApprovedPackage) {
      return "Paketa juaj ka skaduar. Kërkoni një paketë të re.";
    }

    return "Për të postuar njoftime, duhet fillimisht të kërkoni aktivizimin e një pakete.";
  }

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#111827] px-6 pb-24 pt-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(148,163,184,0.12),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,0.10),transparent_35%)]" />
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[540px] w-[540px] rounded-full bg-indigo-500/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            Employer Panel
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight">
            Employer Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-blue-100/70">
            Mirësevini, {email}. Këtu mund të kërkoni aktivizim pakete, të
            postoni njoftime dhe të shihni aplikantët.
          </p>

          {message && (
            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-2xl border border-red-300/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
              {error}
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-3xl font-black">Zgjidh një paketë</h2>

            <p className="mt-3 text-blue-100/70">
              Për të postuar njoftime, dërgoni kërkesë për aktivizim. Admini
              duhet ta aprovojë paketën.
            </p>

            {loadingPackages ? (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                Duke ngarkuar paketat...
              </div>
            ) : packages.length === 0 ? (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                Nuk u gjet asnjë paketë.
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} onBuy={handleBuy} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-black">Statusi i paketave</h2>

            {subscriptions.length === 0 ? (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                Nuk keni ende asnjë kërkesë ose paketë aktive.
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {subscriptions.map((sub) => {
                  const maxPosts = sub.subscriptionPackage?.maxPosts || 1;
                  const usagePercent = Math.min(
                    (sub.postsUsed / maxPosts) * 100,
                    100
                  );

                  return (
                    <div
                      key={sub.id}
                      className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                            Package status
                          </p>

                          <h3 className="mt-3 text-xl font-black text-white">
                            {sub.subscriptionPackage?.name}
                          </h3>
                        </div>

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusStyle(
                            sub.status
                          )}`}
                        >
                          {sub.status}
                        </span>
                      </div>

                      <div className="mt-5 space-y-2 text-sm text-blue-100/70">
                        <p>Postime: {sub.subscriptionPackage?.maxPosts}</p>
                        <p>Postime të përdorura: {sub.postsUsed}</p>
                        <p>Skadon më: {sub.endDate}</p>
                      </div>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs text-blue-100/60">
                          <span>Posts usage</span>
                          <span>
                            {sub.postsUsed} / {sub.subscriptionPackage?.maxPosts}
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black">Krijo njoftim pune</h2>

                <p className="mt-3 text-blue-100/70">
                  {getPostingMessage()}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                  canPostJob
                    ? "border border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
                    : pendingSubscription
                    ? "border border-yellow-300/20 bg-yellow-400/10 text-yellow-200"
                    : "border border-red-300/20 bg-red-400/10 text-red-200"
                }`}
              >
                {canPostJob
                  ? "Package approved"
                  : pendingSubscription
                  ? "Waiting for approval"
                  : "No approved package"}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titulli i punës"
                className="w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
                required
                disabled={!canPostJob || loadingJob}
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Përshkrimi"
                className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
                required
                disabled={!canPostJob || loadingJob}
              />

              <textarea
                name="criteria"
                value={formData.criteria}
                onChange={handleChange}
                placeholder="Kriteret"
                className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
                required
                disabled={!canPostJob || loadingJob}
              />

              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Përfitimet"
                className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
                required
                disabled={!canPostJob || loadingJob}
              />

              <button
                type="submit"
                disabled={!canPostJob || loadingJob}
                className="rounded-full bg-white px-5 py-3 font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {!canPostJob
                  ? pendingSubscription
                    ? "Në pritje të aprovimit"
                    : "Kërko paketë për të postuar"
                  : loadingJob
                  ? "Duke krijuar..."
                  : "Krijo Njoftim"}
              </button>
            </form>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-black">Njoftimet e mia</h2>

            {jobs.length === 0 ? (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                Nuk keni postuar ende asnjë njoftim.
              </div>
            ) : (
              <div className="mt-6 grid gap-5">
                {jobs.map((job) => (
                  <EmployerJobCard
                    key={job.id}
                    job={job}
                    onViewApplications={handleViewApplications}
                  />
                ))}
              </div>
            )}
          </div>

          {selectedJobId && (
            <div className="mt-16">
              <h2 className="text-3xl font-black">
                Aplikantët për njoftimin #{selectedJobId}
              </h2>

              {loadingApplications ? (
                <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                  Duke ngarkuar aplikimet...
                </div>
              ) : applications.length === 0 ? (
                <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                  Nuk ka ende aplikime për këtë njoftim.
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {applications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default EmployerDashboard;