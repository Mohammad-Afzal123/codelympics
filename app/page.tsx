"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Rocket, Star, Users, Globe } from "lucide-react";
import { useCallback } from "react";

export default function Home() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const hackathons = [
    {
      title: "CodeStorm",
      rules: ["3 hrs coding sprint", "Teams of 2–4", "AI/ML challenges"],
    },
    {
      title: "CyberQuest",
      rules: ["Capture the Flag", "Solve vulnerabilities", "Win rewards"],
    },
    {
      title: "DataVoyagers",
      rules: ["Clean dataset", "Visualize trends", "Best insights win"],
    },
  ];

  const timeline = [
    { time: "Day 1 - 10:00 AM", event: "Opening Ceremony" },
    { time: "Day 1 - 12:00 PM", event: "Hackathon Kickoff" },
    { time: "Day 1 - 6:00 PM", event: "Mentor Sessions" },
    { time: "Day 2 - 11:00 AM", event: "Midway Checkpoint" },
    { time: "Day 2 - 4:00 PM", event: "Final Submissions" },
    { time: "Day 2 - 6:00 PM", event: "Closing Ceremony" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white font-sans">
      {/* Space Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#000" },
          particles: {
            number: { value: 200, density: { enable: true, area: 1200 } },
            color: { value: ["#ffffff", "#FFD700", "#00BFFF"] },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.6 },
            twinkle: { particles: { enable: true, color: "#fff", frequency: 0.2 } },
            links: { enable: true, distance: 120, color: "#ffffff33", opacity: 0.3 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-12"
        >
          Welcome to <span className="text-purple-400">CodeLympics</span>
        </motion.h1>

        {/* Olympic Circles */}
        <div className="relative flex flex-wrap justify-center gap-4 sm:gap-6 max-w-lg">
          {[
            { color: "#1E90FF", style: "translate-x-0 translate-y-0" },
            { color: "#000000", style: "translate-x-12 -translate-y-6" }, // black
            { color: "#FF4500", style: "translate-x-24 translate-y-0" },
            { color: "#FFD700", style: "translate-x-6 translate-y-10" },
            { color: "#32CD32", style: "translate-x-18 translate-y-10" },
          ].map((ring, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.2, rotate: 8 }}
              className={`absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 ${ring.style}`}
              style={{ borderColor: ring.color }}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-32 inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-lg rounded-full shadow-lg shadow-purple-500/50 transition"
        >
          <Rocket /> Enter the Universe
        </motion.a>
      </section>

      {/* Hackathon Section */}
      <section className="relative px-6 py-20 bg-gradient-to-b from-black to-purple-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Upcoming Hackathons
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {hackathons.map((hack, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-black/60 border border-purple-500/50 p-6 rounded-2xl shadow-lg flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-300">
                {hack.title}
              </h3>
              <ul className="text-sm space-y-2">
                {hack.rules.map((rule, idx) => (
                  <li key={idx}>• {rule}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How we conduct */}
      <section className="px-6 py-20 bg-gradient-to-b from-purple-900 to-black text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          How We Conduct Our Hackathons
        </h2>

        <div className="grid gap-8 sm:grid-cols-3 max-w-6xl mx-auto">
          {[
            { icon: <Star size={32} />, title: "Innovative Themes", text: "Unique challenges every time" },
            { icon: <Users size={32} />, title: "Collaboration", text: "Team-based problem solving" },
            { icon: <Globe size={32} />, title: "Global Access", text: "Join from anywhere in the world" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-black/60 rounded-2xl border border-purple-500/40 shadow-lg"
            >
              <div className="mb-4 flex justify-center text-purple-300">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-20 bg-gradient-to-b from-black to-purple-950">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Event Timeline
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500/50"></div>
          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative w-full sm:w-1/2 p-6 bg-black/70 border border-purple-500/40 rounded-xl shadow-md ${
                  i % 2 === 0 ? "self-start" : "self-end"
                }`}
              >
                <h4 className="font-semibold text-purple-300">{item.time}</h4>
                <p className="text-sm text-gray-300">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
