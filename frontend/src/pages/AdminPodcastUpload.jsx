import { useState } from "react";
import { supabase } from "../services/api";

export default function AdminPodcastUpload() {
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);

  const uploadPodcast = async () => {
    if (!audio) return alert("Audio required");

    const audioPath = `podcasts/${Date.now()}-${audio.name}`;
    const coverPath = cover ? `covers/${Date.now()}-${cover.name}` : null;

    await supabase.storage.from("podcast-audio").upload(audioPath, audio);
    if (cover) {
      await supabase.storage.from("podcast-covers").upload(coverPath, cover);
    }

    const audio_url = supabase.storage
      .from("podcast-audio")
      .getPublicUrl(audioPath).data.publicUrl;

    const cover_url = cover
      ? supabase.storage.from("podcast-covers").getPublicUrl(coverPath).data.publicUrl
      : null;

    await supabase.from("podcasts").insert([
      {
        title,
        host,
        category,
        description,
        audio_url,
        cover_url,
      },
    ]);

    alert("Podcast uploaded successfully 🎙️");
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Upload Podcast</h2>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Host" onChange={e => setHost(e.target.value)} />
      <input placeholder="Category" onChange={e => setCategory(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />

      <input type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} />
      <input type="file" accept="image/*" onChange={e => setCover(e.target.files[0])} />

      <button onClick={uploadPodcast} className="bg-green-500 px-6 py-2 mt-4">
        Upload Podcast
      </button>
    </div>
  );
}
