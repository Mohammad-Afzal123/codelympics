"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-black/70 p-10 rounded-2xl shadow-lg text-center max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-purple-300">
          Sign In to CodeLympics
        </h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center gap-3 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg transition w-full justify-center"
        >
          <Rocket size={20} /> Sign in with Google
        </button>
      </motion.div>
    </div>
  );
}
