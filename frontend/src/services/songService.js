import { supabase } from "./api";

export const uploadSong = async (file, title, artist, userId) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("songs")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("songs")
    .getPublicUrl(fileName);

  return await supabase.from("songs").insert([
    {
      title,
      artist,
      audio_url: data.publicUrl,
      user_id: userId,
    },
  ]);
};

export const getSongs = async () => {
  return await supabase.from("songs").select("*").order("created_at", {
    ascending: false,
  });
};
