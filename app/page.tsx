"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Generate random particles with fixed positions
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 5 + (i * 4.5) % 90,
  y: 5 + ((i * 7) % 90),
  size: 2 + (i % 3),
  duration: 4 + (i % 4),
  delay: i * 0.2,
}));

export default function Home() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isIdle, setIsIdle] = useState(true);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }

      setIsIdle(false);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Inline keyframes */}
      <style jsx global>{`
        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(15px) scale(1.5);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-60px) translateX(-10px) scale(1);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-30px) translateX(20px) scale(1.3);
            opacity: 0.7;
          }
        }
        
        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(60px, -40px) scale(1.2);
          }
          66% {
            transform: translate(-40px, 30px) scale(0.8);
          }
        }
      `}</style>

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.1s ease-out, top 0.1s ease-out, opacity 0.5s",
          opacity: isIdle ? 0 : 1,
          left: "50%",
          top: "50%",
        }}
      />

      {/* Idle floating particles */}
      {mounted && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transition: "opacity 1s ease",
            opacity: isIdle ? 1 : 0,
          }}
        >
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "50%",
                animationName: isIdle ? "floatUp" : "none",
                animationDuration: `${p.duration}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}

          {/* Floating orbs */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "15%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              animationName: isIdle ? "orbFloat" : "none",
              animationDuration: "10s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "15%",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
              animationName: isIdle ? "orbFloat" : "none",
              animationDuration: "12s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDirection: "reverse",
            }}
          />
        </div>
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <Card className="relative max-w-lg w-full z-10 bg-zinc-900 border-zinc-800">
        <CardContent className="pt-12 pb-10 px-8 text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-zinc-800 text-zinc-300 border-zinc-700"
          >
            🚧 Coming Soon
          </Badge>

          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/10">
              <svg
                className="w-10 h-10 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Under Development
          </h1>

          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Kami sedang membangun sesuatu yang luar biasa.
            <br />
            Silakan kembali lagi nanti!
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Progress</span>
              <span>In Progress</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: "45%" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
