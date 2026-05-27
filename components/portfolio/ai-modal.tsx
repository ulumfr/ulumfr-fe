"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
    timestamp: Date;
}

const SUGGESTIONS = [
    "What is your tech stack?",
    "Show me your featured projects",
    "Are you available for freelance/work?",
    "How can I contact you?",
];

const getMockResponse = (input: string): string => {
    const text = input.toLowerCase();

    if (text.includes("stack") || text.includes("tech") || text.includes("skill") || text.includes("bahasa") || text.includes("teknologi")) {
        return "I specialize in building scalable web applications. My core stack includes:\n\n• **Frontend**: Next.js, React, TypeScript, Tailwind CSS\n• **Backend**: Go (Golang), Laravel (PHP), Node.js (Express)\n• **Database & Ops**: PostgreSQL, MySQL, Redis, Docker, Git\n\nI love working with Go and modern frontend frameworks like Next.js!";
    }

    if (text.includes("project") || text.includes("portfolio") || text.includes("karya")) {
        return "I have worked on various projects, ranging from single-page portfolios to complex dashboard systems. Some featured projects:\n\n1. **Portfolio Management Dashboard** (Next.js & Go): A full-featured CMS dashboard to manage portfolio assets and experiences.\n2. **Go Backend APIs**: High-performance RESTful APIs built with clean architecture.\n\nYou can visit my [Projects](/projects) page for the full list!";
    }

    if (text.includes("hire") || text.includes("work") || text.includes("freelance") || text.includes("available") || text.includes("kerja") || text.includes("job")) {
        return "Yes! I am currently **available** for full-time roles, freelance projects, and contract work. Let's discuss how we can work together!";
    }

    if (text.includes("contact") || text.includes("email") || text.includes("hubungi") || text.includes("sosmed") || text.includes("instagram") || text.includes("linkedin")) {
        return "You can reach out to me through:\n\n• **Email**: [bahrululumfr@gmail.com](mailto:bahrululumfr@gmail.com)\n• **LinkedIn**: [linkedin.com/in/ulumfr](https://linkedin.com/in/ulumfr)\n• **Instagram**: [@ulumfr](https://instagram.com/ulumfr)\n• **GitHub**: [github.com/ulumfr](https://github.com/ulumfr)";
    }

    if (text.includes("hello") || text.includes("hi") || text.includes("halo") || text.includes("hei") || text.includes("hey")) {
        return "Hello! 👋 I am Bahrul's AI assistant. Ask me anything about his skills, projects, experience, or availability!";
    }

    if (text.includes("who") || text.includes("about") || text.includes("biodata") || text.includes("nama") || text.includes("siapa")) {
        return "I am Bahrul Ulum (Ulumfr), a Full Stack Developer. I love turning complex problems into simple, beautiful, and intuitive digital solutions.";
    }

    return "That's a great question! I'm a client-side assistant trained on Bahrul's portfolio data. You can ask me about his:\n\n• **Tech Stack & Skills**\n• **Projects & Creations**\n• **Job Availability & Freelance**\n• **Contact & Social Media**";
};

export default function AIModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            sender: "bot",
            text: "Hi! I'm Ulum's AI Assistant. Ask me anything about his background, skills, or projects! Press ESC to close.",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isOpenRef = useRef(isOpen);
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    // Toggle open/close via keypress and custom events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape" && isOpenRef.current) {
                setIsOpen(false);
            }
        };

        const handleOpenTrigger = () => {
            setIsOpen(true);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-ai-modal", handleOpenTrigger);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-ai-modal", handleOpenTrigger);
        };
    }, []);

    // Auto-scroll to bottom of chat when new message arrives or typing changes
    useEffect(() => {
        if (isOpen) {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping, isOpen]);

    // Focus input field when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSend = (textToSend: string) => {
        const trimmed = textToSend.trim();
        if (!trimmed) return;

        const userMsg: Message = {
            id: Math.random().toString(36).substring(7),
            sender: "user",
            text: trimmed,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = getMockResponse(trimmed);
            const botMsg: Message = {
                id: Math.random().toString(36).substring(7),
                sender: "bot",
                text: botResponse,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 650);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-zoom-out"
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="relative w-full max-w-2xl bg-card/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 flex flex-col h-[520px] max-h-[85vh] z-10"
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                                    <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                        Ulum&apos;s Assistant
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground/60">Press ESC or click outside to exit</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground/60 hover:text-foreground transition-all cursor-pointer"
                                aria-label="Close modal"
                            >
                                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                                            msg.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                                                : "bg-white/[0.03] border border-white/5 text-muted-foreground rounded-tl-none"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Suggestion Chips */}
                        <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex flex-wrap gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
                            {SUGGESTIONS.map((sug) => (
                                <button
                                    key={sug}
                                    onClick={() => handleSend(sug)}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-card border border-white/5 text-muted-foreground/80 hover:text-primary hover:border-primary/25 hover:bg-primary/5 transition-all duration-300 cursor-pointer whitespace-nowrap"
                                >
                                    {sug}
                                </button>
                            ))}
                        </div>

                        {/* Message Input form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend(input);
                            }}
                            className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex gap-3 flex-shrink-0"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about stack, projects, experience, contact..."
                                className="flex-1 bg-background/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/45 transition-colors font-sans"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary/10"
                            >
                                <span>Send</span>
                                <svg className="w-3.5 h-3.5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
