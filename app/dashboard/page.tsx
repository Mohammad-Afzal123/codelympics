"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Rocket, Star, User, Calendar, Settings } from "lucide-react";
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export default function Dashboard() {
  const { data: session, status } = useSession();

  // ✅ Initialize particles properly
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine as any);
  }, []);
  // ✅ Handle loading state
  if (status === "loading") {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  // ✅ Handle not signed in
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
        <h2 className="text-2xl mb-4">You must sign in to continue</h2>
        <button
          onClick={() => signIn("google")}
          className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // ✅ Signed in → Dashboard
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      {/* Background Stars */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "black" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#888", distance: 150 },
            move: { enable: true, speed: 1 },
            number: { value: 100 },
            size: { value: 2 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Rocket className="text-purple-400" /> SpaceDash
        </div>
        <div className="flex gap-6">
          <a href="/dashboard" className="hover:text-purple-400">Home</a>
          <a href="/events" className="hover:text-purple-400">Events</a>
          <a href="/profile" className="hover:text-purple-400">Profile</a>
          <a href="/settings" className="hover:text-purple-400">Settings</a>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 p-8">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-2 bg-black/40 backdrop-blur-lg p-4 rounded-2xl border border-gray-800"
        >
          <ul className="space-y-6">
            <li className="flex items-center gap-3 hover:text-purple-400">
              <Star /> Dashboard
            </li>
            <li className="flex items-center gap-3 hover:text-purple-400">
              <Calendar /> Events
            </li>
            <li className="flex items-center gap-3 hover:text-purple-400">
              <User /> Profile
            </li>
            <li className="flex items-center gap-3 hover:text-purple-400">
              <Settings /> Settings
            </li>
          </ul>
        </motion.aside>

        {/* Main Sections */}
        <div className="col-span-10 space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-black/40 p-6 rounded-2xl border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-2">
              👨‍🚀 Welcome back, {session.user?.name ?? "Astronaut"}!
            </h2>
            <p className="text-gray-400">Your mission control dashboard is ready.</p>
            {session.user?.college && (
              <p className="text-purple-400 mt-2">
                College: {session.user.college}
              </p>
            )}
          </motion.div>

          {/* Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 p-6 rounded-2xl border border-gray-800"
          >
            <h2 className="text-xl font-bold mb-4">🚀 Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-900/40 rounded-xl border border-purple-700">
                Hackathon - Oct 12
              </div>
              <div className="p-4 bg-purple-900/40 rounded-xl border border-purple-700">
                Code Olympics - Oct 13
              </div>
              <div className="p-4 bg-purple-900/40 rounded-xl border border-purple-700">
                AI Workshop - Oct 14
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-black/40 border-t border-gray-800 mt-10">
        <p className="text-gray-400">© 2025 SpaceDash • Made with 🚀 & 🌌</p>
      </footer>
    </div>
  );
}
