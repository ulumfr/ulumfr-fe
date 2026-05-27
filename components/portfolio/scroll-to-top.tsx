"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 10 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card/65 backdrop-blur-md border border-white/10 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary/20 transition-all duration-300 shadow-lg shadow-black/25 flex items-center justify-center cursor-pointer group"
                    aria-label="Scroll to top"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg
                        className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
