import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadSong } from "../services/songService";

export default function UploadSong() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");
    await uploadSong(file, title, artist, user.id);
    alert("Song uploaded 🎶");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload Song</h1>

      <input
        placeholder="Song Title"
        className="block mb-3 p-2 text-black"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Artist"
        className="block mb-3 p-2 text-black"
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        type="file"
        accept="audio/*"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-green-500 px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
