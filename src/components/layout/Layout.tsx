import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Phone, MessageCircle } from "lucide-react";

export function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-black selection:bg-red-600 selection:text-white font-sans">
            <Navbar />
            <div className="h-20" /> {/* Spacer for fixed Navbar */}
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
                <a
                    href="https://wa.me/919820166910"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                    aria-label="Contact on WhatsApp"
                >
                    <MessageCircle className="h-6 w-6" />
                </a>
                <a
                    href="tel:+919820166910"
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center md:hidden"
                    aria-label="Call Now"
                >
                    <Phone className="h-6 w-6" />
                </a>
            </div>
        </div>
    );
}
