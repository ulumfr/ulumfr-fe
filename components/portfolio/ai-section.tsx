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

// Client-side mock AI database for realistic answers
const getMockResponse = (input: string): string => {
    const text = input.toLowerCase();

    if (text.includes("stack") || text.includes("tech") || text.includes("skill") || text.includes("bahasa") || text.includes("teknologi")) {
        return "I specialize in building scalable web applications. My core stack includes:\n\n• **Frontend**: Next.js, React, TypeScript, Tailwind CSS\n• **Backend**: Go (Golang), Laravel (PHP), Node.js (Express)\n• **Database & Ops**: PostgreSQL, MySQL, Redis, Docker, Git\n\nI love working with both strongly-typed languages like Go and modern frontend frameworks like Next.js!";
    }

    if (text.includes("project") || text.includes("portfolio") || text.includes("karya")) {
        return "I have worked on various projects, ranging from single-page portfolios to complex dashboard management systems. Some of my featured projects are:\n\n1. **Portfolio Management Dashboard** (Next.js & Go): A full-featured CMS dashboard to manage portfolio assets, tag relationships, and experiences.\n2. **Go Backend APIs**: High-performance RESTful APIs built with clean architecture in Go.\n\nYou can scroll down to the **Projects** section of this page to view more, or visit my [Projects](/projects) page for the full list!";
    }

    if (text.includes("hire") || text.includes("work") || text.includes("freelance") || text.includes("available") || text.includes("kerja") || text.includes("job")) {
        return "Yes, I am currently **available** for full-time roles, freelance projects, and contract work! I am passionate about crafting high-quality code and bringing ideas to life. Let's discuss how we can work together in the **Contact** section below.";
    }

    if (text.includes("contact") || text.includes("email") || text.includes("hubungi") || text.includes("sosmed") || text.includes("instagram") || text.includes("linkedin")) {
        return "You can reach out to me through several channels:\n\n• **Email**: [bahrululumfr@gmail.com](mailto:bahrululumfr@gmail.com) (or use the contact form below!)\n• **LinkedIn**: [linkedin.com/in/ulumfr](https://linkedin.com/in/ulumfr)\n• **Instagram**: [@ulumfr](https://instagram.com/ulumfr)\n• **GitHub**: [github.com/ulumfr](https://github.com/ulumfr)\n\nI usually respond within a few hours!";
    }

    if (text.includes("hello") || text.includes("hi") || text.includes("halo") || text.includes("hei") || text.includes("hey")) {
        return "Hello there! 👋 I am Ulum's AI assistant. Ask me anything about his skills, projects, experience, or how to contact him!";
    }

    if (text.includes("who") || text.includes("about") || text.includes("biodata") || text.includes("nama") || text.includes("siapa")) {
        return "I am Bahrul Ulum (Ulumfr), a Full Stack Developer based in Indonesia. I love turning complex problems into simple, beautiful, and intuitive digital solutions. I have experience in both frontend development (React/Next.js) and backend architecture (Go/PHP/Node.js).";
    }

    return "That's a great question! I'm a client-side assistant trained on Ulum's portfolio data. You can ask me about his:\n\n• **Tech Stack & Skills**\n• **Projects & Creations**\n• **Job Availability & Freelance**\n• **Contact & Social Media**\n\nOr try selecting one of the quick suggestions below!";
};

export default function AISection() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            sender: "bot",
            text: "Hi! I'm Ulum's AI Assistant. Ask me anything about his background, skills, or projects!",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Handle initial focus from Hero trigger
    useEffect(() => {
        const handleFocusTrigger = () => {
            inputRef.current?.focus();
        };
        window.addEventListener("focus-ai-input", handleFocusTrigger);
        return () => window.removeEventListener("focus-ai-input", handleFocusTrigger);
    }, []);

    const handleSend = (textToSend: string) => {
        const trimmed = textToSend.trim();
        if (!trimmed) return;

        // Add user message
        const userMsg: Message = {
            id: Math.random().toString(36).substring(7),
            sender: "user",
            text: trimmed,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI typing delay
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
        }, 800);
    };

    return (
        <section id="ai-assistant" className="py-24 relative overflow-hidden border-t border-white/5">
            {/* Background decorative glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-12 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[80px]" />
                <div className="absolute -bottom-12 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[80px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] mb-2 block">
                        Interactive Agent
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Ask My <span className="italic font-serif font-normal text-primary">AI Assistant</span>
                    </h2>
                    <p className="text-muted-foreground/70 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                        Have quick questions? Get instant answers about my skills, availability, and works.
                    </p>
                </div>

                {/* Chat Card Wrapper */}
                <div className="bg-card/45 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 flex flex-col h-[500px]">
                    {/* Chat Header */}
                    <div className="px-6 py-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                    Ulum&apos;s Assistant
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-[10px] text-muted-foreground/60">Powered by client-side intelligence</span>
                            </div>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            Online
                        </span>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                                            msg.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                                                : "bg-white/[0.03] border border-white/5 text-muted-foreground rounded-tl-none"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Bot typing simulation */}
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
                    <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex flex-wrap gap-2 overflow-x-auto scrollbar-none">
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

                    {/* Chat Input Field */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend(input);
                        }}
                        className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex gap-3"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question..."
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
                </div>
            </div>
        </section>
    );
}
