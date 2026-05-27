"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Resume } from "@/types/resume";

const LANDING_NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const PAGE_NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
];

interface NavbarProps {
    resume?: Resume | null;
}

export default function Navbar({ resume }: NavbarProps) {
    const pathname = usePathname();
    const isLandingPage = pathname === "/";

    const [scrolled, setScrolled] = useState(false);
    const [pastIntro, setPastIntro] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            setPastIntro(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Intersection observer for landing page sections
    useEffect(() => {
        if (!isLandingPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        LANDING_NAV_ITEMS.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [isLandingPage]);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setMobileOpen(false);
        }
    };

    const navItems = isLandingPage ? LANDING_NAV_ITEMS : PAGE_NAV_ITEMS;

    // On sub-pages, navbar is always visible
    const showNavbar = isLandingPage ? pastIntro : true;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: showNavbar ? 0 : -100 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isLandingPage
                    ? "bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    {isLandingPage ? (
                        <motion.button
                            onClick={() => scrollTo("#home")}
                            className="relative flex items-center gap-2 group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-mono font-bold text-primary text-sm group-hover:border-primary/60 group-hover:bg-primary/20 transition-all duration-300">
                                BU
                            </div>
                            <span className="text-foreground font-semibold text-sm hidden sm:block">
                                ulumfr<span className="text-primary">.my.id</span>
                            </span>
                        </motion.button>
                    ) : (
                        <Link href="/" className="relative flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-mono font-bold text-primary text-sm group-hover:border-primary/60 group-hover:bg-primary/20 transition-all duration-300">
                                    BU
                                </div>
                                <span className="text-foreground font-semibold text-sm hidden sm:block">
                                    ulumfr<span className="text-primary">.my.id</span>
                                </span>
                            </motion.div>
                        </Link>
                    )}

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = isLandingPage
                                ? activeSection === item.href.slice(1)
                                : pathname === item.href;

                            return isLandingPage ? (
                                <button
                                    key={item.href}
                                    onClick={() => scrollTo(item.href)}
                                    className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-300 rounded-md cursor-pointer ${isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute inset-0 rounded-md bg-primary/10 border border-primary/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                        />
                                    )}
                                </button>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-300 rounded-md ${isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute inset-0 rounded-md bg-primary/10 border border-primary/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Resume CTA + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        {resume && (
                            <motion.a
                                href={resume.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Resume
                            </motion.a>
                        )}

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-6"
                    >
                        {navItems.map((item, i) => {
                            const isActive = isLandingPage
                                ? activeSection === item.href.slice(1)
                                : pathname === item.href;

                            return isLandingPage ? (
                                <motion.button
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    onClick={() => scrollTo(item.href)}
                                    className={`text-2xl font-medium transition-colors cursor-pointer ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {item.label}
                                </motion.button>
                            ) : (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-2xl font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            );
                        })}
                        {resume && (
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navItems.length * 0.08 }}
                                href={resume.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 px-8 py-3 rounded-lg bg-primary/20 text-primary border border-primary/40 font-medium"
                                onClick={() => setMobileOpen(false)}
                            >
                                Download Resume
                            </motion.a>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
