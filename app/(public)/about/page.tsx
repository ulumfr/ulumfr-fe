"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    getPublicAbout,
    getPublicTags,
    getPublicCertificates,
    getPublicBlogs,
    getPublicResume,
} from "@/services/public-api";
import type { About } from "@/types/about";
import type { Tag } from "@/types/tag";
import type { Certificate } from "@/types/certificate";
import type { Blog } from "@/types/blog";
import type { Resume } from "@/types/resume";
import Navbar from "@/components/portfolio/navbar";
import Footer from "@/components/portfolio/footer";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

// Group tags by rough category
function groupTags(tags: Tag[]) {
    const groups: Record<string, Tag[]> = {
        Languages: [],
        "Frameworks & Libraries": [],
        "Databases & Storage": [],
        "DevOps & Tools": [],
        Other: [],
    };

    const langSlugs = ["javascript", "typescript", "python", "go", "php", "java", "c", "cpp", "csharp", "rust", "ruby", "kotlin", "swift", "dart", "html", "css", "sass", "scss"];
    const fwSlugs = ["react", "nextjs", "vue", "angular", "svelte", "laravel", "express", "nestjs", "django", "flask", "spring", "rails", "flutter", "react-native", "tailwindcss", "bootstrap", "prisma", "jquery"];
    const dbSlugs = ["postgresql", "mysql", "mongodb", "redis", "firebase", "supabase", "sqlite", "elasticsearch"];

    tags.forEach((tag) => {
        const slug = tag.slug.toLowerCase();
        if (langSlugs.includes(slug)) groups["Languages"].push(tag);
        else if (fwSlugs.includes(slug)) groups["Frameworks & Libraries"].push(tag);
        else if (dbSlugs.includes(slug)) groups["Databases & Storage"].push(tag);
        else if (["docker", "git", "github", "gitlab", "linux", "nginx", "aws", "vercel", "netlify", "figma", "postman", "vscode"].includes(slug))
            groups["DevOps & Tools"].push(tag);
        else groups["Other"].push(tag);
    });

    return Object.entries(groups).filter(([, tags]) => tags.length > 0);
}

export default function AboutPage() {
    const [about, setAbout] = useState<About | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [resume, setResume] = useState<Resume | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAll() {
            const [aboutData, tagsData, certsData, blogsData, resumeData] = await Promise.all([
                getPublicAbout(),
                getPublicTags(),
                getPublicCertificates(),
                getPublicBlogs(),
                getPublicResume(),
            ]);
            setAbout(aboutData);
            setTags(tagsData);
            setCertificates(certsData);
            setBlogs(blogsData);
            setResume(resumeData);
            setLoaded(true);
        }
        fetchAll();
    }, []);

    const name = about?.full_name || "Bahrul Ulum";
    const bio = about?.bio || "A passionate Full Stack Developer with experience in building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions.";
    const avatarUrl = about?.cover_url;
    const location = about?.location || "Malang, Indonesia";
    const tagGroups = groupTags(tags);

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
                                    sessionStorage.setItem("scrollTarget", "about");
                                }
                            }}
                            className="text-sm text-muted-foreground/60 hover:text-primary transition-colors font-mono cursor-pointer"
                        >
                            ← Back to Home
                        </Link>
                    </motion.div>

                    {/* Profile header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-start gap-8 mb-16"
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="relative aspect-[3/4] w-32 sm:w-40 rounded-2xl overflow-hidden bg-muted border-2 border-white/10">
                                {avatarUrl ? (
                                    <Image src={avatarUrl} alt={name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-primary/40">
                                            {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{name}</h1>
                                <p className="text-primary font-mono text-sm">{about?.role || "Full Stack Developer"}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-card/60 border border-white/5 text-xs text-muted-foreground">
                                    📍 {location}
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Available
                                </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{bio}</p>
                        </div>
                    </motion.div>
                    {/* Tech Stack — Full grouped */}
                    {/* {tagGroups.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5 }}
                            className="mb-20"
                        >
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                Tech <span className="italic font-serif font-normal text-primary">Stack</span>
                            </h2>
                            <div className="space-y-8">
                                {tagGroups.map(([group, groupTags]) => (
                                    <div key={group}>
                                        <h3 className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-3">
                                            {group}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {groupTags.map((tag, i) => (
                                                <motion.div
                                                    key={tag.id}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: false }}
                                                    transition={{ delay: i * 0.02 }}
                                                    whileHover={{ scale: 1.06, y: -2 }}
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/60 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                                                >
                                                    {tag.icon_url && <i className={`${tag.icon_url} text-base`} />}
                                                    <span className="text-xs font-medium text-muted-foreground">{tag.name}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )} */}

                    {/* Certificates */}
                    {certificates.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5 }}
                            className="mb-20"
                        >
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                <span className="italic font-serif font-normal text-primary">Certificates</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {certificates.map((cert, i) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: i * 0.06 }}
                                        whileHover={{ y: -3 }}
                                        className="group bg-card/50 border border-white/5 rounded-xl p-5 hover:border-primary/20 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-11 h-11 rounded-lg bg-background/50 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                {cert.image_url ? (
                                                    <Image src={cert.image_url} alt={cert.name} width={44} height={44} className="w-full h-full object-contain p-1 cursor-zoom-in" onClick={() => setActiveImage(cert.image_url || null)} />
                                                ) : (
                                                    <svg className="w-5 h-5 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{cert.name}</h3>
                                                <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                                                <p className="text-xs text-muted-foreground/60 font-mono mt-1">{formatDate(cert.issue_date)}</p>
                                            </div>
                                        </div>
                                        {cert.credential_url && (
                                            <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors">
                                                View Credential ↗
                                            </a>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Blog Posts */}
                    {blogs.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                Recent <span className="italic font-serif font-normal text-primary">Writings</span>
                            </h2>
                            <div className="space-y-3">
                                {blogs.map((blog, i) => (
                                    <motion.article
                                        key={blog.id}
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: i * 0.06 }}
                                        whileHover={{ x: 6 }}
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 hover:bg-card/50 transition-all duration-300"
                                    >
                                        <span className="text-xl font-bold text-muted-foreground/20 font-mono w-7 flex-shrink-0 text-right group-hover:text-primary/30 transition-colors">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {blog.cover_image && (
                                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                <Image src={blog.cover_image} alt={blog.title} width={56} height={56} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{blog.title}</h3>
                                            {blog.excerpt && <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{blog.excerpt}</p>}
                                            <span className="text-[10px] text-muted-foreground/60 font-mono mt-1 block">
                                                {blog.published_at ? formatDate(blog.published_at) : formatDate(blog.created_at)}
                                            </span>
                                        </div>
                                        <svg className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </div>
            <Footer />

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveImage(null)}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                            onClick={() => setActiveImage(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="relative max-w-4xl max-h-[80vh] w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={activeImage}
                                alt="Certificate Large Preview"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
