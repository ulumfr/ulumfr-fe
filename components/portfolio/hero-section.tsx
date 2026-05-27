"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { About } from "@/types/about";

const ROLES = ["Full Stack Developer", "Backend Engineer", "Software Developer"];

interface HeroSectionProps {
    about?: About | null;
}

export default function HeroSection({ about }: HeroSectionProps) {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const glowRef = useRef<HTMLDivElement>(null);

    const nickname = about?.nickname?.trim() || "ULUM";
    const name = about?.full_name || "Bahrul Ulum";
    const bio = about?.bio || "Passionate about building scalable web applications and crafting elegant solutions to complex problems.";
    const roles = useMemo(() => {
        if (!about) return ROLES;
        if (!about.role?.trim()) return ["Belum disetting"];
        return about.role
            .split(",")
            .map((r) => r.trim())
            .filter((r) => r.length > 0);
    }, [about]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Typing effect
    useEffect(() => {
        if (roleIndex >= roles.length) {
            setRoleIndex(0);
            return;
        }
        const currentRole = roles[roleIndex];
        if (!currentRole) return;

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (displayText.length < currentRole.length) {
                        setDisplayText(currentRole.slice(0, displayText.length + 1));
                    } else {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    if (displayText.length > 0) {
                        setDisplayText(displayText.slice(0, -1));
                    } else {
                        setIsDeleting(false);
                        setRoleIndex((prev) => (prev + 1) % roles.length);
                    }
                }
            },
            isDeleting ? 40 : 80
        );
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex, roles]);

    // Mouse glow tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (glowRef.current) {
                glowRef.current.style.left = `${e.clientX}px`;
                glowRef.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const openAIModal = () => {
        window.dispatchEvent(new CustomEvent("open-ai-modal"));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                openAIModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Particles background config
    const particles = useMemo(
        () =>
            Array.from({ length: 30 }, (_, i) => ({
                id: i,
                x: 5 + ((i * 3.7) % 90),
                y: 5 + ((i * 7.3) % 90),
                size: 1.5 + (i % 3),
                duration: 5 + (i % 5),
                delay: i * 0.15,
            })),
        []
    );

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Interactive Mouse Glow */}
            <div
                ref={glowRef}
                className="pointer-events-none fixed w-[500px] h-[500px] rounded-full opacity-[0.08] transition-opacity duration-500"
                style={{
                    background: "radial-gradient(circle, hsl(40 100% 60% / 0.4) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        top: "10%",
                        right: "5%",
                        width: "450px",
                        height: "450px",
                        background: "radial-gradient(circle, hsl(40 80% 50% / 0.04) 0%, transparent 70%)",
                        filter: "blur(90px)",
                    }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity }}
                />
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        bottom: "15%",
                        left: "5%",
                        width: "350px",
                        height: "350px",
                        background: "radial-gradient(circle, hsl(260 60% 50% / 0.03) 0%, transparent 70%)",
                        filter: "blur(90px)",
                    }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                        scale: [1, 0.9, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            {/* Subtle Grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.012,
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Floating Particles */}
            <AnimatePresence>
                {mounted && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
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

            {/* Combined Typographical Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Greeting - Serif Italic */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="mb-1"
                >
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-light italic font-serif text-muted-foreground/60">
                        Hi, I&apos;m
                    </span>
                </motion.div>

                {/* Combined Giant Name - BUFR / ULUM styled */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6"
                >
                    <span className="text-foreground">{nickname}</span>
                    <span className="text-primary">.</span>
                </motion.h1>

                {/* Dynamic Typing Role */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-6 h-8 flex items-center justify-center"
                >
                    <span className="font-mono text-sm sm:text-base text-muted-foreground/80">
                        &lt;{" "}
                        <span className="text-primary">{displayText}</span>
                        <span className="animate-pulse text-primary font-bold">|</span>
                        {" "}/&gt;
                    </span>
                </motion.div>

                {/* Subtitle / Bio */}
                {/* <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-muted-foreground/75 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light"
                >
                    {bio}
                </motion.p> */}

                {/* Social links */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center justify-center gap-3.5"
                >
                    <SocialLink href="https://github.com/ulumfr" label="GitHub">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </SocialLink>
                    <SocialLink href="https://linkedin.com/in/ulumfr" label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </SocialLink>
                    <SocialLink href="https://instagram.com/ulumfr" label="Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </SocialLink>
                    {about?.email && (
                        <SocialLink href={`mailto:${about.email}`} label="Email">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </SocialLink>
                    )}
                </motion.div> */}

                {/* AI Assistant Search Bar Trigger */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.95 }}
                    className="mt-10 max-w-sm mx-auto relative group cursor-pointer"
                    onClick={openAIModal}
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-violet-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                    <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card/65 border border-white/10 hover:border-primary/30 text-muted-foreground/60 transition-all duration-300">
                        <svg className="w-4 h-4 text-primary/75 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-xs font-light text-left flex-1 font-mono">
                            Ask my AI assistant... (e.g. skills)
                        </span>
                        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded border border-white/10 bg-background/50 font-mono text-[9px] text-muted-foreground/45">
                            Ctrl + K
                        </kbd>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
            >
                <span className="text-[9px] text-muted-foreground/35 font-mono uppercase tracking-[0.25em]">
                    Scroll Down
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-5 h-8.5 rounded-full border border-muted-foreground/25 flex items-start justify-center pt-1.5"
                >
                    <div className="w-0.5 h-1.5 rounded-full bg-primary/45 animate-pulse" />
                </motion.div>
            </motion.div>
        </section>
    );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-3 rounded-xl bg-card/40 border border-white/5 text-muted-foreground/80 hover:text-primary hover:border-primary/25 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.a>
    );
}
