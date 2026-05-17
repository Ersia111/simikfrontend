import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getPendingSubscriptions,
  approveSubscription,
  rejectSubscription,
} from "../services/api";

function AdminDashboard() {
  const email = localStorage.getItem("userEmail");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadRequests() {
    try {
      setLoading(true);
      setError("");
      const data = await getPendingSubscriptions();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function handleApprove(id) {
    setMessage("");
    setError("");
    setActionLoadingId(id);

    try {
      const result = await approveSubscription(id);
      setMessage(result);
      await loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleReject(id) {
    setMessage("");
    setError("");
    setActionLoadingId(id);

    try {
      const result = await rejectSubscription(id);
      setMessage(result);
      await loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoadingId(null);
    }
  }

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#111827] px-6 pb-24 pt-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(148,163,184,0.12),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,0.10),transparent_35%)]" />
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[540px] w-[540px] rounded-full bg-indigo-500/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            Admin Panel
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight">
            Admin Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-blue-100/70">
            Mirësevini, {email}. Këtu menaxhoni kërkesat e paketave dhe aprovoni
            aksesin e punëdhënësve për të postuar njoftime.
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

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
              <p className="text-sm font-bold text-blue-100/60">
                Pending Requests
              </p>
              <h3 className="mt-3 text-4xl font-black">{requests.length}</h3>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
              <p className="text-sm font-bold text-blue-100/60">
                Admin Account
              </p>
              <h3 className="mt-3 break-all text-xl font-black">{email}</h3>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
              <p className="text-sm font-bold text-blue-100/60">
                Package Control
              </p>
              <h3 className="mt-3 text-2xl font-black">Approval System</h3>
            </div>
          </div>

          <div className="mt-14">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black">Kërkesat për paketa</h2>
                <p className="mt-3 text-blue-100/70">
                  Aprovo ose refuzo kërkesat e punëdhënësve për aktivizimin e paketave.
                </p>
              </div>

              <button
                onClick={loadRequests}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20"
              >
                Rifresko
              </button>
            </div>

            {loading ? (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                Duke ngarkuar kërkesat...
              </div>
            ) : requests.length === 0 ? (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-8 text-blue-100 backdrop-blur-xl">
                Nuk ka kërkesa pending për momentin.
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                          Package Request
                        </p>

                        <h3 className="mt-3 text-xl font-black">
                          {request.subscriptionPackage?.name}
                        </h3>
                      </div>

                      <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-xs font-bold text-yellow-200">
                        {request.status}
                      </span>
                    </div>

                    <div className="mt-5 space-y-2 text-sm text-blue-100/70">
                      <p>Punëdhënësi: {request.employer?.email}</p>
                      <p>Çmimi: {request.subscriptionPackage?.price}€</p>
                      <p>Postime: {request.subscriptionPackage?.maxPosts}</p>
                      <p>Kohëzgjatja: {request.subscriptionPackage?.durationDays} ditë</p>
                      <p>Kërkuar më: {request.createdAt || "N/A"}</p>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={actionLoadingId === request.id}
                        className="flex-1 rounded-full bg-emerald-400 px-4 py-3 text-sm font-black text-[#052e2b] transition hover:bg-emerald-300 disabled:opacity-50"
                      >
                        {actionLoadingId === request.id ? "..." : "Approve"}
                      </button>

                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={actionLoadingId === request.id}
                        className="flex-1 rounded-full bg-red-400 px-4 py-3 text-sm font-black text-white transition hover:bg-red-300 disabled:opacity-50"
                      >
                        {actionLoadingId === request.id ? "..." : "Reject"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default AdminDashboard;