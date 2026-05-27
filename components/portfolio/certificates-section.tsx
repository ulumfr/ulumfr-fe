"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Certificate } from "@/types/certificate";

interface CertificatesSectionProps {
    certificates?: Certificate[];
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

export default function CertificatesSection({ certificates = [] }: CertificatesSectionProps) {
    if (certificates.length === 0) return null;

    return (
        <section className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-primary font-mono text-sm mb-2 block">04 — Certificates</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Professional <span className="italic font-serif font-normal text-primary">credentials</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {certificates.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -4 }}
                            className="group bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-5 hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                {/* Cert image / logo */}
                                <div className="w-12 h-12 rounded-lg bg-background/50 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    {cert.image_url ? (
                                        <Image
                                            src={cert.image_url}
                                            alt={cert.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    ) : (
                                        <svg className="w-6 h-6 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {cert.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                                    <p className="text-xs text-muted-foreground/60 font-mono mt-1">
                                        {formatDate(cert.issue_date)}
                                    </p>
                                </div>
                            </div>
                            {cert.credential_url && (
                                <a
                                    href={cert.credential_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors"
                                >
                                    View Credential
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
