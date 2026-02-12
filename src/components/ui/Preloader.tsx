"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        // Generate particles only on the client side to avoid hydration mismatch
        const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 2 + 1,
        }));
        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 3) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 20);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black text-white overflow-hidden font-syne"
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Anti-Gravity Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white/20 rounded-full pointer-events-none"
                    style={{
                        left: `${p.x}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    initial={{ top: "110%" }}
                    animate={{ top: "-10%" }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            {/* Glowing Center Orb - Pulsing */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-[200px] h-[200px] bg-neon-lime/10 rounded-full blur-[80px]"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Huge Counter with Glitch Effect Offset */}
            <div className="relative z-10 flex items-baseline overflow-hidden">
                {/* Shadow Text for Depth */}
                <span className="absolute top-1 left-1 text-[15vw] font-black text-white/5 blur-sm select-none">
                    {count}
                </span>

                <motion.span
                    className="text-[15vw] font-black tracking-tighter leading-none text-white mix-blend-difference"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -200, opacity: 0, transition: { duration: 0.5 } }} // Fly up on exit
                >
                    {count}
                </motion.span>
                <span className="text-[3vw] text-neon-lime font-bold mb-4 md:mb-8">%</span>
            </div>

            {/* Loading Bar with "Scanning" Effect */}
            <div className="absolute bottom-20 w-64 h-1 bg-white/10 overflow-hidden rounded-full">
                <motion.div
                    className="h-full bg-neon-lime shadow-[0_0_10px_#d2ff00]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${count}%` }}
                />
            </div>

            {/* System Status Text */}
            <div className="absolute bottom-12 font-mono text-xs text-white/50 tracking-[0.3em] uppercase">
                {count < 100 ? "Loading Resources..." : "System Ready"}
            </div>

        </motion.div>
    );
}
