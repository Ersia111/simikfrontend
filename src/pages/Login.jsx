import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const result = await loginUser(formData);

      setMessage(result.message);

      localStorage.setItem("userRole", result.role);
      localStorage.setItem("userEmail", formData.email);

      if (result.role === "PUNONJES") {
        navigate("/employee-dashboard");
      } else if (result.role === "PUNEDHENES") {
        navigate("/employer-dashboard");
      } else if (result.role === "ADMIN") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#050b1a] px-6 pb-20 pt-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(96,165,250,0.35),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(37,99,235,0.22),transparent_38%)]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
              Welcome back
            </span>

            <h1 className="mt-7 text-5xl font-black leading-tight md:text-6xl">
              Hyr në urën tënde profesionale.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-blue-100/70">
              Vazhdo aty ku e le: menaxho profilin, apliko për punë ose publiko
              mundësi të reja për talentet në IT.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
            <h2 className="text-3xl font-black">Login</h2>
            <p className="mt-3 text-blue-100/70">
              Hyni në llogarinë tuaj për të vazhduar.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-blue-100">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Shkruani email"
                  className="w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-blue-100">
                  Fjalëkalimi
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Shkruani fjalëkalimin"
                  className="w-full rounded-2xl border border-white/10 bg-[#0c1f44]/70 px-4 py-3 text-white outline-none placeholder:text-blue-100/40 focus:border-blue-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-white px-5 py-3 font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100 disabled:opacity-60"
              >
                {loading ? "Duke hyrë..." : "Hyr"}
              </button>
            </form>

            {message && (
              <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                {message}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <p className="mt-6 text-center text-sm text-blue-100/70">
              Nuk keni llogari?{" "}
              <Link to="/register" className="font-bold text-white">
                Regjistrohu
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Login;