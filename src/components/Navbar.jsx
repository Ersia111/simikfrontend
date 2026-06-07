import { Link } from "react-router-dom";

function Navbar() {
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  function getProfilePath() {
    if (userRole === "PUNONJES") return "/employee-dashboard";
    if (userRole === "PUNEDHENES") return "/employer-dashboard";
    if (userRole === "ADMIN") return "/admin-dashboard";
    return "/";
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050b1a]/70 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-5">
        <Link to="/" className="text-3xl font-black tracking-tight text-white">
          Si<span className="text-blue-400">Mik</span>
        </Link>

        <nav className="flex justify-center gap-10 text-sm font-semibold text-blue-100">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <Link to="/jobs" className="transition hover:text-white">Jobs</Link>
          <Link to="/companies" className="transition hover:text-white">Companies</Link>

          {userEmail && (
            <Link to={getProfilePath()} className="transition hover:text-white">
              My Profile
            </Link>
          )}
        </nav>

        <div className="flex items-center justify-end gap-4">
          {!userEmail ? (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-white px-5 py-2 text-sm font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-sm text-blue-100/70 md:block">
                {userEmail}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full bg-white px-5 py-2 text-sm font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;