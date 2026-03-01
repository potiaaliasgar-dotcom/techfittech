import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-white text-black flex flex-col items-center">

            {/* Main Footer Links & Info */}
            <div className="w-full bg-white border-t border-zinc-200 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                        {/* Column 1: Info (Spans 5 columns on large screens) */}
                        <div className="space-y-6 md:col-span-5 lg:col-span-5 pr-8">
                            <Link to="/" className="inline-block">
                                <span className="text-4xl font-black tracking-tighter uppercase">techfit</span>
                            </Link>
                            <p className="text-zinc-600 text-xl leading-relaxed max-w-sm">
                                Leading Manufacturer supplying to Mumbai, Delhi, Bangalore, Hyderabad, and all major Indian cities.
                            </p>
                            <div className="flex items-center space-x-6 pt-2">
                                <a href="#" className="flex items-center gap-2 text-zinc-900 hover:text-red-600 transition-colors font-bold uppercase tracking-wider text-xl">
                                    <Linkedin className="h-6 w-6" />
                                    <span>Linkedin</span>
                                </a>
                                <a href="#" className="flex items-center gap-2 text-zinc-900 hover:text-red-600 transition-colors font-bold uppercase tracking-wider text-xl">
                                    <Instagram className="h-6 w-6" />
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Links (Spans 4 columns) */}
                        <div className="space-y-6 md:col-span-4 lg:col-span-4">
                            <ul className="space-y-6 text-xl font-bold text-zinc-900">
                                <li><Link to="/free-weights" className="hover:text-red-600 transition-colors flex items-center">Free Weights & Strength Equipment</Link></li>
                                <li><Link to="/crossfit-rigs" className="hover:text-red-600 transition-colors flex items-center">CrossFit Rigs</Link></li>
                                <li><Link to="/mma-cages" className="hover:text-red-600 transition-colors flex items-center">MMA Cages & Boxing Rings</Link></li>
                                <li><Link to="/about" className="hover:text-red-600 transition-colors flex items-center">About Us</Link></li>
                                <li><Link to="/privacy-policy" className="hover:text-red-600 transition-colors flex items-center">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Contact (Spans 3 columns) */}
                        <div className="space-y-6 md:col-span-3 lg:col-span-3">
                            <ul className="space-y-6 text-xl font-medium text-zinc-600">
                                <li>
                                    <a href="tel:+919820166910" className="hover:text-red-600 transition-colors block text-zinc-900 font-bold">+919820166910</a>
                                </li>
                                <li>
                                    <a href="mailto:techfitpa@gmail.com" className="hover:text-red-600 transition-colors block text-zinc-900 font-bold">techfitpa@gmail.com</a>
                                </li>
                                <li className="leading-relaxed">
                                    309, Boat Hard Rd, Darukhana, Byculla, Mumbai, Maharashtra 400010
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}
