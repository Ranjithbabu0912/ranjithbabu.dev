"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, MapPin, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, FormEvent } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSending(false);
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
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

            <div className="grow flex items-center justify-center pt-32 pb-24 px-6 md:px-12 relative z-10 w-full">
                <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Side: Info & Presence */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-neon-lime/10 text-neon-lime font-mono text-sm mb-6 border border-neon-lime/20">
                                <span className="w-2 h-2 rounded-full bg-neon-lime inline-block mr-2 animate-pulse" />
                                Available for freelance
                            </span>

                            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                                Let's build something <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-lime to-emerald-400">legendary.</span>
                            </h1>

                            <p className="text-xl text-white/60 mb-12 max-w-lg leading-relaxed">
                                I help brands and businesses build digital products that are fast, accessible, and visually stunning.
                            </p>

                            <div className="space-y-6 mb-12">
                                <a href="mailto:ranjithbabu.dev@gmail.com" className="group flex items-center gap-4 text-white hover:text-neon-lime transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-neon-lime/10 group-hover:border-neon-lime/50 transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Email Me</p>
                                        <p className="text-lg font-bold">ranjithbabu.dev@gmail.com</p>
                                    </div>
                                </a>

                                <div className="group flex items-center gap-4 text-white">
                                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Location</p>
                                        <p className="text-lg font-bold">Dindigul, Tamil Nadu, India & Remote</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {[
                                    { icon: Github, href: "https://github.com/ranjithbabu0912" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/in/ranjithbabu0912/" },
                                    { icon: Instagram, href: "https://www.instagram.com/ranjithbabu0912" },
                                    { icon: MessageCircle, href: "https://wa.me/919043100583" }
                                ].map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-black hover:bg-neon-lime transition-all duration-300"
                                    >
                                        <item.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Interactive Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-linear-to-r from-neon-lime/20 to-cyan-400/20 rounded-3xl blur-2xl opacity-50 pointer-events-none" />

                        <div className="relative bg-card-dark border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl">
                            {submitted ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-neon-lime/10 rounded-full flex items-center justify-center mx-auto mb-6 text-neon-lime">
                                        <Send size={40} />
                                    </div>
                                    <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                                    <p className="text-white/60 mb-8">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-white font-bold hover:text-neon-lime underline underline-offset-4"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-bold mb-8">Send a Message</h3>

                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-lime/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-lime/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-1">Message</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-lime/50 focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full bg-neon-lime text-black font-bold py-4 rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {sending ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
