import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/api";
import { PlayerContext } from "../context/PlayerContext";
import { Trash2, Play } from "lucide-react";

export default function PlaylistDetails() {
  const { id } = useParams();
  const { playTrack } = useContext(PlayerContext);

  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    setLoading(true);

    const { data: playlistData } = await supabase
      .from("playlists")
      .select("*")
      .eq("id", id)
      .single();

    const { data: songsData } = await supabase
      .from("playlist_songs")
      .select("*")
      .eq("playlist_id", id);

    setPlaylist(playlistData);
    setSongs(songsData || []);
    setLoading(false);
  };

  const removeSong = async (songId) => {
    await supabase
      .from("playlist_songs")
      .delete()
      .eq("id", songId);

    fetchPlaylist();
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white p-8">
      {/* Playlist Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-36 h-36 bg-gray-700 rounded-xl flex items-center justify-center text-4xl">
          🎵
        </div>

        <div>
          <p className="text-gray-400 text-sm">PLAYLIST</p>
          <h1 className="text-4xl font-bold">{playlist?.name}</h1>
          <p className="text-gray-400 mt-1">
            {songs.length} songs
          </p>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-3">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-6">{index + 1}</span>

              <img
                src={song.cover_url}
                className="w-12 h-12 rounded"
                alt=""
              />

              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => playTrack(song)}
                className="text-green-400 hover:text-green-300"
              >
                <Play size={18} />
              </button>

              <button
                onClick={() => removeSong(song.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {songs.length === 0 && (
        <p className="text-gray-400 mt-6">No songs in this playlist</p>
      )}
    </div>
  );
}
