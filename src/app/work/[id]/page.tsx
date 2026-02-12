"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProjectDetail() {
    const params = useParams();
    const id = params.id as string;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/work" className="text-neon-lime hover:underline">Back to Works</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className={`absolute top-0 right-0 w-[50%] h-[50%] bg-linear-to-b ${project.color} opacity-10 blur-[150px]`} />
            </div>

            <article className="pt-32 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12">

                    {/* Back Link */}
                    <div className="mb-12">
                        <Link href="/work" className="inline-flex items-center gap-2 text-white/50 hover:text-neon-lime transition-colors group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Works
                        </Link>
                    </div>

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 items-end">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-neon-lime/10 text-neon-lime rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-neon-lime/20">
                                    {project.category}
                                </span>
                                <span className="text-white/40 font-mono text-sm">{project.year}</span>
                                <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/70 uppercase font-bold">{project.status}</span>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
                            >
                                {project.title}
                            </motion.h1>

                            <p className="text-xl text-white/60 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 lg:items-end">
                            <div className="flex gap-4">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-neon-lime text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2"
                                >
                                    Visit Website <ArrowUpRight size={20} />
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <Github size={20} /> Code
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-24 group"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    </motion.div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">

                        {/* Left Col: Stack */}
                        <div className="col-span-1">
                            <h3 className="text-2xl font-display font-bold text-white mb-8">Technology Stack</h3>
                            <div className="flex flex-col gap-3">
                                {project.tech.map((t: string) => (
                                    <div key={t} className="flex items-center gap-3 text-white/70 border-b border-white/5 pb-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Col: Features & Story */}
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-display font-bold text-white mb-8">Key Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                {project.features.map((f: string, i: number) => (
                                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                        <Zap className="text-neon-lime mb-4" size={24} />
                                        <h4 className="text-white font-bold mb-2">{f}</h4>
                                        <p className="text-white/50 text-sm">Implemented using advanced techniques ensures optimal performance and user experience.</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-card-dark p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-4">About the Development</h3>
                                <p className="text-white/60 leading-relaxed mb-6">
                                    Building {project.title} challenged me to explore new frontiers in {project.category.split('•')[0]}.
                                    I focused heavily on creating a seamless user interface while ensuring the backend could scale efficiently.
                                    One of the main technical hurdles was optimizing the performance, which I solved by implementing advanced caching and lazy loading strategies.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </article>

            <Footer />
        </main>
    );
}
