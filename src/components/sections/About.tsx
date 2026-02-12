"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Code2, Sparkles, Zap, Rocket, Terminal, Star, Briefcase, Layers } from "lucide-react";

// Animated Counter Component
const Counter = ({ value, suffix = "", prefix = "" }: { value: string | number, suffix?: string, prefix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 200 });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            // Parse numeric part
            const numericValue = parseInt(value.toString().replace(/[^0-9]/g, "")) || 0;
            if (value.toString().includes("∞")) {
                return;
            }
            motionValue.set(numericValue);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current && !value.toString().includes("∞")) {
                ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
            }
        });
    }, [springValue, prefix, suffix, value]);

    if (value.toString().includes("∞")) return <span className="font-display font-bold">∞</span>;

    return <span ref={ref} className="font-display font-bold" />;
};

// Data Visual Components
const ExperienceVisual = () => (
    <div className="flex items-end gap-[2px] h-8 opacity-50">
        {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-1 bg-neon-lime/40 rounded-t-sm"
            />
        ))}
    </div>
);

const ProjectsVisual = () => (
    <div className="grid grid-cols-3 gap-1 opacity-50">
        {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`w-1.5 h-1.5 rounded-full ${i < 6 ? "bg-neon-lime" : "bg-white/10"}`}
            />
        ))}
    </div>
);

const SatisfactionVisual = () => (
    <div className="relative w-8 h-8 opacity-80">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
                className="text-white/10"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
            />
            <motion.path
                className="text-neon-lime drop-shadow-[0_0_5px_rgba(210,255,0,0.5)]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="100, 100"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            />
        </svg>
    </div>
);

const CodeVisual = () => (
    <div className="relative h-8 w-12 overflow-hidden opacity-40 mask-linear-fade">
        <motion.div
            animate={{ y: [0, -40] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="font-mono text-[6px] text-neon-lime leading-tight whitespace-pre"
        >
            {`const f = () => {
 return true;
};
if(x) run();
const f = () => {
 return true;
};
if(x) run();
const f = () => {
 return true;
};
if(x) run();`}
        </motion.div>
    </div>
);

const StatCard = ({ stat, index }: { stat: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 * index, duration: 0.6 }}
        className="group relative overflow-hidden p-6 bg-card-dark/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-neon-lime/30 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(210,255,0,0.1)] flex flex-col justify-between h-[160px]"
    >
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-neon-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start">
            <div className="p-2 rounded-lg bg-white/5 text-neon-lime group-hover:scale-110 transition-transform duration-300">
                <stat.icon size={20} />
            </div>
            {stat.visual}
        </div>

        <div className="relative z-10 mt-4">
            <h3 className="flex items-baseline gap-1 text-3xl md:text-4xl font-display font-bold text-white mb-1 group-hover:text-neon-lime transition-colors duration-300">
                <Counter value={stat.value} suffix={stat.suffix} />
            </h3>
            <p className="text-white/60 text-xs font-mono uppercase tracking-wider group-hover:text-white/80 transition-colors">
                {stat.label}
            </p>
        </div>
    </motion.div>
);

export default function About() {
    const stats = [
        {
            value: "2",
            suffix: "+",
            label: "Years Experience",
            icon: Briefcase,
            visual: <ExperienceVisual />
        },
        {
            value: "8",
            suffix: "+",
            label: "Projects Delivered",
            icon: Layers,
            visual: <ProjectsVisual />
        },
        {
            value: "100",
            suffix: "%",
            label: "Client Satisfaction",
            icon: Star,
            visual: <SatisfactionVisual />
        },
        {
            value: "∞",
            suffix: "",
            label: "Lines of Code",
            icon: Terminal,
            visual: <CodeVisual />
        }
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-white/5 relative overflow-hidden">


            {/* Background Animations */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-lime/5 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] mix-blend-screen"
                />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-neon-lime/10 border border-neon-lime/20 rounded-full mb-6"
                    >
                        <Sparkles size={16} className="text-neon-lime" />
                        <span className="text-neon-lime text-sm font-mono uppercase tracking-wider shadow-[0_0_10px_rgba(210,255,0,0.3)]">About Me</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                        Crafting Digital <br />
                        <span className="relative">
                            <span className="text-neon-lime drop-shadow-[0_0_15px_rgba(210,255,0,0.2)]">Experiences</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-1 bg-neon-lime"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            />
                        </span> That Matter
                    </h2>

                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                        I'm <span className="text-white font-semibold">Ranjith Babu</span>, a full-stack developer who believes
                        that great code is invisible—what matters is the experience it creates.
                    </p>

                    <p className="text-white/60 text-base leading-relaxed mb-8">
                        From pixel-perfect interfaces to scalable backends, I build products that blend
                        <span className="text-neon-lime font-medium"> performance</span>,
                        <span className="text-neon-lime font-medium"> design</span>, and
                        <span className="text-neon-lime font-medium"> innovation</span>.
                    </p>

                    {/* Quick highlights */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { icon: Code2, text: "Clean Code" },
                            { icon: Zap, text: "Fast Performance" },
                            { icon: Rocket, text: "Modern Stack" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-neon-lime/30 transition-all hover:bg-neon-lime/5 cursor-default hover:scale-105"
                            >
                                <item.icon size={16} className="text-neon-lime" />
                                <span className="text-white/80 text-sm font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Data Visual Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:ml-12">
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} index={i} />
                    ))}

                    {/* Floating Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="col-span-2 text-center mt-4"
                    >
                        <p className="text-white/30 text-xs font-mono italic">
                            &lt; Code is poetry written in logic /&gt;
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
