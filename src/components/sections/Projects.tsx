"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import Link from "next/link";
import { projects } from "@/data/projects";
import type { Variants } from "framer-motion";

const scaleAnimation: Variants = {
    initial: {
        scale: 0,
        x: "-50%",
        y: "-50%",
    },

    enter: {
        scale: 1,
        x: "-50%",
        y: "-50%",
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
        },
    },

    closed: {
        scale: 0,
        x: "-50%",
        y: "-50%",
        transition: {
            duration: 0.4,
            ease: [0.32, 0, 0.67, 0],
        },
    },
};


// Helper
const indexToTop = (index: number) => {
    return `-${index * 100}%`;
};

export default function Projects() {
    const [modal, setModal] = useState({ active: false, index: 0 });

    const modalContainer = useRef<HTMLDivElement | null>(null);
    const cursorLabel = useRef<HTMLDivElement | null>(null);

    // GSAP refs
    const xMoveContainer = useRef<any>(null);
    const yMoveContainer = useRef<any>(null);
    const xMoveCursor = useRef<any>(null);
    const yMoveCursor = useRef<any>(null);

    // Initialize GSAP safely
    useLayoutEffect(() => {
        if (!modalContainer.current || !cursorLabel.current) return;

        xMoveContainer.current = gsap.quickTo(
            modalContainer.current,
            "left",
            { duration: 0.8, ease: "power3" }
        );

        yMoveContainer.current = gsap.quickTo(
            modalContainer.current,
            "top",
            { duration: 0.8, ease: "power3" }
        );

        xMoveCursor.current = gsap.quickTo(
            cursorLabel.current,
            "left",
            { duration: 0.45, ease: "power3" }
        );

        yMoveCursor.current = gsap.quickTo(
            cursorLabel.current,
            "top",
            { duration: 0.45, ease: "power3" }
        );

    }, []);

    // Move handler with safety check
    const moveItems = (x: number, y: number) => {
        if (!xMoveContainer.current) return;

        xMoveContainer.current(x);
        yMoveContainer.current(y);
        xMoveCursor.current(x);
        yMoveCursor.current(y);
    };

    const manageModal = (
        active: boolean,
        index: number,
        x: number,
        y: number
    ) => {
        moveItems(x, y);
        setModal({ active, index });
    };

    return (
        <section
            id="work"
            className="relative py-20 px-4 md:px-12 bg-background overflow-hidden"
            onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
        >
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
                    <h2 className="text-4xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter">
                        Selected <span className="text-neon-lime">Works</span>
                    </h2>

                    <p className="text-white/40 font-mono mt-4 md:mt-0">
                        ( {projects.length} ) Projects Listed
                    </p>
                </div>

                {/* List */}
                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <ProjectItem
                            key={project.id}
                            id={project.id}
                            index={index}
                            title={project.title}
                            category={project.category}
                            year={project.year}
                            manageModal={manageModal}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Modal */}
            <>
                <motion.div
                    ref={modalContainer}
                    variants={scaleAnimation}
                    initial="initial"
                    animate={modal.active ? "enter" : "closed"}
                    className="fixed top-0 left-0 h-[300px] w-[400px] md:h-[250px] md:w-[450px] bg-white pointer-events-none overflow-hidden z-50 hidden md:flex items-center justify-center rounded-lg"
                    style={{ transform: "translate(-50%, -50%)" }}
                >
                    <div
                        style={{ top: indexToTop(modal.index) }}
                        className="relative h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    >
                        {projects.map((project, index) => (
                            <div
                                key={`modal_${index}`}
                                className="h-full w-full flex items-center justify-center bg-card-dark"
                            >
                                <Image
                                    src={project.image}
                                    width={450}
                                    height={250}
                                    alt="image"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Cursor */}
                <motion.div
                    ref={cursorLabel}
                    variants={scaleAnimation}
                    initial="initial"
                    animate={modal.active ? "enter" : "closed"}
                    className="fixed top-0 left-0 w-20 h-20 rounded-full bg-neon-lime text-black pointer-events-none z-50 items-center justify-center font-bold font-display uppercase text-sm hidden md:flex"
                    style={{ transform: "translate(-50%, -50%)" }}
                >
                    View
                </motion.div>
            </>
        </section>
    );
}

function ProjectItem({
    index,
    title,
    category,
    year,
    manageModal,
    id,
}: any) {
    return (
        <Link
            href={`/work/${id}`}
            className="group flex flex-col md:flex-row justify-between items-center py-10 border-b border-white/10 hover:border-neon-lime/50 transition-colors duration-300 w-full cursor-pointer"
            onMouseEnter={(e) =>
                manageModal(true, index, e.clientX, e.clientY)
            }
            onMouseLeave={(e) =>
                manageModal(false, index, e.clientX, e.clientY)
            }
        >
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 w-full">
                <h3 className="text-3xl md:text-6xl font-display font-bold text-white group-hover:-translate-x-2 group-hover:text-white/40 transition-all duration-300">
                    {title}
                </h3>

                <span className="text-neon-lime font-mono text-xs md:text-sm bg-neon-lime/10 px-2 py-1 rounded inline-block w-fit">
                    {category}
                </span>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-8">
                <span className="text-white/40 font-mono group-hover:text-white transition-colors">
                    {year}
                </span>

                <span className="text-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300">
                    <ArrowUpRight size={28} />
                </span>
            </div>
        </Link>
    );
}
