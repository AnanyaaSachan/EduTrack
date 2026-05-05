import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-10 py-2.5 flex items-center justify-between">

        {/* Left: Logo + Brand Name — unified brand block */}
        <Link
          to="/"
          className="flex items-center gap-1.5 group bg-white/10 hover:bg-white/20 hover:brightness-110 px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer"
        >
          <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-white/70 shadow-sm flex-shrink-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/029/100/774/original/education-school-logo-element-free-vector.jpg"
              alt="EduTrack Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-extrabold text-white tracking-wide leading-none group-hover:text-yellow-300 transition-colors duration-300">
            EduTrack
          </span>
        </Link>

        {/* Right: Nav Links + Login Button */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white/20 text-white shadow-inner"
                  : "text-white/80 hover:bg-white/15 hover:text-white hover:brightness-125"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white/20 text-white shadow-inner"
                  : "text-white/80 hover:bg-white/15 hover:text-white hover:brightness-125"
              }`
            }
          >
            My Learning
          </NavLink>

          <Link
            to="/login"
            className="text-sm font-bold border-2 border-white/70 text-white px-5 py-1.5 rounded-full hover:bg-white hover:text-blue-800 hover:brightness-105 hover:shadow-lg transition-all duration-300 shadow-md cursor-pointer"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
