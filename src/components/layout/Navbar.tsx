import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
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
    { name: "About Us", path: "/about" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white text-black shadow-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logoImg} alt="TechFit" className="h-12 w-auto object-contain" />
                </Link>
                <nav className="hidden lg:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-medium transition-colors hover:text-red-600"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="default" className="hidden lg:flex bg-black text-white hover:bg-zinc-800 rounded-none px-6 uppercase font-bold tracking-wider">
                        Get a Quote
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-black hover:bg-zinc-100 p-2">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-white text-black">
                            <div className="grid gap-6 p-6">
                                <Link to="/" className="inline-block mb-4">
                                    <img src={logoImg} alt="TechFit" className="h-10 w-auto object-contain" />
                                </Link>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="text-lg font-medium hover:text-red-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Button className="w-full mt-4 bg-black text-white hover:bg-zinc-800 rounded-none uppercase font-bold tracking-wider">
                                    Get a Quote
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
