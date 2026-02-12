"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', href: '/' },
        { name: 'About', href: 'about' },
        { name: 'Projects', href: 'work' },
        { name: 'Contact', href: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            console.log("Navbar: closed");
        }
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 md:px-12 md:py-6 text-lime-500 transition-all duration-300 ${isScrolled || isOpen
                ? 'bg-background/80 backdrop-blur-sm border-b border-black/10'
                : 'bg-transparent'
                }`}>

                {/* Logo */}
                <Link href="/" className={`relative z-50 text-2xl font-display font-bold tracking-tight uppercase hover:text-white transition-colors ${isScrolled || isOpen
                    ? 'text-neon-lime'
                    : 'text-lime-900'
                    }`}>
                    RB.
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-xs uppercase tracking-[0.2em] font-bold transition-all font-body cursor-pointer relative group
                                ${isScrolled || isOpen
                                    ? 'text-neon-lime'
                                    : 'text-lime-900'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-1 ${isScrolled || isOpen
                                ? 'bg-neon-lime'
                                : 'bg-lime-900'
                                } transition-all duration-300 group-hover:w-full`} />
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-lime-500 relative z-50 hover:text-black transition-colors p-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8 w-full px-6">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="w-full text-center"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-4xl font-display font-bold uppercase tracking-wider text-lime-500 hover:text-white transition-all py-2"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Social Links or Extra Info for Mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 text-white/40 text-xs font-mono"
                        >
                            © 2026 RB. ALL RIGHTS RESERVED.
                        </motion.div>

                        {/* Decorative Background Elements */}
                        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-lime/5 rounded-full blur-[100px]" />
                            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
