"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, Instagram } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-lime/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-display font-bold mb-8"
                >
                    Let's Work <span className="text-neon-lime">Together</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-white/60 text-xl mb-12 max-w-2xl mx-auto"
                >
                    Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-center gap-6"
                >
                    <a
                        href="mailto:ranjithbabu.dev@gmail.com"
                        className="inline-flex items-center justify-center gap-3 bg-neon-lime text-dark-green px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                        <Mail size={20} />
                        ranjithbabu.dev@gmail.com
                    </a>

                    <div className="flex gap-4 justify-center">
                        {[
                            { icon: Github, href: "https://github.com/Ranjithbabu0912" },
                            { icon: Linkedin, href: "https://www.linkedin.com/in/ranjithbabu0912/" },
                            { icon: Instagram, href: "https://www.instagram.com/ranjithbabu0912" }
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-neon-lime hover:text-dark-green hover:border-neon-lime transition-all duration-300"
                                target="_blank"
                            >
                                <item.icon size={20} />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            <footer className="absolute bottom-6 left-0 right-0 text-center text-white/20 text-sm font-mono">
                &copy; {new Date().getFullYear()} Ranjith Babu. All Rights Reserved.
            </footer>
        </section>
    );
}
