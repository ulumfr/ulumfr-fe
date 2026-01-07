"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 5 + (i * 6) % 90,
      y: 5 + (i * 7) % 90,
      size: 2 + (i % 2),
      duration: 4 + (i % 3),
    })),
    []);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="bg-zinc-950 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="w-full max-w-sm z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? (
              <LoginForm onToggleForm={toggleForm} />
            ) : (
              <SignupForm onToggleForm={toggleForm} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
