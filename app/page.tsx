"use client";

import { motion, Variants } from "framer-motion";
import {
  Rocket,
  Star,
  Users,
  Globe,
  Trophy,
  Award,
  Medal,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function Home() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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

  const podiumPrizes = [
    { rank: "2nd Place", prize: "$5,000 & Gadgets", icon: <Award size={48} />, color: "text-slate-300", podiumHeight: "h-64", order: "order-2 md:order-1" },
    { rank: "1st Place", prize: "$10,000 & Tech Bundle", icon: <Trophy size={64} />, color: "text-yellow-400", podiumHeight: "h-80", order: "order-1 md:order-2" },
    { rank: "3rd Place", prize: "$2,500 & Swag Pack", icon: <Medal size={48} />, color: "text-amber-600", podiumHeight: "h-56", order: "order-3" },
  ];

  const judges = [
    {
      name: "Alex Turing",
      title: "Chief Scientist, Future Systems",
    },
    {
      name: "Brenda Hopper",
      title: "Quantum Architect, Enigma Corp",
    },
    { name: "Casey Lovelace", title: "Head of AI, Turing Machines" },
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
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-white font-sans antialiased"
      style={{
        backgroundImage: "url('/wallpaper.png')",
        backgroundRepeat: 'repeat',
      }}>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
        {/* Video Background - z-index: 1 */}
        <div className="absolute top-0 left-0 w-full h-full z-[1]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/space.mp4" type="video/mp4" />
          </video>
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-[2] text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
        >
          Welcome to <span className="text-purple-400">CodeLympics</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-[2] text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          The ultimate coding odyssey where innovation meets competition. Join developers from across the galaxy to build, learn, and conquer.
        </motion.p>

        {/* Olympic Circles */}
        <div className="relative z-[2] w-[320px] h-[150px] sm:w-[400px] sm:h-[188px] mt-16 mb-12">
          {[
            { color: "#0085C7", style: "top-0 left-0" }, // Blue
            { color: "#FFFFFF", style: "top-0 left-1/2 -translate-x-1/2" }, // Black
            { color: "#DF0024", style: "top-0 right-0" }, // Red
            { color: "#F4C300", style: "top-[50px] sm:top-[62px] left-[55px] sm:left-[69px]" }, // Yellow
            { color: "#009F3D", style: "top-[50px] sm:top-[62px] left-[165px] sm:left-[206px]" }, // Green
          ].map((ring, idx) => (
            <motion.div
              key={idx}
              className={`absolute w-[100px] h-[100px] sm:w-[125px] sm:h-[125px] rounded-full border-[10px] sm:border-[12px] ${ring.style}`}
              style={{ borderColor: ring.color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + idx * 0.15, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.a
          href="./login"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(192, 132, 252, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="relative z-[2] inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-lg font-semibold rounded-full shadow-lg shadow-purple-500/40 transition-all duration-300"
        >
          <Rocket /> Enter the Universe
        </motion.a>
      </section>

      {/* Hackathon Section */}
      <section
        className="relative px-6 py-24"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Upcoming Hackathons
        </h2>

        <motion.div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          {hackathons.map((hack, i) => (
            <motion.div variants={itemVariants} key={i}
              className="bg-black/50 backdrop-blur-sm border border-purple-500/30 p-6 rounded-2xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-300">
                {hack.title}
              </h3>
              <ul className="text-sm space-y-2 text-gray-300">
                {hack.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2"><Star size={14} className="mt-1 text-purple-400 flex-shrink-0" /> <span>{rule}</span></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How we conduct */}
      <section
        className="px-6 py-24 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          How We Conduct Our Hackathons
        </h2>

        <motion.div className="grid gap-8 sm:grid-cols-3 max-w-6xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          {[
            { icon: <Globe size={32} />, title: "Global Access", text: "Join from anywhere in the world" },
            { icon: <Users size={32} />, title: "Collaboration", text: "Team-based problem solving" },
            { icon: <Star size={32} />, title: "Innovative Themes", text: "Unique challenges every time" },
          ].map((item, idx) => (
            <motion.div variants={itemVariants} key={idx}
              className="p-6 bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-lg transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 hover:scale-105"
            >
              <div className="mb-4 flex justify-center text-purple-300">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Prizes Section */}
      <section
        className="relative px-6 py-24" >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Prizes & Recognition
        </h2>
        <motion.div
          className="flex flex-col md:flex-row items-end justify-center gap-2 md:gap-0 max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          {podiumPrizes.map((prize, i) => (
            <motion.div variants={itemVariants} key={i} className={`relative overflow-hidden flex flex-col items-center justify-end p-6 rounded-t-lg w-full md:w-1/3 ${prize.podiumHeight} ${prize.order} bg-gradient-to-b from-purple-900/80 to-black/80 border-x border-t border-purple-400/50 shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(192,132,252,0.4)] hover:border-purple-300 hover:-translate-y-2 backdrop-blur-sm`}>
              {prize.rank === "1st Place" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] bg-[radial-gradient(ellipse_at_top,_rgba(192,132,252,0.4)_0%,_rgba(255,255,255,0)_60%)] animate-pulse" />
              )}
              <div className="relative z-10 text-center">
                <div className={`mb-4 flex justify-center ${prize.color}`}>{prize.icon}</div>
                <h3 className={`text-2xl font-bold mb-2 ${prize.color}`}>{prize.rank}</h3>
                <p className="text-lg text-gray-200">{prize.prize}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Timeline */}
      <section
        className="px-6 py-24"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Event Timeline
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500/30 rounded-full"></div>
          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative w-full sm:w-[calc(50%-2rem)] p-6 bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-md ${
                  i % 2 === 0 ? "self-start sm:mr-auto" : "self-end sm:ml-auto"
                }`}
              >
                <h4 className="font-semibold text-purple-300">{item.time}</h4>
                <p className="text-sm text-gray-300">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Judges Section */}
      <section
        className="relative px-6 py-24"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Meet The Judges
        </h2>
        <motion.div className="grid gap-8 sm:grid-cols-3 max-w-6xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          {judges.map((judge, i) => (
            <motion.div variants={itemVariants} key={i}
              className="p-6 bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-lg text-center transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 hover:scale-105"
            >
              <div className="mb-4 flex justify-center text-purple-300">
                <div className="w-24 h-24 rounded-full bg-purple-900/50 flex items-center justify-center">
                  <Users size={40} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{judge.name}</h3>
              <p className="text-sm text-gray-400">{judge.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-white transition-colors"><Github /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} CodeLympics. All rights reserved.</p>
          <p>An Intergalactic Coding Extravaganza.</p>
        </div>
      </footer>
    </div>
  );
}
