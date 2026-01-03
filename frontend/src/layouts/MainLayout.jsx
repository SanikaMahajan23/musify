import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-br from-[#1a1a1a] via-black to-[#121212] p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
