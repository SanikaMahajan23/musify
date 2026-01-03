import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import PlaylistDetails from "./pages/PlaylistDetails";
import LikedSongs from "./pages/LikedSongs";
import AdminUpload from "./pages/AdminUpload";
import ProtectedRoute from "./routes/ProtectedRoute";
import AudioPlayer from "./components/Player/AudioPlayer";
import MainLayout from "./layouts/MainLayout";
import Podcasts from "./pages/Podcasts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Playlist />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
<Route
  path="/admin/upload"
  element={
    <ProtectedRoute>
      <MainLayout>
        <AdminUpload />
      </MainLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/podcasts"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Podcasts />
      </MainLayout>
    </ProtectedRoute>
  }
/>



        <Route
          path="/playlist/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PlaylistDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ❤️ Liked Songs */}
        <Route
          path="/liked"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LikedSongs />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Global Audio Player */}
      <AudioPlayer />
    </BrowserRouter>
  );
}

export default App;
