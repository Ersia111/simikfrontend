import { Link } from "react-router-dom";

function Navbar() {
  const userEmail = localStorage.getItem("userEmail");

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050b1a]/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        <Link
          to="/"
          className="text-3xl font-black tracking-tight text-white"
        >
          Si<span className="text-blue-400">Mik</span>
        </Link>

        <nav className="flex items-center gap-10 text-sm font-semibold text-blue-100">
          <Link
            to="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="transition hover:text-white"
          >
            Jobs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
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
            <button
              onClick={handleLogout}
              className="rounded-full bg-white px-5 py-2 text-sm font-black text-[#07152f] shadow-xl shadow-blue-500/20 transition hover:bg-blue-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;