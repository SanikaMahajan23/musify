import { useEffect, useState } from "react";
import { supabase } from "../services/api";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack } = useContext(PlayerContext);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Podcast fetch error:", error.message);
      } else {
        setPodcasts(data || []);
      }
      setLoading(false);
    };

    fetchPodcasts();
  }, []);

  if (loading) return <p className="text-white">Loading podcasts...</p>;

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white">
      <h1 className="text-3xl font-bold text-green-400 mb-8">
        Podcasts 🎙️
      </h1>

      {podcasts.length === 0 && (
        <p className="text-gray-400">No podcasts uploaded yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl hover:scale-105 transition shadow-lg"
          >
            {podcast.cover_url && (
              <img
                src={podcast.cover_url}
                alt={podcast.title}
                className="rounded-xl mb-4"
              />
            )}

            <h2 className="text-lg font-bold">{podcast.title}</h2>
            <p className="text-sm text-gray-400 mb-4">
              {podcast.description}
            </p>

            <button
              onClick={() => playTrack(podcast)}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full"
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
