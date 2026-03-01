import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronRight, X } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "MMA Cages & Rings", path: "/mma-cages" },
    { name: "CrossFit Rigs", path: "/crossfit-rigs" },
    { name: "Free Weights", path: "/free-weights" },
    { name: "Padel & Pickleball", path: "/padel-pickleball" },
    // { name: "About Us", path: "/about" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md text-black h-20 transition-all ${isMobileMenuOpen ? "z-40" : "z-[100]"}`}
        >
            <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105 shrink-0">
                    <img src={logoImg} alt="TechFit" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
                </Link>

                <nav className="hidden xl:flex items-center h-full">
                    {navLinks.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <div key={link.name} className="flex items-center h-full">
                                <Link
                                    to={link.path}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className={`px-3 xl:px-4 text-[10px] xl:text-xs font-black uppercase tracking-[0.05em] xl:tracking-widest transition-all hover:text-red-600 relative group h-full flex items-center whitespace-nowrap ${isActive ? "text-red-600" : ""}`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </Link>
                                {index < navLinks.length - 1 && (
                                    <div className="h-4 w-[1px] bg-zinc-300 mx-1 xl:mx-2" />
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/get-a-quote">
                        <Button variant="default" className="hidden xl:flex bg-black text-white hover:bg-red-600 rounded-none px-4 xl:px-6 py-4 xl:py-6 h-auto uppercase font-black tracking-widest transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none border-2 border-black text-[10px] xl:text-xs">
                            Get a Quote
                        </Button>
                    </Link>

                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="xl:hidden text-black hover:bg-zinc-100 p-2 border-2 border-black rounded-none h-10 w-10">
                                <Menu className="h-6 w-6 stroke-[2.5px]" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-white text-black p-0 border-l-4 border-black w-[85vw] sm:w-[400px] [&>button]:hidden">
                            <div className="flex flex-col h-full relative z-[110]">
                                <div className="p-6 border-b-2 border-zinc-100 flex items-center justify-between">
                                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                        <img src={logoImg} alt="TechFit" className="h-10 w-auto" />
                                    </Link>
                                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="h-10 w-10 border-2 border-black rounded-none hover:bg-zinc-100">
                                        <X className="h-6 w-6 stroke-[2.5px]" />
                                    </Button>
                                </div>
                                <div className="flex-1 overflow-y-auto py-8 px-6">
                                    <div className="grid gap-2">
                                        {navLinks.map((link, idx) => {
                                            const isActive = location.pathname === link.path;
                                            return (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    key={link.name}
                                                >
                                                    <Link
                                                        to={link.path}
                                                        onClick={() => {
                                                            setIsMobileMenuOpen(false);
                                                            window.scrollTo(0, 0);
                                                        }}
                                                        className={`flex items-center justify-between py-3 text-lg font-black uppercase tracking-tighter border-b border-zinc-100 hover:text-red-600 group transition-colors ${isActive ? "text-red-600" : ""}`}
                                                    >
                                                        {link.name}
                                                        <ChevronRight className={`h-5 w-5 transition-all -translate-x-4 group-hover:translate-x-0 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 group-hover:opacity-100"}`} />
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="p-6 bg-zinc-50 border-t-4 border-black mt-auto">
                                    <Link to="/get-a-quote" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full bg-black text-white hover:bg-red-600 rounded-none py-6 sm:py-8 h-auto uppercase font-black tracking-widest transition-all text-sm sm:text-lg shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-black">
                                            Get a Quote
                                        </Button>
                                    </Link>
                                    <p className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-6">
                                        Engineered in Mumbai ★ Built for India
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}
