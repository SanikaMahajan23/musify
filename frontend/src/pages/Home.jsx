import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PlayerContext } from "../context/PlayerContext";
import { supabase } from "../services/api";
import { useNavigate } from "react-router-dom";

const PLAYLIST_ID = "favorites";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const {
    playTrack,
    addTrackToPlaylist,
    toggleLike,
    likedSongs,
    fetchLikedSongs,
  } = useContext(PlayerContext);

  const [songs, setSongs] = useState([]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

 useEffect(() => {
  const fetchSongs = async () => {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false }); // 🔥 newest first

    if (error) {
      console.error("Error fetching songs:", error);
      return;
    }

    console.log("Fetched songs:", data); // 🔍 DEBUG
    setSongs(data || []);
  };

  fetchSongs();
}, []);



  useEffect(() => {
    if (user) fetchLikedSongs(user.id);
  }, [user]);

  return (
    <div className="min-h-screen text-white bg-black">

      {/* 🎵 HERO SECTION */}
      <div
        className="relative h-[460px] flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511379938547-c1f69419868d)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 max-w-4xl fade-in">
          <h1 className="text-6xl font-extrabold text-green-500 mb-4 animate-pulse">
            🎵 MUSIFY
          </h1>

          
          <h3 className="text-lg text-gray-400 mb-10">
            Play millions of songs and podcasts for free.  
            Discover new favorites, anytime, anywhere.
          </h3>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                🎧 Play your favorites
              </h3>
              <p className="text-gray-400 text-sm">
                Listen to the songs you love and discover new music every day.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                📀 Playlists made easy
              </h3>
              <p className="text-gray-400 text-sm">
                Create playlists or enjoy curated mixes by music experts.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                ❤️ Made for you
              </h3>
              <p className="text-gray-400 text-sm">
                Tell us what you like and get personalized recommendations.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-xl">
             
            </div>
          </div>
        </div>
      </div>

      {/* 🎧 POPULAR TRACKS */}
      <div className="px-8 py-10 bg-gradient-to-b from-black to-[#0f172a]">
        <h2 className="text-2xl font-bold mb-6">🔥 Popular Tracks</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {songs.map((track) => {
            const isLiked = likedSongs?.some(
              (song) => song.song_id === track.id
            );

            return (
              <div
                key={track.id}
                className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition group"
              >
                <img
                  src={track.cover_url || "https://picsum.photos/130"}
                  alt={track.title}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />

                <p className="font-semibold truncate">{track.title}</p>
                <p className="text-sm text-gray-400 truncate">
                  {track.artist}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => playTrack(track)}
                    className="bg-green-500 text-black w-10 h-10 rounded-full
                               flex items-center justify-center opacity-0
                               group-hover:opacity-100 transition"
                  >
                    ▶
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => addTrackToPlaylist(PLAYLIST_ID, track)}
                      className="text-xs bg-white/10 px-3 py-1 rounded-full"
                    >
                      + Playlist
                    </button>

                    <button
                      onClick={() => toggleLike(track)}
                      className="text-xl"
                    >
                      {isLiked ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
