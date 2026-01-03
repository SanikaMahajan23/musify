import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPlaylist, getPlaylists } from "../services/playlistService";
import { useNavigate } from "react-router-dom";

export default function Playlist() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    const { data } = await getPlaylists(user.id);
    setPlaylists(data || []);
  };

  const handleCreate = async () => {
    if (!name) return;
    await createPlaylist(name, user.id);
    setName("");
    loadPlaylists();
  };

  const goToPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 pb-28">
      <h1 className="text-2xl font-bold mb-4">Your Playlists</h1>

      {/* Create New Playlist */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New playlist name"
          className="px-3 py-2 text-black rounded w-full md:w-1/2"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Create
        </button>
      </div>

      {/* Playlists List */}
      {playlists.length === 0 && (
        <p className="text-gray-400">No playlists yet</p>
      )}

      {playlists.map((pl) => (
        <div
          key={pl.id}
          onClick={() => goToPlaylist(pl.id)}
          className="cursor-pointer block bg-gray-800 p-4 rounded mb-3 hover:bg-gray-700 transition-colors"
        >
          {pl.name}
        </div>
      ))}
    </div>
  );
}
