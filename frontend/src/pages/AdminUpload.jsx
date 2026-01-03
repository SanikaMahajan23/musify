import { useState } from "react";
import { supabase } from "../services/api";

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadSong = async () => {
    if (!title || !artist || !audioFile || !coverFile) {
      alert("⚠️ Please fill all fields");
      return;
    }

    // Optional size limits
    if (audioFile.size > 15 * 1024 * 1024) {
      alert("Audio file should be under 15MB");
      return;
    }

    setLoading(true);

    try {
      const timestamp = Date.now();

      /* ================= AUDIO UPLOAD ================= */
      const audioPath = `songs/${timestamp}-${audioFile.name}`;
      const { error: audioError } = await supabase.storage
        .from("songs")
        .upload(audioPath, audioFile);

      if (audioError) throw audioError;

      /* ================= COVER UPLOAD ================= */
      const coverPath = `covers/${timestamp}-${coverFile.name}`;
      const { error: coverError } = await supabase.storage
        .from("covers")
        .upload(coverPath, coverFile);

      if (coverError) throw coverError;

      /* ================= PUBLIC URLS ================= */
      const audioUrl = supabase.storage
        .from("songs")
        .getPublicUrl(audioPath).data.publicUrl;

      const coverUrl = supabase.storage
        .from("covers")
        .getPublicUrl(coverPath).data.publicUrl;

      /* ================= INSERT DB ================= */
      const { error } = await supabase.from("songs").insert([
        {
          title,
          artist,
          audio_url: audioUrl,
          cover_url: coverUrl,
        },
      ]);

      if (error) throw error;

      alert("✅ Song uploaded successfully 🎉");

      // Reset form
      setTitle("");
      setArtist("");
      setAudioFile(null);
      setCoverFile(null);
    } catch (err) {
      alert("❌ Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-green-400 mb-6 text-center">
          🎧 Musify Admin Upload
        </h1>

        <div className="space-y-4">
          {/* Song Title */}
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-green-500"
          />

          {/* Artist */}
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-green-500"
          />

          {/* Audio */}
          <div>
            <label className="text-sm text-gray-300">🎵 Audio File (MP3)</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
              className="mt-1 block w-full text-sm"
            />
          </div>

          {/* Cover */}
          <div>
            <label className="text-sm text-gray-300">🖼 Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              className="mt-1 block w-full text-sm"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={uploadSong}
            disabled={loading}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 py-3 rounded-full font-bold tracking-wide transition"
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </div>
      </div>
    </div>
  );
}
