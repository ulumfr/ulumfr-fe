"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    getPublicCareers,
    getPublicEducations,
    getPublicResume,
} from "@/services/public-api";
import type { Career } from "@/types/career";
import type { Education } from "@/types/education";
import type { Resume } from "@/types/resume";
import Navbar from "@/components/portfolio/navbar";
import Footer from "@/components/portfolio/footer";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

function formatDuration(start: string, end?: string) {
    const s = new Date(start);
    const e = end ? new Date(end) : new Date();
    const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
    const years = Math.floor(months / 12);
    const rem = months % 12;
    if (years > 0 && rem > 0) return `${years}y ${rem}m`;
    if (years > 0) return `${years}y`;
    return `${rem}m`;
}

interface TimelineItem {
    id: string;
    type: "work" | "education";
    title: string;
    subtitle: string;
    location?: string;
    description?: string;
    logo_url?: string;
    url?: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    gpa?: string;
}

export default function ExperiencePage() {
    const [careers, setCareers] = useState<Career[]>([]);
    const [educations, setEducations] = useState<Education[]>([]);
    const [resume, setResume] = useState<Resume | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchAll() {
            const [careersData, educationsData, resumeData] = await Promise.all([
                getPublicCareers(),
                getPublicEducations(),
                getPublicResume(),
            ]);
            setCareers(careersData);
            setEducations(educationsData);
            setResume(resumeData);
            setLoaded(true);
        }
        fetchAll();
    }, []);

    // Merge and sort chronologically (newest first)
    const timeline = useMemo<TimelineItem[]>(() => {
        const items: TimelineItem[] = [
            ...careers.map((c) => ({
                id: c.id,
                type: "work" as const,
                title: c.position,
                subtitle: c.company,
                location: c.location,
                description: c.description,
                logo_url: c.logo_url,
                url: c.company_url,
                start_date: c.start_date,
                end_date: c.end_date,
                is_current: c.is_current,
            })),
            ...educations.map((e) => ({
                id: e.id,
                type: "education" as const,
                title: e.degree,
                subtitle: e.school,
                location: e.location,
                description: e.description,
                logo_url: e.logo_url,
                url: e.school_url,
                start_date: e.start_date,
                end_date: e.end_date,
                is_current: false,
                gpa: e.gpa,
            })),
        ];
        return items.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
    }, [careers, educations]);

    if (!loaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            </div>
        );
    }

    return (
        <>
            <Navbar resume={resume} />
            <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <Link
                            href="/"
                            onClick={() => {
                                if (typeof window !== "undefined") {
                                    sessionStorage.setItem("scrollTarget", "experience");
                                }
                            }}
                            className="text-sm text-muted-foreground/60 hover:text-primary transition-colors font-mono cursor-pointer"
                        >
                            ← Back to Home
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                    >
                        <div>
                            <span className="text-primary font-mono text-sm mb-2 block">Experience</span>
                            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                                Where I&apos;ve <span className="italic font-serif font-normal text-primary">been</span>
                            </h1>
                        </div>
                        {resume && (
                            <motion.a
                                href={resume.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Timeline */}
                    {timeline.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">
                            <p className="text-lg">No experience data yet.</p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-white/5" />

                            <div className="space-y-8">
                                {timeline.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: i * 0.08, duration: 0.4 }}
                                        className="relative pl-16 sm:pl-20"
                                    >
                                        {/* Dot + Type badge */}
                                        <div className="absolute left-4 sm:left-6 top-3 flex items-center justify-center">
                                            <div className={`w-4 h-4 rounded-full border-2 ${item.is_current
                                                    ? "border-emerald-400 bg-emerald-400/20"
                                                    : item.type === "work"
                                                        ? "border-primary/50 bg-primary/10"
                                                        : "border-blue-400/50 bg-blue-400/10"
                                                }`}>
                                                {item.is_current && (
                                                    <div className="w-full h-full rounded-full bg-emerald-400 animate-ping opacity-40" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Card */}
                                        <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-primary/15 transition-all duration-300">
                                            <div className="flex items-start gap-4">
                                                {/* Logo */}
                                                <div className="w-12 h-12 rounded-xl bg-background/50 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                    {item.logo_url ? (
                                                        <Image src={item.logo_url} alt={item.subtitle} width={48} height={48} className="w-full h-full object-contain p-1.5" />
                                                    ) : (
                                                        <span className="text-xs font-bold text-muted-foreground">
                                                            {item.subtitle.slice(0, 2).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                                        <div>
                                                            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                                                            {item.url ? (
                                                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                                                                    {item.subtitle}
                                                                </a>
                                                            ) : (
                                                                <p className="text-primary text-sm">{item.subtitle}</p>
                                                            )}
                                                        </div>
                                                        <div className="text-right text-xs text-muted-foreground">
                                                            <div>{formatDate(item.start_date)} — {item.is_current ? "Present" : item.end_date ? formatDate(item.end_date) : ""}</div>
                                                            <span className="font-mono text-muted-foreground/50">{formatDuration(item.start_date, item.end_date || undefined)}</span>
                                                        </div>
                                                    </div>

                                                    {/* Meta */}
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono uppercase tracking-wider ${item.type === "work"
                                                                ? "bg-primary/10 text-primary border border-primary/20"
                                                                : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                                                            }`}>
                                                            {item.type}
                                                        </span>
                                                        {item.location && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-background/50 border border-white/5 text-muted-foreground">
                                                                📍 {item.location}
                                                            </span>
                                                        )}
                                                        {item.is_current && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                                Current
                                                            </span>
                                                        )}
                                                        {item.gpa && item.gpa !== "-" && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-mono">
                                                                GPA: {item.gpa}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Description */}
                                                    {item.description && item.description !== "-" && (
                                                        <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                                                            {item.description.split("\n").map((line, li) => {
                                                                const trimmed = line.replace(/^[\*\-•]\s*/, "").trim();
                                                                if (!trimmed) return null;
                                                                return (
                                                                    <div key={li} className="flex gap-2">
                                                                        <span className="text-primary/40 mt-0.5 flex-shrink-0">▸</span>
                                                                        <span>{trimmed}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
