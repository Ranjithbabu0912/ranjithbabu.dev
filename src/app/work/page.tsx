"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsList from "@/components/sections/Projects";
import { useState, useEffect } from "react";
import { projects } from "@/data/projects";

const SimpleProjectCard = ({ project, index }: { project: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-card-dark border border-white/10"
        >
            <Link href={`/work/${project.id}`} className="block w-full h-full">
                {/* Image */}
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end">
                        <div className="text-left">
                            <p className="text-neon-lime text-xs font-mono uppercase tracking-wider mb-1">{project.category}</p>
                            <h3 className="text-2xl font-bold font-display text-white">{project.title}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState('list');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load preference from localStorage on mount
        const savedMode = localStorage.getItem('viewMode');
        if (savedMode) {
            setViewMode(savedMode);
        }
        setIsLoaded(true);
    }, []);

    const changeView = (mode: string) => {
        setViewMode(mode);
        localStorage.setItem('viewMode', mode);
    };

    // Prevent hydration mismatch by rendering a loader or nothing until client-side code runs
    if (!isLoaded) return null;

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
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

            <div className="pt-32 pb-24 px-6 md:px-12 relative z-10 w-full">
                <div className="max-w-[1400px] mx-auto w-full">

                    {/* Page Header with Toggle */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight">
                                My <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-lime to-emerald-400">Works</span>
                            </h1>
                            <p className="text-xl text-white/50 leading-relaxed max-w-xl">
                                Curated selection of experiments in <span className="text-white">logic</span> and <span className="text-white">aesthetics</span>.
                            </p>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
                            <button
                                onClick={() => changeView('list')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold uppercase tracking-wider ${viewMode === 'list' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(210,255,0,0.3)]' : 'text-white/50 hover:text-white'}`}
                                aria-label="List View"
                            >
                                <List size={16} /> List
                            </button>
                            <button
                                onClick={() => changeView('grid')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold uppercase tracking-wider ${viewMode === 'grid' ? 'bg-neon-lime text-black shadow-[0_0_15px_rgba(210,255,0,0.3)]' : 'text-white/50 hover:text-white'}`}
                                aria-label="Grid View"
                            >
                                <LayoutGrid size={16} /> Grid
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <AnimatePresence mode="wait">
                        {viewMode === 'grid' ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                            >
                                {projects.map((project, index) => (
                                    <SimpleProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full"
                            >
                                <div className="-mx-6 md:-mx-12">
                                    <ProjectsList />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>

            <Footer />
        </main>
    );
}
