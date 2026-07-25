"use client";

import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export default function Hero() {
    return (
        <section id="hero" className="w-full relative overflow-hidden bg-black">
            {/* Desktop Hero: Rendered on screens 768px and wider (md+) */}
            <div className="hidden md:block w-full">
                <HeroDesktop />
            </div>

            {/* Mobile Alternate Hero: Rendered on mobile screens (< 768px) */}
            <div className="block md:hidden w-full">
                <HeroMobile />
            </div>
        </section>
    );
}
