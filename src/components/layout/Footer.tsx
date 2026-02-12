
export default function Footer() {
    return (
        <footer className="w-full py-8 text-center px-4 md:text-left md:py-12 md:px-12 border-t border-white/5 bg-black/20 flex flex-col-reverse md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
            <div className="text-white/40 text-xs font-mono uppercase tracking-widest text-center md:text-left">
                &copy; {new Date().getFullYear()} Ranjith Babu. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest">
                <a
                    href="https://www.linkedin.com/in/ranjithbabu0912"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-neon-lime transition-colors"
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/ranjithbabu0912"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-neon-lime transition-colors"
                >
                    GitHub
                </a>
                <a
                    href="https://www.instagram.com/ranjithbabu0912"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-neon-lime transition-colors"
                >
                    Instagram
                </a>
            </div>
        </footer>
    );
}
