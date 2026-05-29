import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import EmployeeApplicationCard from "../components/EmployeeApplicationCard";
import {
  getApplicationsByEmployee,
  getEmployeeProfile,
  saveEmployeeProfile,
  uploadCv,
  uploadPortfolio,
} from "../services/api";

function EmployeeDashboard() {
  const email = localStorage.getItem("userEmail");

  const [profileData, setProfileData] = useState({
    employeeEmail: email || "",
    fullName: "",
    phoneNumber: "",
    profession: "",
    skills: "",
    bio: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getApplicationsByEmployee(email);
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingApplications(false);
      }
    }

    async function fetchProfile() {
      try {
        const data = await getEmployeeProfile(email);

        setProfileData({
          employeeEmail: email || "",
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          profession: data.profession || "",
          skills: data.skills || "",
          bio: data.bio || "",
        });
      } catch {
        console.log("Profili nuk ekziston ende.");
      }
    }

    if (email) {
      fetchApplications();
      fetchProfile();
    }
  }, [email]);

  const profileCompletion = [
    profileData.fullName,
    profileData.phoneNumber,
    profileData.profession,
    profileData.skills,
    profileData.bio,
  ].filter(Boolean).length;

  const completionPercentage = Math.round((profileCompletion / 5) * 100);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      await saveEmployeeProfile({
        employeeEmail: email,
        fullName: profileData.fullName,
        phoneNumber: profileData.phoneNumber,
        profession: profileData.profession,
        skills: profileData.skills,
        bio: profileData.bio,
      });

      if (cvFile) {
        await uploadCv(email, cvFile);
      }

      if (portfolioFile) {
        await uploadPortfolio(email, portfolioFile);
      }

      setMessage("Profili, CV dhe portfolio u ruajtën me sukses.");
      setCvFile(null);
      setPortfolioFile(null);
    } catch (err) {
      setError(err.message || "Gabim gjatë ruajtjes së profilit.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#111827] px-6 pb-24 pt-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(148,163,184,0.12),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,0.10),transparent_35%)]" />
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-slate-500/10 blur-[140px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[540px] w-[540px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            Employee Panel
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight">
            Employee Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-blue-100/70">
            Mirësevini, {email}. Këtu mund të ndërtoni profilin tuaj profesional,
            të ngarkoni CV/portfolio dhe të ndiqni aplikimet tuaja.
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

          <div className="mt-10 rounded-[2rem] border border-blue-300/10 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-black">
              Mirësevjen në profilin tënd profesional
            </h2>

            <p className="mt-3 max-w-2xl text-blue-100/70">
              Plotëso profilin, ngarko CV dhe portfolio dhe rrit mundësitë për
              t'u kontaktuar nga punëdhënësit.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-blue-100/60">Total Applications</p>
              <h3 className="mt-3 text-4xl font-black">
                {applications.length}
              </h3>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-blue-100/60">Profile Completion</p>
              <h3 className="mt-3 text-4xl font-black">
                {completionPercentage}%
              </h3>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-blue-100/60">Documents</p>
              <h3 className="mt-3 text-4xl font-black">
                {cvFile || portfolioFile ? "✓" : "-"}
              </h3>
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
            <h2 className="text-3xl font-black">Profili im</h2>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm text-blue-100/70">
                <span>Plotësimi i profilit</span>
                <span>{completionPercentage}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-blue-400 transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <p className="mt-6 text-blue-100/70">
              Plotësoni profilin dhe ngarkoni dokumentet tuaja për t’u prezantuar
              më mirë te punëdhënësit.
            </p>

            <form
              onSubmit={handleSaveProfile}
              className="mt-8 grid gap-5 md:grid-cols-2"
            >
              <input
                name="fullName"
                value={profileData.fullName}
                onChange={handleProfileChange}
                placeholder="Emri i plotë"
                className="rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
                required
              />

              <input
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleProfileChange}
                placeholder="Numri i telefonit"
                className="rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
                required
              />

              <input
                name="profession"
                value={profileData.profession}
                onChange={handleProfileChange}
                placeholder="Profesioni"
                className="rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
                required
              />

              <input
                name="skills"
                value={profileData.skills}
                onChange={handleProfileChange}
                placeholder="Skills, p.sh. Java, Spring Boot"
                className="rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
                required
              />

              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                placeholder="Përshkrim i shkurtër për veten"
                className="min-h-[130px] rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300 md:col-span-2"
                required
              />

              <div className="rounded-2xl border border-white/10 bg-[#0c1f44]/70 p-4">
                <p className="mb-3 text-sm font-bold text-blue-100">
                  Ngarko CV
                </p>
                <input
                  type="file"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  className="w-full text-sm text-blue-100 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:font-bold file:text-[#07152f]"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1f44]/70 p-4">
                <p className="mb-3 text-sm font-bold text-blue-100">
                  Ngarko Portfolio
                </p>
                <input
                  type="file"
                  onChange={(e) => setPortfolioFile(e.target.files[0])}
                  className="w-full text-sm text-blue-100 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:font-bold file:text-[#07152f]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-white px-5 py-3 font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100 disabled:opacity-60 md:col-span-2"
              >
                {saving ? "Duke ruajtur..." : "Ruaj profilin & dokumentet"}
              </button>
            </form>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-black">Aplikimet e mia</h2>

            {loadingApplications && (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                Duke ngarkuar aplikimet...
              </div>
            )}

            {!loadingApplications && applications.length === 0 && (
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-blue-100 backdrop-blur-xl">
                Nuk keni aplikuar ende.
              </div>
            )}

            {!loadingApplications && applications.length > 0 && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {applications.map((app) => (
                  <EmployeeApplicationCard key={app.id} application={app} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default EmployeeDashboard;