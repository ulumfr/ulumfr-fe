"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Blog } from "@/types/blog";

interface BlogSectionProps {
    blogs?: Blog[];
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function BlogSection({ blogs = [] }: BlogSectionProps) {
    if (blogs.length === 0) return null;

    return (
        <section id="blog" className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-primary font-mono text-sm mb-2 block">05 — Blog</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Recent <span className="italic font-serif font-normal text-primary">writings</span>
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {blogs.slice(0, 5).map((blog, i) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ x: 8 }}
                            className="group flex items-center gap-5 p-4 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 hover:bg-card/50 transition-all duration-300 cursor-pointer"
                        >
                            {/* Number */}
                            <span className="text-2xl font-bold text-muted-foreground/20 font-mono w-8 flex-shrink-0 text-right group-hover:text-primary/30 transition-colors">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Cover image mini */}
                            {blog.cover_image && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                    <Image
                                        src={blog.cover_image}
                                        alt={blog.title}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {blog.title}
                                </h3>
                                {blog.excerpt && (
                                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                                        {blog.excerpt}
                                    </p>
                                )}
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-muted-foreground/60 font-mono">
                                        {blog.published_at ? formatDate(blog.published_at) : formatDate(blog.created_at)}
                                    </span>
                                    {blog.tags && blog.tags.length > 0 && (
                                        <div className="flex gap-1">
                                            {blog.tags.slice(0, 2).map((tag) => (
                                                <span key={tag.id} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary/70 font-mono">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Arrow */}
                            <svg
                                className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
