import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import heroBg from "@/assets/pickle-and-Paddle-Ball-banner-image.webp";
// import image1 from "@/assets/picklePadelGallery/Image-1-6.webp";
// import image2 from "@/assets/picklePadelGallery/Image-2-5.webp";
import image3 from "@/assets/picklePadelGallery/Image-3-6.webp";
import image4 from "@/assets/picklePadelGallery/Image-4-5.webp";
import image5 from "@/assets/picklePadelGallery/Image-5-4.webp";

export function PadelPickleball() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    const faqs = [
        // {
        //     q: "What is the difference between Pickleball and Paddleball?",
        //     a: "While they look similar, the equipment and court rules differ:\n\nPickleball: Uses a perforated hollow plastic ball (like a wiffle ball) and a flat paddle. The game emphasizes placement and patience.\n\nPaddleball: Uses a pressurized rubber ball (similar to a tennis/squash ball) and a solid or perforated paddle. It is generally faster-paced."
        // },
        // {
        //     q: "How do the paddles differ?",
        //     a: "Pickleball paddles are solid, typically made of composite materials like carbon fiber or fiberglass with a honeycomb core. Paddleball paddles are often solid wood or composite but may have holes (perforations) to reduce air resistance and increase swing speed."
        // },
        {
            q: "How do the courts differ?",
            a: "A Pickleball court is 20' x 44', similar to a doubled badminton court. Padel courts are larger (10m x 20m) and are enclosed by glass and mesh walls which are part of the game. Padel is always played in doubles."
        }
    ];

    const advantageImages = [
        // { src: image1, title: "Precision Engineering", tag: "Court Construction" },
        // { src: image2, title: "Premium Turf", tag: "Surface Technology" },
        { src: image3, title: "Panoramic Glass", tag: "Structural Integrity" },
        { src: image4, title: "LED Lighting", tag: "Night Play" },
        { src: image5, title: "Custom Branding", tag: "Club Identity" },
    ];

        const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.techfittech.com/padel-pickleball#webpage",
            "url": "https://www.techfittech.com/padel-pickleball",
            "name": "Turnkey Padel Court Builder & Construction India — TechFit",
            "description": "TechFit designs and constructs professional, ITF-compliant panoramic padel courts and pickleball courts across India. High-wind structural framing, panoramic glass, premium AstroTurf, and LED lighting."
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Best padel court builder India",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit is India's leading padel court builder, providing complete turnkey construction from site assessment, civil works, steel framing, panoramic glass installation, premium AstroTurf laying, and LED lighting."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Pickleball court construction India",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit builds indoor and outdoor pickleball courts in India, including surface coating, net installation, and fencing."
                    }
                }
            ]
        },
        {
            "@type": "Product",
            "name": "TechFit Turnkey Padel Court Installation",
            "description": "ITF-compliant panoramic padel court construction featuring structural high-gauge steel columns, 12mm tempered panoramic safety glass, premium monofilament padel turf, LED lighting, and custom branding.",
            "brand": {
                "@type": "Brand",
                "name": "TechFit"
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "url": "https://www.techfittech.com/get-a-quote",
                "seller": {
                    "@type": "Organization",
                    "name": "TechFit"
                }
            }
        }
    ]
};

    return (
        <div className="flex flex-col w-full bg-white text-black overflow-hidden relative font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full min-h-[70vh] py-20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105" style={{ backgroundImage: `url(${heroBg})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40" />
                </div>

                <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 flex items-center gap-2"
                    >
                        <div className="h-[2px] w-8 bg-red-600"></div>
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Racquet Sports Solutions</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase max-w-5xl leading-[0.9] text-white drop-shadow-2xl mb-8"
                    >
                        Professional Grade <br />
                        <span className="text-red-600">Padel & Pickleball Courts</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mx-auto max-w-[800px] text-zinc-900 md:text-xl font-bold tracking-tight bg-white/80 backdrop-blur-sm px-8 py-6 border-l-4 border-red-600 shadow-xl leading-relaxed"
                    >
                        Engineered for performance, durability, and playability. Indoor and outdoor padel and pickleball court solutions for clubs, academies, residential projects, and commercial sports facilities.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-10"
                    >
                        <Link to="/get-a-quote">
                            <Button
                                className="bg-red-600 hover:bg-black text-white rounded-none px-6 sm:px-12 py-6 sm:py-8 text-[10px] sm:text-sm font-black tracking-widest transition-all duration-300 hover:scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] group"
                            >
                                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                Request Price List
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Strength Gallery Section (Reused Style) */}
            <section className="py-24 bg-white border-t-2 border-zinc-100 overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs">World-Class Infrastructure</span>
                            <div className="h-[2px] w-8 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-black leading-[0.85] mb-4">
                            Court. <span className="text-red-600">Perfection.</span>
                        </h2>
                        <p className="text-zinc-500 font-medium text-base md:text-lg max-w-lg mx-auto">
                            Turnkey court solutions designed for maximum player engagement and facility longevity.
                        </p>
                    </div>

                    {/* Single Hero Image */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-zinc-200 group cursor-pointer bg-black" onClick={() => setGalleryIndex(0)}>
                            <img
                                src={advantageImages[0].src}
                                alt={advantageImages[0].title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-70 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">{advantageImages[0].tag}</p>
                                    <p className="text-white text-xl sm:text-2xl font-black uppercase tracking-tight">{advantageImages[0].title}</p>
                                </div>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setGalleryIndex(0);
                                    }}
                                    className="bg-transparent text-white hover:text-red-600 rounded-none px-0 py-2 h-auto uppercase font-black tracking-[0.2em] text-[10px] sm:text-xs transition-all duration-300 group/btn relative"
                                >
                                    <span className="relative">
                                        Discover Gallery
                                        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600 group-hover/btn:bg-white transition-colors"></div>
                                    </span>
                                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Technical Specifications</span>
                            <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-4">
                            Technical <br /> <span className="text-red-600">FAQ.</span>
                        </h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4 max-w-4xl mx-auto">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-2 border-zinc-200 bg-white px-8 py-4 data-[state=open]:border-red-600 transition-colors">
                                <AccordionTrigger className="text-xl font-black tracking-tighter hover:no-underline text-left">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-600 text-lg font-medium leading-relaxed pb-6 whitespace-pre-line">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Final CTA - Simple Red Section */}
            <section className="py-16 sm:py-24 bg-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 z-0" />
                <div className="container relative z-10 px-4 mx-auto text-center">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                        Building a Combat Zone? <br />
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <Link to="/get-a-quote">
                            <Button className="bg-white text-red-600 hover:bg-black hover:text-white rounded-none px-8 sm:px-12 py-6 sm:py-8 h-auto font-black tracking-widest sm:tracking-[0.2em] text-sm sm:text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]">
                                Get a Factory Quote
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Gallery Lightbox Modal */}
            <AnimatePresence>
                {galleryIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/50 to-transparent">
                            <div>
                                <h4 className="text-white text-xl font-black uppercase tracking-tighter">Facility View</h4>
                                <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest">{advantageImages[galleryIndex].title}</p>
                            </div>
                            <button
                                onClick={() => setGalleryIndex(null)}
                                className="h-12 w-12 flex items-center justify-center text-white hover:text-red-600 transition-colors border-2 border-white/20 hover:border-red-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-[70vh] flex items-center justify-center">
                            <motion.img
                                key={galleryIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                src={advantageImages[galleryIndex].src}
                                className="max-h-full max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
                                alt="Gallery View"
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-12 mt-12 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-full">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryIndex((prev) => (prev !== null ? (prev === 0 ? advantageImages.length - 1 : prev - 1) : null));
                                }}
                                className="h-14 w-14 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <span className="text-white font-black font-mono text-lg">
                                {galleryIndex + 1} <span className="text-white/30">/</span> {advantageImages.length}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryIndex((prev) => (prev !== null ? (prev === advantageImages.length - 1 ? 0 : prev + 1) : null));
                                }}
                                className="h-14 w-14 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
