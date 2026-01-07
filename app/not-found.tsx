"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    const particles = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: 5 + (i * 4.5) % 90,
            y: 5 + (i * 7) % 90,
            size: 2 + (i % 3),
            duration: 3 + (i % 4),
        })),
        []);

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-white/10"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="absolute w-96 h-96 rounded-full"
                style={{
                    top: "10%",
                    left: "5%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
                animate={{
                    x: [0, 80, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                }}
            />

            <motion.div
                className="absolute w-80 h-80 rounded-full"
                style={{
                    bottom: "10%",
                    right: "10%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
                animate={{
                    x: [0, -60, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                }}
            />

            <motion.div
                className="text-center z-10 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative inline-block mb-6"
                >
                    <span className="text-[180px] md:text-[220px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 leading-none">
                        404
                    </span>
                    <motion.div
                        className="absolute inset-0 text-[180px] md:text-[220px] font-bold text-white/5 blur-2xl pointer-events-none"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    >
                        404
                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-3xl font-semibold text-white mb-3"
                >
                    Halaman Tidak Ditemukan
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-zinc-500 max-w-md mx-auto mb-8"
                >
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="gap-2 border-zinc-800 text-zinc-300 hover:bg-zinc-800/50 cursor-pointer"
                        >
                            <ArrowLeft className="size-4" />
                            Kembali
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            onClick={() => router.push("/")}
                            className="gap-2 bg-white text-black hover:bg-zinc-200 cursor-pointer"
                        >
                            <Home className="size-4" />
                            Beranda
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 flex justify-center gap-6"
                >
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-zinc-700"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
