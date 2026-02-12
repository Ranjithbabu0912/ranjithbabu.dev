"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    Server, Database, Cloud, Bot, Mail, FileText, Table,
    Smartphone, Layers, Box, Globe, PenTool,
    GitBranch, Rocket, Calendar,
    Wand2, Code, Palette, Zap
} from "lucide-react";

// --- Custom Brand Icons ---
const BrandIcon = ({ path, className, size = 24 }: { path: string, className?: string, size?: number | string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d={path} />
    </svg>
);

const ReactIcon = ({ className, size = 24 }: { className?: string; size?: number | string }) => (
    <svg width={size} height={size} viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
    </svg>
);

// Simple paths for common brands
const brandPaths = {
    js: "m17 10v2a1 1 0 00-3 0l3 2a1 1 0 011 1 1 1 0 01-5 1h1a1 1 0 003-1l-4-2a1 1 0 014-3M9 9h2v7a1 1 0 01-5-1h1a1 1 0 003 1L9 9M0 0V20H21V0H0",
    googleApps: "M14.7 9.8L12.5 4.5L10.3 9.8L3.5 21H21.5L14.7 9.8ZM12.5 7.5L13.7 10.5H11.3L12.5 7.5Z", // Abstract A
};




// --- Skill Data ---
type SkillCategory = "Code" | "Database" | "Cloud" | "Strategy";

interface Skill {
    name: string;
    icon: any;
    category: SkillCategory;
    isBrand?: boolean;
    brandPath?: string;
}

const skills: Skill[] = [
    // Development (Code)
    { name: "HTML5", icon: Code, category: "Code" },
    { name: "CSS3", icon: Palette, category: "Code" },
    { name: "JavaScript", icon: null, category: "Code", isBrand: true, brandPath: brandPaths.js },
    { name: "React.js", icon: ReactIcon, category: "Code" },
    { name: "Context API", icon: Box, category: "Code" }, // Box represents state container
    { name: "Node.js", icon: Server, category: "Code" },
    { name: "Express.js", icon: Zap, category: "Code" }, // Zap for speed/middleware
    { name: "MERN Stack", icon: Layers, category: "Code" },
    { name: "REST API", icon: Globe, category: "Code" },
    { name: "Responsive", icon: Smartphone, category: "Code" },

    // Database
    { name: "MongoDB", icon: Database, category: "Database" },
    { name: "MySQL", icon: Database, category: "Database" },
    { name: "PostgreSQL", icon: Database, category: "Database" },

    // Automation & Cloud (Cloud)
    { name: "Apps Script", icon: null, category: "Cloud", isBrand: true, brandPath: brandPaths.googleApps },
    { name: "Forms Auto", icon: Wand2, category: "Cloud" },
    { name: "Sheets Integration", icon: Table, category: "Cloud" },
    { name: "Email Systems", icon: Mail, category: "Cloud" },
    { name: "Deployment", icon: Cloud, category: "Cloud" },
    { name: "GitHub", icon: GitBranch, category: "Cloud" },

    // Strategy & Design (Strategy)
    { name: "AI Prompts", icon: Bot, category: "Strategy" },
    { name: "SaaS Dev", icon: Rocket, category: "Strategy" },
    { name: "Project Mgmt", icon: Calendar, category: "Strategy" },
    { name: "UI/UX Basics", icon: PenTool, category: "Strategy" },
];

const categories: SkillCategory[] = ["Code", "Database", "Cloud", "Strategy"];

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");

    const filteredSkills = skills.filter(skill =>
        activeCategory === "All" ? true : skill.category === activeCategory
    );

    return (
        <section className="py-20 px-6 md:px-12 bg-background relative overflow-hidden">


            <div className="max-w-6xl mx-auto relative z-10 w-full">

                {/* Compact Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div className="text-left">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
                            <span className="text-neon-lime">Tech</span> Stack
                        </h2>
                        <p className="text-white/50 text-sm max-w-sm">
                            Curated tools for building digital experiences.
                        </p>
                    </div>

                    {/* Compact Filter Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {["All", ...categories].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat as any)}
                                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${activeCategory === cat
                                    ? "bg-neon-lime text-background border-neon-lime font-bold shadow-[0_0_15px_rgba(210,255,0,0.3)]"
                                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Compact Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill) => (
                            <motion.div
                                layout
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="group"
                            >
                                <div className="h-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-white/10 hover:border-neon-lime/30 hover:-translate-y-1 hover:shadow-[0_4px_20px_-10px_rgba(210,255,0,0.1)] cursor-default overflow-hidden relative">

                                    {/* Icon */}
                                    <div className="text-white/40 group-hover:text-neon-lime transition-colors duration-300 z-10">
                                        {skill.isBrand && skill.brandPath ? (
                                            <BrandIcon path={skill.brandPath} size={24} />
                                        ) : skill.icon ? (
                                            <skill.icon size={24} />
                                        ) : null}
                                    </div>

                                    {/* Text */}
                                    <div className="text-center z-10">
                                        <h3 className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors leading-tight">
                                            {skill.name}
                                        </h3>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-linear-to-tr from-neon-lime/0 via-neon-lime/0 to-neon-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}
