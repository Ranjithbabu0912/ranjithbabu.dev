"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { GraduationCap, Code2, Rocket, Star, Heart, Coffee, BookOpen, Music } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Skills from "@/components/sections/Skills";

// --- Components ---

const TimelineItem = ({ year, title, description, icon: Icon, index, text }: any) => (
    <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={`flex flex-col md:flex-row gap-8 items-center mb-16 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
    >
        <div className="w-full md:w-1/2 flex justify-center md:justify-end px-8">
            <div className={`text-center ${index % 2 !== 0 ? "md:text-left" : "md:text-right"}`}>
                <span className="text-neon-lime font-mono text-xl font-bold block mb-2">{year}</span>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-white/60 leading-relaxed">{description}</p>
            </div>
        </div>

        <div className="relative flex items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full bg-card-dark border border-neon-lime text-neon-lime flex items-center justify-center shadow-[0_0_20px_rgba(190,242,100,0.3)]">
                <Icon size={20} />
            </div>
            {/* Connecting Line (visual only, absolute) */}
            <div className="absolute top-12 -bottom-16 w-px bg-white/10 -z-10 h-32 md:h-24" />
        </div>

        <div className="w-full md:w-1/2 px-8 hidden md:block" /> { /* Spacer */}
    </motion.div>
);


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
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <main ref={containerRef} className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navbar />


            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(190,242,100,0.03),transparent_70%)]" />
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }} />
            </div>



            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-center">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-linear-gradient-to-r from-neon-lime to-cyan-400 rounded-4xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10"
                        >
                            <Image
                                src="/about.jpg"
                                alt="Ranjith Babu"
                                fill
                                className="object-cover object-right transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                                priority
                            />

                            {/* Overlay Text */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-gradient-to-t from-black/90 to-transparent">
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
                                    <Coffee size={16} /> <span>Fuel: Tea/Coffee</span>
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
            <section className="py-24 px-6 relative bg-white/2">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">My <span className="text-neon-lime">Journey</span></h2>
                        <p className="text-white/50">The path that led me here.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Central Line */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute left-1/2 top-0 w-px bg-white/5 -translate-x-1/2 hidden md:block"
                        />

                        <TimelineItem
                            year="2021"
                            title="The Beginning"
                            description="Started my B.Com with Computer Application. Wrote my first line of code and realized the power of creating something from nothing."
                            icon={Star}
                            index={0}
                        />
                        <TimelineItem
                            year="2022"
                            title="Web Discovery"
                            description="Deep dived into HTML, CSS, and JavaScript. Built my first static websites and discovered a passion for UI/UX design."
                            icon={Code2}
                            index={1}
                        />
                        <TimelineItem
                            year="2023"
                            title="Full Stack Evolution"
                            description="Mastered React.js and the MERN stack. Built 'eFoods', my first major full-stack application, learning database architecture and API design."
                            icon={Rocket}
                            index={2}
                        />
                        <TimelineItem
                            year="2024 - Present"
                            title="AI & Innovation"
                            description="Integrating AI into applications. Built 'SmartScholar AI' and exploring 3D web experiences with Three.js. Pushing boundaries every day."
                            icon={Heart}
                            index={3}
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
                            { name: "TypeScript", level: 90 },
                            { name: "Tailwind CSS & UI/UX", level: 92 },
                            { name: "Database (SQL/NoSQL)", level: 80 },
                            { name: "Three.js / Animations", level: 75 }
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
