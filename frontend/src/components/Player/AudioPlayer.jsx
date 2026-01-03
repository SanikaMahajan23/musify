import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import ProgressBar from "./ProgressBar";

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    nextTrack,
    prevTrack,
    progress,
    seekTrack,
    volume,
    setVolume,
  } = useContext(PlayerContext);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 
      bg-gradient-to-r from-[#0f172a] via-[#020617] to-[#0f172a]
      backdrop-blur-xl border-t border-white/10 px-4 py-3">

      <div className="flex flex-col md:flex-row items-center gap-4">

        {/* 🎵 TRACK INFO */}
        <div className="md:w-1/4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold">
            🎧
          </div>

          <div className="overflow-hidden">
            <p className="font-semibold truncate text-white">
              {currentTrack.title}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {currentTrack.artist || "Podcast"}
            </p>
          </div>
        </div>

        {/* ▶️ PLAYER CONTROLS */}
        <div className="md:w-2/4 flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-6">
            <button
              onClick={prevTrack}
              className="text-gray-400 hover:text-white transition text-xl"
            >
              ⏮
            </button>

            <button
              onClick={() =>
                isPlaying ? pauseTrack() : playTrack(currentTrack)
              }
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400
                text-black text-2xl shadow-lg shadow-green-500/40
                hover:scale-105 transition"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition text-xl"
            >
              ⏭
            </button>
          </div>

          {/* ⏳ PROGRESS */}
          <div className="w-full">
            <ProgressBar progress={progress} onChange={seekTrack} />
          </div>
        </div>

        {/* 🔊 VOLUME */}
        <div className="md:w-1/4 flex items-center gap-3 w-full md:w-auto">
          <span className="text-gray-400">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full accent-green-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
