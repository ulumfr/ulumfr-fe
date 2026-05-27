"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    getPublicProjects,
    getPublicCategories,
    getPublicResume,
} from "@/services/public-api";
import type { Project } from "@/types/project";
import type { Category } from "@/types/category";
import type { Resume } from "@/types/resume";
import Navbar from "@/components/portfolio/navbar";
import Footer from "@/components/portfolio/footer";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [resume, setResume] = useState<Resume | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchAll() {
            const [projectsData, categoriesData, resumeData] = await Promise.all([
                getPublicProjects(),
                getPublicCategories(),
                getPublicResume(),
            ]);
            setProjects(projectsData);
            setCategories(categoriesData);
            setResume(resumeData);
            setLoaded(true);
        }
        fetchAll();
    }, []);

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) =>
                  p.categories?.some((c) => c.slug === activeCategory)
              );

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
            <div className="max-w-6xl mx-auto px-6">
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
                                sessionStorage.setItem("scrollTarget", "projects");
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
                    className="mb-12"
                >
                    <span className="text-primary font-mono text-sm mb-2 block">Projects</span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                        Things I&apos;ve <span className="italic font-serif font-normal text-primary">built</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl">
                        A collection of projects I&apos;ve worked on, from web applications to mobile apps and everything in between.
                    </p>
                </motion.div>

                {/* Category filters */}
                {categories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex flex-wrap gap-2 mb-10"
                    >
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                                activeCategory === "all"
                                    ? "bg-primary/15 text-primary border border-primary/30"
                                    : "bg-card/40 text-muted-foreground border border-white/5 hover:border-white/10 hover:text-foreground"
                            }`}
                        >
                            All
                            <span className="ml-1.5 text-xs opacity-60">{projects.length}</span>
                        </button>
                        {categories.map((cat) => {
                            const count = projects.filter((p) =>
                                p.categories?.some((c) => c.slug === cat.slug)
                            ).length;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.slug)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                                        activeCategory === cat.slug
                                            ? "bg-primary/15 text-primary border border-primary/30"
                                            : "bg-card/40 text-muted-foreground border border-white/5 hover:border-white/10 hover:text-foreground"
                                    }`}
                                >
                                    {cat.name}
                                    <span className="ml-1.5 text-xs opacity-60">{count}</span>
                                </button>
                            );
                        })}
                    </motion.div>
                )}

                {/* Projects grid */}
                {filteredProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-card/60 border border-white/5 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <p className="text-lg text-muted-foreground mb-1">
                            {activeCategory === "all" ? "No projects yet" : "No projects in this category"}
                        </p>
                        <p className="text-sm text-muted-foreground/60">
                            {activeCategory === "all"
                                ? "Projects are being cooked up. Stay tuned! 🚀"
                                : "Try selecting a different category."}
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6, rotate: i % 2 === 0 ? 0.5 : -0.5 }}
                                className="group bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    {project.thumbnail_url ? (
                                        <Image
                                            src={project.thumbnail_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                                            <svg className="w-10 h-10 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* Overlay links */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                        {project.demo_url && (
                                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-primary/30 hover:border-primary/40 transition-all cursor-pointer">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </a>
                                        )}
                                        {project.repo_url && (
                                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-primary/30 hover:border-primary/40 transition-all cursor-pointer">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                            </a>
                                        )}
                                    </div>
                                    {project.is_featured && (
                                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary/80 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                                            ⭐ Featured
                                        </div>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="p-5">
                                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                    {project.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                                    )}
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.slice(0, 5).map((tag) => (
                                                <span key={tag.id} className="text-[11px] px-2 py-0.5 rounded-md bg-background/50 border border-white/5 text-muted-foreground font-mono">
                                                    {tag.name}
                                                </span>
                                            ))}
                                            {project.tags.length > 5 && (
                                                <span className="text-[11px] px-2 py-0.5 rounded-md bg-background/50 border border-white/5 text-muted-foreground/50 font-mono">
                                                    +{project.tags.length - 5}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            </div>
            <Footer />
        </>
    );
}
