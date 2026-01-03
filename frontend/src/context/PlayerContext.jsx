import { createContext, useRef, useState, useEffect, useContext } from "react";
import { supabase } from "../services/api";
import { AuthContext } from "./AuthContext";

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const { user } = useContext(AuthContext);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem("recentlyPlayed");
    return saved ? JSON.parse(saved) : [];
  });

  const [likedSongs, setLikedSongs] = useState([]);

  /* ▶ PLAY TRACK */
  const playTrack = (track) => {
    if (currentTrack?.audio_url !== track.audio_url) {
      audioRef.current.src = track.audio_url;
      setCurrentTrack(track);
      setProgress(0);

      setRecentlyPlayed((prev) => {
        const filtered = prev.filter((t) => t.id !== track.id);
        const updated = [track, ...filtered].slice(0, 10);
        localStorage.setItem("recentlyPlayed", JSON.stringify(updated));
        return updated;
      });
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seekTrack = (value) => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime =
        (value / 100) * audioRef.current.duration;
      setProgress(value);
    }
  };

  /* ❤️ LIKE / UNLIKE SONG */
  const toggleLike = async (track) => {
    if (!user) return alert("Please login");

    const alreadyLiked = likedSongs.some(
      (s) => s.song_id === track.id
    );

    if (alreadyLiked) {
      await supabase
        .from("liked_songs")
        .delete()
        .eq("song_id", track.id)
        .eq("user_id", user.id);
    } else {
      await supabase.from("liked_songs").insert([
        {
          user_id: user.id,
          song_id: track.id,
        },
      ]);
    }

    fetchLikedSongs(user.id);
  };

  /* 📥 FETCH LIKED SONGS */
  const fetchLikedSongs = async (userId) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("liked_songs")
      .select("song_id")
      .eq("user_id", userId);

    if (!error) setLikedSongs(data || []);
  };

  /* ➕ ADD TO PLAYLIST */
  const addTrackToPlaylist = async (playlistId, track) => {
    if (!user) return alert("Please login");

    // Prevent duplicates
    const { data: exists } = await supabase
      .from("playlist_songs")
      .select("id")
      .eq("playlist_id", playlistId)
      .eq("song_id", track.id)
      .eq("user_id", user.id)
      .single();

    if (exists) {
      alert("Already in playlist");
      return;
    }

    const { error } = await supabase.from("playlist_songs").insert([
      {
        playlist_id: playlistId,
        song_id: track.id,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Failed to add to playlist");
    } else {
      alert("Added to playlist ✅");
    }
  };

  /* 🎧 AUDIO PROGRESS */
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  /* 🔁 LOAD LIKES ON LOGIN */
  useEffect(() => {
    if (user) fetchLikedSongs(user.id);
  }, [user]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentTrack,
        isPlaying,
        progress,
        recentlyPlayed,
        likedSongs,
        playTrack,
        pauseTrack,
        seekTrack,
        addTrackToPlaylist,
        toggleLike,
        fetchLikedSongs,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
