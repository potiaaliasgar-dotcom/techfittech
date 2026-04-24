import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import logoImg from "@/assets/logo.png";
import logoImg from "@/assets/images/other/img-7edcc2dfb4.png"

export function GlobalLoader() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // Show loader for 800ms on route change

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] bg-zinc-950 flex flex-col items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center gap-8"
                    >
                        {/* Pulsing Logo */}
                        <div className="relative w-48 sm:w-64 h-auto brightness-0 invert">
                            <motion.img
                                src={logoImg}
                                alt="Techfit Loading"
                                className="w-full h-auto object-contain relative z-10"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            />
                            {/* Subtle background glow behind the logo */}
                            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 z-0"></div>
                        </div>

                        {/* Loading Text / Bar */}
                        <div className="w-48 h-[1px] bg-zinc-800 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white w-1/3"
                                animate={{ x: ["-100%", "300%"] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
