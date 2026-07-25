"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { GraduationCap, Code2, Rocket, Star, Heart, Coffee, BookOpen, Music, Sparkles, TrendingUp, Briefcase } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Skills from "@/components/sections/Skills";

// --- Components ---

interface TimelineItemProps {
    year: string;
    title: string;
    subtitle?: string;
    description: string;
    tags?: string[];
    status?: string;
    icon: any;
    index: number;
}

const TimelineItem = ({ year, title, subtitle, description, tags = [], status, icon: Icon, index }: TimelineItemProps) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center mb-14 md:mb-20 ${
                isEven ? "md:flex-row-reverse" : ""
            }`}
        >
            {/* Timeline Card Container */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
                <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className={`relative p-6 sm:p-8 rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-neon-lime/40 backdrop-blur-xl shadow-2xl transition-all duration-300 group ${
                        isEven ? "md:text-right" : "md:text-left"
                    }`}
                >
                    {/* Glowing Aura Hover Effect */}
                    <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-neon-lime/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-3">
                        {/* Header Badges */}
                        <div className={`flex items-center gap-2.5 flex-wrap ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                            <span className="px-3 py-1 rounded-full bg-neon-lime/10 border border-neon-lime/30 text-neon-lime font-mono text-xs font-bold shadow-sm shadow-neon-lime/10">
                                {year}
                            </span>
                            {status && (
                                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono text-white/70">
                                    {status}
                                </span>
                            )}
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white group-hover:text-neon-lime transition-colors">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="text-xs font-mono text-white/50 uppercase tracking-widest mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                            {description}
                        </p>

                        {/* Tech & Milestone Pills */}
                        {tags.length > 0 && (
                            <div className={`flex flex-wrap gap-1.5 pt-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-neutral-400 group-hover:border-neon-lime/20 group-hover:text-white transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Central Node Circle & Icon */}
            <div className="absolute left-0 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                <div className="relative group/node">
                    <div className="absolute -inset-2 rounded-full bg-neon-lime/30 opacity-75 blur-md group-hover/node:opacity-100 transition-opacity animate-pulse" />
                    <div className="relative w-11 h-11 rounded-full bg-black border-2 border-neon-lime text-neon-lime flex items-center justify-center shadow-[0_0_20px_rgba(210,255,0,0.4)] group-hover/node:scale-110 transition-transform">
                        <Icon size={18} />
                    </div>
                </div>
            </div>

            {/* Empty Spacer for Desktop Layout */}
            <div className="w-full md:w-1/2 hidden md:block" />
        </motion.div>
    );
};


const EducationCard = () => (
    <motion.div
        whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
        className="relative overflow-hidden p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group"
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap size={120} />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
            {/* Master's Degree */}
            <div>
                <span className="inline-block px-3 py-1 bg-neon-lime/10 text-neon-lime text-xs font-mono rounded-full mb-3">
                    Present
                </span>
                <h3 className="text-2xl font-display font-bold mb-1">Master of Computer Applications</h3>
                <p className="text-white/60 text-sm font-mono uppercase tracking-widest">Pursuing</p>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* Bachelor's Degree */}
            <div>
                <span className="inline-block px-3 py-1 bg-white/10 text-white/60 text-xs font-mono rounded-full mb-3">
                    2021 - 2024
                </span>
                <h3 className="text-xl font-display font-bold mb-1">B.Com with Computer Application</h3>
                <p className="text-white/50 text-sm font-mono uppercase tracking-widest mb-4">Undergraduate</p>

                <div className="flex gap-2 flex-wrap">
                    {["Commerce", "Computer Applications", "Accounting", "Web Basics"].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-white/40 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

export default function AboutPage() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);

    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const imageY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
    const imageScale = useTransform(heroScroll, [0, 1], [1.1, 1.25]);

    return (
        <main ref={containerRef} className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />


            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-linear(circle_at_50%_50%,rgba(190,242,100,0.03),transparent_70%)]" />
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-linear(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-linear(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }} />
            </div>



            {/* --- Hero Section --- */}
            <section ref={heroRef} className="relative pt-32 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-center">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4  bg-linear-to-r from-neon-lime to-cyan-400 rounded-4xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative h-120 md:h-140 w-full md:w-[85%] md:ml-20 rounded-2xl overflow-hidden border border-white/10"
                        >
                            {/* Parallax Image Container */}
                            <motion.div
                                style={{ y: imageY, scale: imageScale }}
                                className="absolute -top-[5%] -bottom-[5%] md:top-0 md:bottom-0 inset-x-0 w-full h-[100%] "
                            >
                                <Image
                                    src="/about.jpg"
                                    alt="Ranjith Babu"
                                    fill
                                    className="object-cover object-center transition-all duration-700 saturate-0 group-hover:saturate-100"
                                    priority
                                />
                            </motion.div>

                            {/* Overlay Text */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/90 to-transparent z-10">
                                <p className="font-mono text-neon-lime text-sm mb-2">/ THE CREATOR</p>
                                <h2 className="text-white text-3xl font-display font-bold uppercase">Ranjith Babu</h2>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Side */}
                    <div className="order-1 lg:order-2">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
                            >
                                Beyond the <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-lime to-emerald-400">Code.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl text-white/70 leading-relaxed mb-8"
                            >
                                I'm not just a developer; I'm a <span className="text-white">digital architect</span> obsessed with the space where logic meets creativity.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-white/60 mb-8 leading-relaxed"
                            >
                                My journey started with a simple curiosity: "How do things work?" That question led me from breaking toys to building complex full-stack applications. Today, I build standard-setting digital experiences that are fast, accessible, and visually stunning.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex gap-4"
                            >
                                <div className="flex items-center gap-2 text-sm font-mono text-neon-lime">
                                    <Coffee size={16} /> <span>Fuel: Tea</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-mono text-cyan-400">
                                    <BookOpen size={16} /> <span>Learning: Always</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-mono text-orange-400">
                                    <Music size={16} /> <span>Music: Always</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Journey Timeline --- */}
            <section className="py-28 px-4 sm:px-6 relative bg-linear-to-b from-black via-white/2 to-black">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-neon-lime/10 border border-neon-lime/30 text-neon-lime font-mono text-xs font-semibold uppercase tracking-widest mb-3">
                            Evolution & Milestones
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight">
                            My <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-lime via-emerald-400 to-lime-200">Journey</span>
                        </h2>
                        <p className="text-white/60 text-base max-w-md mx-auto">
                            Key milestones, skills unlocked, and projects built along the path.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Static Spine Track */}
                        <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-0.5 bg-white/10 -translate-x-1/2" />

                        <TimelineItem
                            year="2021"
                            title="The Beginning"
                            subtitle="Foundation & Passion"
                            description="Started my B.Com with Computer Application. Wrote my first line of code and realized the power of transforming ideas into digital reality."
                            tags={["C/C++", "Logic & Algorithms", "Web Basics"]}
                            status="Milestone Unlocked"
                            icon={Star}
                            index={0}
                        />

                        <TimelineItem
                            year="2022"
                            title="Web Discovery & Design"
                            subtitle="Frontend Engineering"
                            description="Deep dived into HTML5, CSS3, and JavaScript (ES6+). Built responsive static websites and discovered a strong passion for sleek UI/UX design."
                            tags={["HTML5 & CSS3", "JavaScript", "Responsive UI", "Figma"]}
                            status="Milestone Unlocked"
                            icon={Code2}
                            index={1}
                        />

                        <TimelineItem
                            year="2023"
                            title="Full Stack Evolution"
                            subtitle="MERN & Architecture"
                            description="Mastered React.js and the MERN stack. Built 'eFoods', my first major full-stack production application, designing custom API layers and database schemas."
                            tags={["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"]}
                            status="Milestone Unlocked"
                            icon={Rocket}
                            index={2}
                        />

                        <TimelineItem
                            year="2024 - 2025"
                            title="AI & Next-Gen Web"
                            subtitle="Modern Ecosystem"
                            description="Integrating AI into web applications. Built 'SmartScholar AI' and exploring 3D interactive web experiences with Next.js, Framer Motion, and GSAP."
                            tags={["Next.js", "TypeScript", "AI Integration", "GSAP & Motion", "Tailwind CSS"]}
                            status="Milestone Unlocked"
                            icon={Sparkles}
                            index={3}
                        />

                        <TimelineItem
                            year="2025 - Present"
                            title="Freelancer"
                            subtitle="Web Designer & Developer"
                            description="Building responsive and user-friendly websites for clients. Specializing in modern web technologies and design trends."
                            tags={["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"]}
                            status="Current Focus"
                            icon={TrendingUp}
                            index={4}
                        />
                    </div>
                </div>
            </section>

            {/* --- Education & Philosophy Grid --- */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Education */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-display font-bold mb-8 flex items-center gap-3"
                        >
                            <GraduationCap className="text-neon-lime" /> Education
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <EducationCard />
                        </motion.div>
                    </div>

                    {/* Philosophy / About Me details */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-display font-bold mb-8 flex items-center gap-3"
                        >
                            <Star className="text-neon-lime" /> What Drives Me
                        </motion.h2>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { title: "User-Centric", desc: "I build for people, not just browsers. Experience comes first." },
                                { title: "Performance", desc: "Fast load times and smooth interactions are non-negotiable." },
                                { title: "Clean Code", desc: "Maintainable, scalable, and readable codebases are my signature." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-neon-lime/30 transition-colors"
                                >
                                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Technical Proficiency (Percentages) --- */}
            <section className="py-24 px-6 bg-card-dark/40 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Top Technical <span className="text-neon-lime">Proficiency</span></h2>
                        <p className="text-white/50">My core strengths and expertise levels.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {[
                            { name: "React / Next.js", level: 95 },
                            { name: "Node.js / Express", level: 85 },
                            // { name: "TypeScript", level: 90 },
                            { name: "Tailwind CSS & UI/UX", level: 92 },
                            { name: "Database (SQL/NoSQL)", level: 80 },
                            // { name: "Three.js / Animations", level: 75 }
                        ].map((skill, index) => (
                            <div key={index} className="mb-2">
                                <div className="flex justify-between mb-2 text-sm font-mono uppercase tracking-wider">
                                    <span className="text-white">{skill.name}</span>
                                    <span className="text-neon-lime">{skill.level}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                                        className="absolute top-0 left-0 h-full bg-neon-lime shadow-[0_0_10px_rgba(190,242,100,0.5)] rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
