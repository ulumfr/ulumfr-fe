"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Career } from "@/types/career";
import type { Education } from "@/types/education";

interface ExperienceSectionProps {
    careers?: Career[];
    educations?: Education[];
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

function formatDuration(start: string, end?: string, isCurrent?: boolean) {
    const s = new Date(start);
    const e = end ? new Date(end) : new Date();
    const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0 && remainingMonths > 0) return `${years}y ${remainingMonths}m`;
    if (years > 0) return `${years}y`;
    return `${remainingMonths}m`;
}

export default function ExperienceSection({ careers = [], educations = [] }: ExperienceSectionProps) {
    const [tab, setTab] = useState<"work" | "education">("work");
    const [activeIndex, setActiveIndex] = useState(0);

    const items = tab === "work" ? careers : educations;

    return (
        <section id="experience" className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-primary font-mono text-sm mb-2 block">02 — Experience</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Where I&apos;ve <span className="italic font-serif font-normal text-primary">been</span>
                    </h2>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-2 mb-10"
                >
                    {[
                        { key: "work" as const, label: "Work", count: careers.length },
                        { key: "education" as const, label: "Education", count: educations.length },
                    ].map((t) => (
                        <button
                            key={t.key}
                            onClick={() => {
                                setTab(t.key);
                                setActiveIndex(0);
                            }}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${tab === t.key
                                ? "bg-primary/15 text-primary border border-primary/30"
                                : "bg-card/40 text-muted-foreground border border-white/5 hover:border-white/10 hover:text-foreground"
                                }`}
                        >
                            {t.label}
                            <span className="ml-2 text-xs opacity-60">{t.count}</span>
                        </button>
                    ))}
                </motion.div>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 text-muted-foreground"
                    >
                        <p className="text-lg">No {tab} experience added yet.</p>
                        <p className="text-sm mt-1 opacity-60">Check back later!</p>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-12 gap-6">
                        {/* Left — Index tabs (stacked card tabs) */}
                        <div className="md:col-span-4 space-y-2">
                            {items.map((item, i) => {
                                const isWork = tab === "work";
                                const title = isWork
                                    ? (item as Career).company
                                    : (item as Education).school;
                                const subtitle = isWork
                                    ? (item as Career).position
                                    : `${(item as Education).degree}`;
                                const logoUrl = isWork
                                    ? (item as Career).logo_url
                                    : (item as Education).logo_url;

                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setActiveIndex(i)}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: i * 0.08 }}
                                        className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-300 flex items-center gap-3 cursor-pointer ${activeIndex === i
                                            ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/5"
                                            : "bg-card/40 border-white/5 hover:border-white/10 hover:bg-card/60"
                                            }`}
                                    >
                                        {/* Logo */}
                                        <div className="w-10 h-10 rounded-lg bg-background/50 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                            {logoUrl ? (
                                                <Image
                                                    src={logoUrl}
                                                    alt={title}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            ) : (
                                                <span className="text-xs font-bold text-muted-foreground">
                                                    {title.slice(0, 2).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`text-sm font-medium truncate ${activeIndex === i ? "text-primary" : "text-foreground"}`}>
                                                {title}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Right — Detail card */}
                        <div className="md:col-span-8 relative min-h-[300px]">
                            <AnimatePresence mode="wait">
                                {items.map((item, i) => {
                                    if (i !== activeIndex) return null;

                                    const isWork = tab === "work";
                                    const title = isWork ? (item as Career).position : `${(item as Education).degree}`;
                                    const place = isWork ? (item as Career).company : (item as Education).school;
                                    const location = item.location;
                                    const description = item.description;
                                    const startDate = item.start_date;
                                    const endDate = isWork ? (item as Career).end_date : (item as Education).end_date;
                                    const isCurrent = isWork ? (item as Career).is_current : false;
                                    const url = isWork ? (item as Career).company_url : (item as Education).school_url;
                                    const gpa = !isWork ? (item as Education).gpa : undefined;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                            transition={{ duration: 0.35 }}
                                            className="bg-card/60 backdrop-blur-sm border border-white/5 rounded-xl p-6 sm:p-8"
                                        >
                                            {/* Header */}
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-foreground">{title}</h3>
                                                    {url ? (
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline text-sm font-medium cursor-pointer"
                                                        >
                                                            {place}
                                                        </a>
                                                    ) : (
                                                        <p className="text-primary text-sm font-medium">{place}</p>
                                                    )}
                                                </div>
                                                <div className="text-right text-sm">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <span>{formatDate(startDate)}</span>
                                                        <span>—</span>
                                                        <span>{isCurrent ? "Present" : endDate ? formatDate(endDate) : ""}</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground/60 font-mono">
                                                        {formatDuration(startDate, endDate || undefined, isCurrent)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Meta pills */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {location && (
                                                    <span className="text-xs px-2.5 py-1 rounded-md bg-background/50 border border-white/5 text-muted-foreground">
                                                        📍 {location}
                                                    </span>
                                                )}
                                                {isCurrent && (
                                                    <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                        Current
                                                    </span>
                                                )}
                                                {gpa && gpa !== "-" && (
                                                    <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary">
                                                        GPA: {gpa}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description */}
                                            {description && description !== "-" && (
                                                <div className="text-muted-foreground text-sm leading-relaxed space-y-1.5">
                                                    {description.split("\n").map((line, li) => {
                                                        const trimmed = line.replace(/^[\*\-•]\s*/, "").trim();
                                                        if (!trimmed) return null;
                                                        return (
                                                            <div key={li} className="flex gap-2">
                                                                <span className="text-primary/50 mt-0.5 flex-shrink-0">▸</span>
                                                                <span>{trimmed}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* View All button */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-10 text-center"
                >
                    <Link
                        href="/experience"
                        className="group inline-flex items-center gap-2 text-sm text-primary/70 hover:text-primary font-medium transition-colors cursor-pointer"
                    >
                        View full timeline
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
