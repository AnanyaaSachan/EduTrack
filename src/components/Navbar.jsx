import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2">
          ✅ Logged out successfully
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between">

        {/* Left: Logo + Brand Name */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-1.5 group bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all duration-300"
        >
          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full overflow-hidden ring-2 ring-white/70 shadow-sm flex-shrink-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/029/100/774/original/education-school-logo-element-free-vector.jpg"
              alt="EduTrack Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-base sm:text-lg font-extrabold text-white tracking-wide leading-none group-hover:text-yellow-300 transition-colors duration-300">
            EduTrack
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/15 hover:text-white"
                }`
              }
            >
              My Learning
            </NavLink>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                <div className="w-7 h-7 rounded-full bg-yellow-300 flex items-center justify-center text-blue-900 font-extrabold text-sm flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm font-semibold">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-bold border-2 border-white/70 text-white px-4 py-1.5 rounded-full hover:bg-white hover:text-blue-800 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-bold border-2 border-white/70 text-white px-5 py-1.5 rounded-full hover:bg-white hover:text-blue-800 transition-all duration-300 shadow-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 flex flex-col gap-2">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/15 hover:text-white"
                }`
              }
            >
              My Learning
            </NavLink>
          )}

          {user ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-7 h-7 rounded-full bg-yellow-300 flex items-center justify-center text-blue-900 font-extrabold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm font-semibold">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-sm font-bold border-2 border-white/70 text-white px-4 py-2.5 rounded-xl hover:bg-white hover:text-blue-800 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full text-center text-sm font-bold border-2 border-white/70 text-white px-4 py-2.5 rounded-xl hover:bg-white hover:text-blue-800 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      )}

    </nav>
  );
}

export default Navbar;
