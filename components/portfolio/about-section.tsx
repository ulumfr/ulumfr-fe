"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { About } from "@/types/about";
import type { Tag } from "@/types/tag";

interface AboutSectionProps {
    about?: About | null;
    tags?: Tag[];
}

export default function AboutSection({ about, tags = [] }: AboutSectionProps) {
    const name = about?.full_name || "Bahrul Ulum";
    const bio = about?.bio || "A passionate Full Stack Developer with experience in building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions.";
    const avatarUrl = about?.avatar_url;
    const location = about?.location || "Indonesia";

    // Pick a subset of well-known tags to showcase as skills
    const skillSlugs = [
        "typescript", "javascript", "react", "nextjs", "nodejs", "go", "laravel", "php", "python", "tailwindcss", "postgresql", "mongodb", "docker", "git", "prisma", "redis", "express", "figma", "html5", "github", "notion", "vite", "supabase"
    ];
    const displayTags = tags.filter((t) => skillSlugs.includes(t.slug));

    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-primary font-mono text-sm mb-2 block">01 — About</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Get to know <span className="italic font-serif font-normal text-primary">me</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-12 items-start">
                    {/* Left — Avatar polaroid */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2 flex justify-center z-10"
                    >
                        <div className="relative">
                            <motion.div
                                drag
                                dragSnapToOrigin
                                dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                                dragElastic={0.25}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 3,
                                    zIndex: 20,
                                    boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.5)"
                                }}
                                whileTap={{ scale: 0.98, cursor: "grabbing" }}
                                initial={{ rotate: -2 }}
                                className="bg-card/80 border border-white/10 p-3 pb-12 rounded-sm shadow-2xl shadow-black/40 cursor-grab select-none origin-center"
                            >
                                <div className="w-full aspect-[4/5] rounded-sm overflow-hidden bg-muted relative max-w-[280px] pointer-events-none">
                                    {avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt={name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                            <span className="text-6xl font-bold text-primary/40">
                                                {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {/* Polaroid label */}
                                <p className="text-center mt-3 text-sm text-muted-foreground font-mono select-none">
                                    {name}
                                </p>
                            </motion.div>
                            {/* Glow behind polaroid */}
                            <div className="absolute -inset-4 bg-primary/5 rounded-lg blur-2xl -z-10 pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Right — Bio + Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:col-span-3 space-y-6"
                    >
                        {/* Location + Status */}
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/60 border border-white/5 text-sm text-muted-foreground">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {location}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Available for work
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                            {bio}
                        </p>

                        {/* Skills */}
                        {displayTags.length > 0 && (
                            <div>
                                <h3 className="text-sm font-mono text-muted-foreground mb-3">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {displayTags.map((tag, i) => (
                                        <motion.div
                                            key={tag.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: false }}
                                            transition={{ delay: i * 0.03 }}
                                            whileHover={{ scale: 1.08, y: -2 }}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/60 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                                        >
                                            {tag.icon_url && (
                                                <i className={`${tag.icon_url} text-base`} />
                                            )}
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {tag.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* View All button */}
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-2 text-sm text-primary/70 hover:text-primary font-medium transition-colors mt-2 cursor-pointer"
                        >
                            Read more about me
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
