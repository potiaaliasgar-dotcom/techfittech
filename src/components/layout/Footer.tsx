import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import logoImg from "@/assets/logo.png";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-zinc-950 text-white relative overflow-hidden">
            {/* Subtle background glow/texture */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Top Border Accent */}
            <div className="w-full h-1 bg-gradient-to-r from-red-600 via-zinc-800 to-red-600" />

            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">

                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-4 space-y-8">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-block group transition-transform duration-300 hover:scale-105">
                            <img src={logoImg} alt="TechFit" className="h-16 w-auto brightness-0 invert" />
                        </Link>
                        <div className="space-y-4">
                            <h3 className="text-xl font-black uppercase tracking-widest text-red-600">Engineered in Mumbai</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm font-medium">
                                Leading Manufacturer supplying to Mumbai, Delhi, Bangalore, Hyderabad, and all major Indian cities.
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="h-12 w-12 rounded-none border-2 border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 group">
                                <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
                            </a>
                            <a href="#" className="h-12 w-12 rounded-none border-2 border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 group">
                                <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-8 lg:col-span-5 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-red-600 pl-3">Products</h4>
                            <ul className="space-y-4">
                                <li><Link to="/mma-cages" onClick={() => window.scrollTo(0, 0)} className="text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tight text-sm md:text-base inline-block hover:translate-x-1 transition-transform">MMA Cages & Rings</Link></li>
                                <li><Link to="/crossfit-rigs" onClick={() => window.scrollTo(0, 0)} className="text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tight text-sm md:text-base inline-block hover:translate-x-1 transition-transform">CrossFit Rigs</Link></li>
                                <li><Link to="/free-weights" onClick={() => window.scrollTo(0, 0)} className="text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tight text-sm md:text-base inline-block hover:translate-x-1 transition-transform">Free Weights</Link></li>
                                <li><Link to="/padel-pickleball" onClick={() => window.scrollTo(0, 0)} className="text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tight text-sm md:text-base inline-block hover:translate-x-1 transition-transform">Padel & Pickleball</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-red-600 pl-3">Company</h4>
                            <ul className="space-y-4">
                                <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tight text-sm md:text-base inline-block hover:translate-x-1 transition-transform">Home</Link></li>
                                <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tight text-sm md:text-base inline-block hover:translate-x-1 transition-transform">About Us</Link></li>
                                <li><Link to="/get-a-quote" onClick={() => window.scrollTo(0, 0)} className="text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tight text-sm md:text-base inline-block hover:translate-x-1 transition-transform">Contact</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-4 lg:col-span-3 space-y-8">
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-red-600 pl-3">Get in Touch</h4>
                            <div className="space-y-4">
                                <a href="tel:+919326447321" className="block text-2xl font-black text-white hover:text-red-600 transition-colors tracking-tighter">
                                    +91 93264 47321
                                </a>
                                <a href="mailto:techfitpa@gmail.com" className="block text-lg font-bold text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-red-600">
                                    techfitpa@gmail.com
                                </a>
                                <a
                                    href="https://www.google.com/maps/dir//309,+Boat+Hard+Rd+Darukhana,+Byculla+Mumbai,+Maharashtra+400010/@18.9755155,72.8505722,11z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7ce4cdb3a98ff:0x41004bdeb8ca9a41"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-zinc-400 font-medium text-sm leading-relaxed hover:text-white transition-colors"
                                >
                                    309, Boat Hard Rd, Darukhana,<br />
                                    Byculla, Mumbai,<br />
                                    Maharashtra 400010
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Footer */}
                <div className="mt-16 md:mt-24 pt-8 border-t border-zinc-900 flex justify-center items-center">
                    <p className="text-zinc-500 text-xs font-bold tracking-[0.3em] text-center">
                        &copy; {currentYear} TechFit Industrial. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
