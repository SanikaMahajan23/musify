import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/api";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `
    w-full text-center py-4 rounded-2xl text-lg font-semibold
    transition-all duration-300 ease-out
    ${
      isActive
        ? `
          bg-gradient-to-r from-green-400 to-emerald-500
          text-black
          shadow-[0_0_25px_rgba(34,197,94,0.8)]
          scale-105
          animate-pulse
        `
        : `
          bg-white/10 text-gray-200
          hover:bg-white/20
          hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]
          hover:scale-105
        `
    }
  `;

  return (
    <aside
      className="
        w-72 min-h-screen
        bg-gradient-to-b from-[#0f2027] via-[#121212] to-black
        text-white
        flex flex-col
        items-center
        px-6
        py-8
      "
    >
      {/* MUSIFY TITLE */}
      <div className="text-center mb-16">
        <h1
          className="
            text-4xl font-extrabold tracking-widest
            bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400
            text-transparent bg-clip-text
          "
        >
                        <h1>🎶MUSIFY🎶 </h1>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          <h2>Music • Podcasts • Vibes</h2>
        </p>
      </div>

      {/* NAV BUTTONS */}
      <nav className="flex flex-col gap-6 w-full items-center">
        <NavLink to="/home" className={navClass}>
          🏠 Home
        </NavLink>

        <NavLink to="/playlists" className={navClass}>
          🎶 Playlists
        </NavLink>

        <NavLink to="/podcasts" className={navClass}>
          🎙️ Podcasts
        </NavLink>

        <NavLink to="/liked" className={navClass}>
          ❤️ Liked Songs
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto w-full pt-10">
        <button
          onClick={logout}
          className="
            w-full py-4 rounded-2xl font-semibold
            text-red-400
            bg-red-500/10
            hover:bg-red-500 hover:text-white
            transition-all duration-300
            hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]
            hover:scale-105
          "
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
