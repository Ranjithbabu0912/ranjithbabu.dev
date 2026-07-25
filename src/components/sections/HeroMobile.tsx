"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Mail, Terminal, Cpu, Zap, Star } from "lucide-react";


export default function HeroMobile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    const roles = [
        "Full-Stack Developer",
        "Creative UI/UX Designer",
        "Interactive App Architect",
        "Frontend Engineer"
    ];

    // Rotating role text effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2800);
        return () => clearInterval(interval);
    }, [roles.length]);

    // Scroll-driven Parallax with Framer Motion
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
    const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const yCard = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    const rotateCard = useTransform(scrollYProgress, [0, 1], [0, 4]);

    // Touch / Drag Parallax Interaction
    const touchX = useMotionValue(0);
    const touchY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(touchX, springConfig);
    const springY = useSpring(touchY, springConfig);

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!containerRef.current) return;
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        const x = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        touchX.set(x * 20);
        touchY.set(y * 20);
    };

    const handleTouchEnd = () => {
        touchX.set(0);
        touchY.set(0);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={containerRef}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative min-h-dvh w-full bg-black overflow-hidden flex flex-col justify-between items-center px-5 pt-16 pb-8 text-white select-none"
        >
            {/* LAYER 0: hero.png Background with Parallax & Dark Gradient Overlays */}
            <motion.div
                style={{ y: yBg, scale: scaleBg }}
                className="absolute inset-0 z-0 w-full h-full pointer-events-none"
            >
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat -mt-20 opacity-60 mix-blend-luminosity scale-110 z-5"
                    style={{ backgroundImage: 'url("/hero.png")' }}
                />
            </motion.div>


            {/* Grid Overlay */}
            <div
                className="absolute inset-0 pointer-events-none -z-1 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(210, 255, 0, 0.12) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(210, 255, 0, 0.12) 1px, transparent 1px)
                    `,
                    backgroundSize: "36px 36px",
                }}
            />

            {/* Floating Micro Tech Pills */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-3 px-2.5 py-1 rounded-full bg-black/60 border border-neon-lime/30 text-[10px] font-mono text-neon-lime backdrop-blur-md shadow-lg"
                >
                    ⚡ React & Next.js
                </motion.div>

                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-76 right-3 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] font-mono text-white/90 backdrop-blur-md shadow-lg"
                >
                    🎨 GSAP & Motion
                </motion.div>

                {/* <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-40 left-4 px-2.5 py-1 rounded-full bg-black/60 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 backdrop-blur-md shadow-lg"
                >
                    🚀 TypeScript
                </motion.div> */}
            </motion.div>


            {/* MAIN CONTENT AREA */}
            <div className="relative z-20 w-full max-w-sm flex flex-col items-center text-center mt-80">

                {/* NAME & TYPOGRAPHY WITH SCROLL TRANSFORM */}
                <motion.div style={{ y: yText, opacity: opacityText }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col items-center justify-center leading-none tracking-tight mb-2"
                    >
                        <span className="text-4xl font-black text-white tracking-tighter font-syne drop-shadow-lg">
                            RANJITH
                        </span>
                        <span className="text-4xl font-bold text-neon-lime tracking-widest -mt-1 font-syne drop-shadow-[0_0_25px_rgba(210,255,0,0.45)]">
                            BABU
                        </span>
                    </motion.h1>

                    {/* DYNAMIC ROTATING ROLE PILL */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="h-7 mb-3 flex items-center justify-center"
                    >
                        <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono text-white/90 flex items-center gap-2">
                            <Terminal size={12} className="text-neon-lime" />
                            <motion.span
                                key={currentRoleIndex}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.3 }}
                                className="font-medium text-neon-lime"
                            >
                                {roles[currentRoleIndex]}
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* BIO TAGLINE */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="text-xs sm:text-sm text-neutral-300 max-w-72 leading-relaxed mb-5 font-sans font-normal"
                    >
                        Building modern web applications, interactive interfaces, and high-performance digital products.
                    </motion.p>
                </motion.div>

                {/* TOUCH ACTION BUTTONS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex flex-row items-center justify-center gap-3 w-full"
                >
                    <button
                        onClick={() => scrollToSection("work")}
                        className="flex-1 py-3 px-4 rounded-full bg-neon-lime hover:bg-neon-lime-hover text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-lg shadow-neon-lime/25 active:scale-95 transition-all cursor-pointer border border-neon-lime"
                    >
                        <span>View Work</span>
                        <ArrowUpRight size={16} />
                    </button>

                    <button
                        onClick={() => scrollToSection("contact")}
                        className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 backdrop-blur-md active:scale-95 transition-all cursor-pointer"
                    >
                        <Mail size={14} className="text-neon-lime" />
                        <span>Let's Talk</span>
                    </button>
                </motion.div>
            </div>

            {/* BOTTOM STATS & SCROLL PROMPT */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="relative z-20 w-full max-w-sm flex flex-col items-center gap-3 mt-3"
            >

                {/* Bouncing Scroll Down Trigger */}
                <button
                    onClick={() => scrollToSection("about")}
                    className="flex items-center gap-1.5 text-neutral-400 hover:text-neon-lime transition-colors py-1 cursor-pointer group"
                >
                    <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-neon-lime transition-colors">
                        Scroll to explore
                    </span>
                    <ArrowDown size={14} className="animate-bounce text-neon-lime" />
                </button>
            </motion.div>

            <style jsx>{`
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spinSlow 12s linear infinite;
                }
            `}</style>
        </section>
    );
}
