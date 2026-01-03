import { supabase } from "./api";

// Create playlist
export const createPlaylist = async (name, userId) => {
  return await supabase.from("playlists").insert({
    name,
    user_id: userId,
  });
};

// Get user playlists
export const getPlaylists = async (userId) => {
  return await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
};

// Add song to playlist
export const addTrackToPlaylist = async (playlistId, track) => {
  return await supabase.from("playlist_tracks").insert({
    playlist_id: playlistId,
    title: track.title,
    artist: track.artist,
    audio_url: track.audio_url,
  });
};

// Get songs from playlist
export const getPlaylistTracks = async (playlistId) => {
  return await supabase
    .from("playlist_tracks")
    .select("*")
    .eq("playlist_id", playlistId);
};
