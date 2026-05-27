"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Floating particles
    const particles = useMemo(
        () =>
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                x: 5 + ((i * 4.3) % 90),
                y: 5 + ((i * 6.7) % 90),
                size: 1.5 + (i % 3),
                duration: 5 + (i % 6),
                delay: i * 0.2,
            })),
        []
    );

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        top: "15%",
                        right: "10%",
                        width: "450px",
                        height: "450px",
                        background: "radial-gradient(circle, hsl(40 80% 50% / 0.03) 0%, transparent 70%)",
                        filter: "blur(100px)",
                    }}
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        bottom: "20%",
                        left: "8%",
                        width: "350px",
                        height: "350px",
                        background: "radial-gradient(circle, hsl(260 50% 50% / 0.025) 0%, transparent 70%)",
                        filter: "blur(100px)",
                    }}
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 40, 0],
                        scale: [1, 0.85, 1],
                    }}
                    transition={{ duration: 16, repeat: Infinity }}
                />
            </div>

            {/* Subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.012,
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Particles */}
            <AnimatePresence>
                {mounted && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 3 }}
                    >
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full bg-primary/20"
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    width: `${p.size}px`,
                                    height: `${p.size}px`,
                                }}
                                animate={{
                                    y: [-12, 12, -12],
                                    x: [-6, 6, -6],
                                    opacity: [0.1, 0.4, 0.1],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="relative z-10 text-center px-6">
                {/* "Hi," italic serif */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <span className="text-5xl sm:text-7xl lg:text-8xl font-light italic font-serif text-muted-foreground/60">
                        Hi,
                    </span>
                </motion.div>

                {/* "ULUM." bold sans */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <h1 className="text-7xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter leading-none text-foreground">
                        ULUM<span className="text-primary">.</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-6 text-sm sm:text-base text-muted-foreground/50 font-mono tracking-widest uppercase"
                >
                    Full Stack Developer & Tech Enthusiast
                </motion.p>

                {/* Divider line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-8 mx-auto w-16 h-px bg-primary/30 origin-center"
                />
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <span className="text-[10px] text-muted-foreground/30 font-mono uppercase tracking-[0.3em]">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-8 rounded-full border border-muted-foreground/20 flex items-start justify-center pt-1.5"
                >
                    <div className="w-0.5 h-1.5 rounded-full bg-primary/40" />
                </motion.div>
            </motion.div>
        </section>
    );
}
