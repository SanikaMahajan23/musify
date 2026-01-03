import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { PlayerContext } from "../context/PlayerContext";

export default function LikedSongs() {
  const { user } = useContext(AuthContext);

  const {
    likedSongs,
    fetchLikedSongs,
    playTrack,
    toggleLike,
  } = useContext(PlayerContext);

  useEffect(() => {
    if (user) fetchLikedSongs(user.id);
  }, [user]);

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-black via-purple-900 to-black text-white">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-green-400">
          ❤️ Liked Songs
        </h1>
        <p className="text-gray-400">
          All your favorite tracks in one place
        </p>
      </div>

      {/* EMPTY STATE */}
      {likedSongs.length === 0 && (
        <p className="text-gray-400 text-lg">
          You haven’t liked any songs yet 😢
        </p>
      )}

      {/* SONG LIST */}
      <div className="space-y-4">
        {likedSongs.map((song) => (
          <div
            key={song.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-5 flex justify-between items-center hover:bg-white/20 transition"
          >
            <div>
              <p className="text-lg font-semibold">
                {song.title}
              </p>
              <p className="text-sm text-gray-400">
                {song.artist}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={() =>
                  playTrack({
                    id: song.song_id,
                    title: song.title,
                    artist: song.artist,
                    audio_url: song.audio_url,
                  })
                }
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-full"
              >
                ▶ Play
              </button>

              <button
                onClick={() =>
                  toggleLike({
                    id: song.song_id,
                    title: song.title,
                    artist: song.artist,
                    audio_url: song.audio_url,
                  })
                }
                className="text-2xl"
                title="Remove from liked"
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
