"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Force Lenis/ScrollTrigger to recalculate dimensions
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [loading]);


  useEffect(() => {
    if (!loading) return;

    Promise.all([
      document.fonts.ready,
      ...Array.from(document.images).map(
        (img) =>
          img.complete ||
          new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          })
      ),
    ]).then(() => setLoading(false));
  }, []);


  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden">

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(190,242,100,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(190,242,100,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div
          className={`transition-opacity duration-700 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>

      </div>

      <style jsx>{`
        @keyframes gridMove {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </main>
  );
}
