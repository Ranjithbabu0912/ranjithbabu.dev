"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const bgWrapperRef = useRef<HTMLDivElement>(null);
    const fgWrapperRef = useRef<HTMLDivElement>(null);
    const hoverTriggerRef = useRef<HTMLDivElement>(null); // New Trigger Ref
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Initial Reveal - Animate BG, FG, and Trigger together
            tl.from([bgWrapperRef.current, fgWrapperRef.current, hoverTriggerRef.current], {
                scale: 1.2,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            })
                .from(titleRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }, "-=1")
                .from(subtitleRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.8")
                .from(scrollIndicatorRef.current, {
                    y: 10,
                    opacity: 0,
                    duration: 0.8
                }, "-=0.6");

            // 2. Parallax on Scroll - BG, FG, Trigger move together
            gsap.to([bgWrapperRef.current, fgWrapperRef.current, hoverTriggerRef.current], {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Text moves separately
            gsap.to(titleRef.current, {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 3. Interaction (Mouse & Touch) - Unified movement
            const handleMove = (clientX: number, clientY: number) => {
                if (!containerRef.current || !titleRef.current) return;

                const { innerWidth, innerHeight } = window;
                const x = (clientX / innerWidth - 0.5);
                const y = (clientY / innerHeight - 0.5);

                // Title Parallax
                gsap.to(titleRef.current, {
                    x: x * 40,
                    y: y * 40,
                    rotationY: x * 10,
                    rotationX: -y * 10,
                    duration: 1,
                    ease: "power2.out"
                });

                // Background/Foreground Parallax (Inverse movement)
                gsap.to([bgWrapperRef.current, fgWrapperRef.current, hoverTriggerRef.current], {
                    x: -x * 20,
                    y: -y * 20,
                    duration: 1.5,
                    ease: "power2.out"
                });
            };

            const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
            // Handling touch moves for mobile "drag" parallax
            const onTouchMove = (e: TouchEvent) => {
                // Prevent default only if horizontal drag to allow vertical scroll? 
                // Actually standard touch drag behavior is fine without preventDefault for parallax
                if (e.touches.length > 0) {
                    handleMove(e.touches[0].clientX, e.touches[0].clientY);
                }
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("touchmove", onTouchMove, { passive: true });

            // 4. Ambient Floating (Breathing Effect) - Always Active for subtle life
            // Animates properties that aren't being aggressively controlled by mouse to avoid conflict
            // Or just adds a layer of motion
            gsap.to([bgWrapperRef.current, fgWrapperRef.current], {
                scale: 1.05, // Gentle breathe
                duration: 6,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

            // Floating Text separately
            gsap.to(titleRef.current, {
                y: "+=15",
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("touchmove", onTouchMove);
            };

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-40 md:justify-center md:pt-0 bg-black perspective-1000 group"
        >
            {/* Background Image Wrapper (Layer 0) - hero.png */}
            <div
                ref={bgWrapperRef}
                className="absolute inset-0 z-0 w-[110%] h-[110%] -left-[5%] -top-[5%]"
            >
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat opacity-100"
                    style={{
                        backgroundImage: 'url("/hero.png")',
                    }}
                />
                {/* Dark gradient for text readability */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/90" />
            </div>

            {/* Main Title Area (Layer 1) - Sandwiched in the Middle */}
            <div className="relative z-10 w-full px-4 text-center text-white drop-shadow-2xl -mt-20 md:mt-0">
                <h1
                    ref={titleRef}
                    className="flex flex-col items-center justify-center leading-none select-none cursor-default"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <span
                        className="text-[16vw] md:text-[14vw] font-black tracking-tighter hover:text-neon-lime transition-colors duration-500"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        RANJITH
                    </span>
                    <span
                        className="text-[16vw] md:text-[14vw] font-light tracking-[0.2em] -mt-2 ml-2 md:-mt-8 hover:tracking-[0.5em] transition-all duration-700 pl-[0.2em] hover:pl-[0.5em]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        BABU
                    </span>
                </h1>
            </div>


            {/* Foreground Image Wrapper (Layer 2) - hero1.png ON TOP */}
            <div
                ref={fgWrapperRef}
                className="absolute inset-0 z-20 w-[110%] h-[110%] -left-[5%] -top-[5%] pointer-events-none"
            >
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                    style={{
                        backgroundImage: 'url("/hero1.png")',
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/90" />
            </div>

            {/* Hover Trigger Zone for Desktop */}
            <div
                ref={hoverTriggerRef}
                className="absolute inset-0 z-40 w-[110%] h-[110%] -left-[5%] -top-[5%] pointer-events-none peer flex items-center justify-center"
            >
                {/* The Actual Hit Box - Centered on Face Area */}
                <div className="w-[300px] h-[400px] md:w-[500px] md:h-[600px] pointer-events-auto rounded-full" />
            </div>

            {/* Subtitle / Role (Layer 3) - Topmost Controls */}
            <div
                ref={subtitleRef}
                className="absolute bottom-24 z-50 flex items-center justify-center gap-4 text-white drop-shadow-md"
            >
                <div className="h-px w-12 bg-white/60" />
                <span className="text-white/90 font-mono text-xs md:text-sm uppercase tracking-widest md:tracking-[0.2em] backdrop-blur-sm px-2 py-1 rounded">
                    Developer / Designer
                </span>
                <div className="h-px w-12 bg-white/60" />
            </div>

            {/* Minimal Scroll Indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 z-50 animate-bounce text-white drop-shadow-md"
            >
                <ArrowDown className="text-white/70" size={24} />
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}
