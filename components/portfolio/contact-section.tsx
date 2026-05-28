"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { submitContact } from "@/services/public-api";

export default function ContactSection() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [sending, setSending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setSending(true);
        const success = await submitContact(form);

        if (success) {
            toast.success("Message sent! I'll get back to you soon.");
            setForm({ name: "", email: "", subject: "", message: "" });
        } else {
            toast.error("Failed to send message. Please try again.");
        }
        setSending(false);
    };

    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-primary font-mono text-sm mb-2 block">04 — Contact</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Let&apos;s <span className="italic font-serif font-normal text-primary">connect</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Left — Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5"
                    >
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                                    Name <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-card/40 border border-white/5 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:bg-card/60 transition-all duration-300"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                                    Email <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-card/40 border border-white/5 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:bg-card/60 transition-all duration-300"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-card/40 border border-white/5 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:bg-card/60 transition-all duration-300"
                                placeholder="What's this about?"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                                Message <span className="text-primary">*</span>
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg bg-card/40 border border-white/5 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:bg-card/60 transition-all duration-300 resize-none"
                                placeholder="Tell me about your project or just say hi!"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={sending}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98, y: 2 }}
                            className="w-full py-3.5 rounded-lg bg-primary/15 text-primary border-2 border-primary/30 font-medium text-sm hover:bg-primary/25 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:shadow-none cursor-pointer"
                        >
                            {sending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                "Send Message →"
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Right — Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div className="bg-card/40 border border-white/5 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Get in touch</h3>
                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                I&apos;m always open to new opportunities, collaborations, or just a friendly chat about tech.
                                Feel free to reach out!
                            </p>

                            <div className="space-y-4">
                                <ContactInfo
                                    icon={
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    label="Email"
                                    value="bahrululumfr@gmail.com"
                                    href="mailto:bahrululumfr@gmail.com"
                                />
                                <ContactInfo
                                    icon={
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    }
                                    label="GitHub"
                                    value="github.com/ulumfr"
                                    href="https://github.com/ulumfr"
                                />
                                <ContactInfo
                                    icon={
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    }
                                    label="LinkedIn"
                                    value="linkedin.com/in/ulumfr"
                                    href="https://linkedin.com/in/ulumfr"
                                />
                                <ContactInfo
                                    icon={
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    }
                                    label="Instagram"
                                    value="@ulumfr"
                                    href="https://instagram.com/ulumfr"
                                />
                                <ContactInfo
                                    icon={
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    }
                                    label="Location"
                                    value="Malang, Indonesia"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
    const content = (
        <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-xs text-muted-foreground/60 font-mono">{label}</p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">{value}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                {content}
            </a>
        );
    }
    return <div>{content}</div>;
}
