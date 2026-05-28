
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, FileText, ArrowRight, Maximize, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import heroBg from "@/assets/MMA-cages-boxing-rings.webp";

// Lineup Images for context (reusing where appropriate or using placeholders)
import floorCageImg from "@/assets/Cages/Floor-Cage.webp";
import podiumCageImg from "@/assets/Cages/Podium-Cage.webp";
import trainingRingImg from "@/assets/Cages/Training-Ring.webp";
import competitionRingImg from "@/assets/Cages/Competition-Ring.webp";

import image1 from "@/assets/Advantage/image-1-2.webp"
import image2 from "@/assets/Advantage/image-2-2.webp"
import image3 from "@/assets/Advantage/image-3-2.webp"
import image4 from "@/assets/Advantage/image-4-1.webp"
// import image5 from "@/assets/Advantage/image-5-2.webp"


export function MMACages() {
    const heroRef = useRef(null);
    const [activeCage, setActiveCage] = useState<number | null>(null);
    const [activeRing, setActiveRing] = useState<number | null>(null);

    const faqs = [
        {
            q: "What types of MMA cages and boxing rings does TechFit offer?",
            a: "TechFit manufactures professional‑grade combat sports infrastructure. We offer Floor-Mount Cages for gyms with height restrictions, Elevated (Podium) Cages for competition visuals, Training Rings for daily academy use, and Competition-Grade Rings that meet international standards."
        },
        {
            q: "What sizes are available?",
            a: "We offer custom sizes ranging from 16ft to 30ft. Whether you need a compact training cage for a boutique studio or a full-size competition arena, we build to your specific requirements."
        },
        {
            q: "What are the construction and safety specifications?",
            a: "Our cages feature 4mm+ thick heavy-gauge steel poles, high-tensile vinyl-coated chain link fencing, and multi-layer high-density impact foam padding. All platforms use reinforced steel framing and moisture-resistant marine-grade plywood."
        },
        {
            q: "What is the difference between a Floor Cage and a Podium Cage?",
            a: "A Floor Cage is mounted directly to the ground, ideal for facilities with height constraints. A Podium Cage is elevated on a structural steel platform, providing superior visibility for spectators and a professional 'event' feel."
        }
    ];

    const advantages = [
        { icon: <Maximize className="h-6 w-6" />, title: "4mm+ Heavy Gauge Poles", desc: "Engineered for maximum impact resistance and zero sway during high-intensity grappling." },
        { icon: <Award className="h-6 w-6" />, title: "Anti-slip Canvas", desc: "Premium textured canvas flooring designed for superior grip even during intense, sweaty sessions." },
        { icon: <Zap className="h-6 w-6" />, title: "Custom Logo Printing", desc: "High-durability printing on canvas, corner pads, and padding to showcase your brand with authority." },
    ];

    const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.techfittech.com/mma-cages#webpage",
            "url": "https://www.techfittech.com/mma-cages",
            "name": "MMA Cages & Boxing Rings — TechFit India",
            "description": "India's leading manufacturer of professional MMA cages, UFC-style octagons, floor cages, podium cages, and competition boxing rings. Custom sizes 16ft–30ft. Official supplier to Matrix Fight Night, Super Fight League, and Kumite 1 League.",
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.techfittech.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "MMA Cages & Boxing Rings",
                        "item": "https://www.techfittech.com/mma-cages"
                    }
                ]
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Who manufactures MMA cages in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit is India's leading manufacturer of professional MMA cages, UFC-style octagons, and boxing rings, based in Mumbai. They supply MMA cages to gyms, academies, and professional fight promotions across India."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Who are the best MMA cage manufacturers in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit (Techfit Health Fitness), based in Mumbai, is widely regarded as one of India's best MMA cage manufacturers. They are the official cage supplier for Matrix Fight Night (MFN), Super Fight League (SFL), and Kumite 1 League, India's top MMA promotions."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Who supplies UFC-style octagons in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit manufactures and supplies UFC-style octagon cages in India, including floor-mounted and elevated podium configurations. They build to custom sizes from 16ft to 30ft for training academies and professional events."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Who makes boxing rings in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit manufactures professional boxing rings in India — both training-grade rings for academies and competition-grade rings for tournaments and events. Based in Mumbai with pan-India delivery."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where to buy MMA cage in Mumbai?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit is the premier MMA cage manufacturer and supplier in Mumbai, India. Contact: +91-98201-66910 or info@techfitactive.com. Website: https://www.techfittech.com/mma-cages"
                    }
                },
                {
                    "@type": "Question",
                    "name": "What types of MMA cages does TechFit offer?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit manufactures: Floor-Mount Cages (ground-mounted, for gyms with height restrictions), Elevated Podium Cages (for competitions and events), Training Rings (for daily academy use), and Competition-Grade Boxing Rings (meeting international standards). All feature 4mm+ heavy-gauge steel poles and anti-slip canvas."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Who supplied the cage for Matrix Fight Night?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit is the official cage supplier for Matrix Fight Night (MFN), one of India's premier MMA promotions. They also supply cages for Super Fight League (SFL) and Kumite 1 League."
                    }
                }
            ]
        },
        {
            "@type": "Product",
            "name": "TechFit MMA Cage — Professional Series",
            "description": "Custom-manufactured MMA cages and boxing rings for training academies and professional events. Floor-mount, podium/elevated, and hexagon configurations. Sizes from 16ft to 30ft. 4mm+ heavy-gauge steel, anti-slip canvas, high-density foam padding.",
            "brand": {
                "@type": "Brand",
                "name": "TechFit"
            },
            "manufacturer": {
                "@type": "Organization",
                "name": "Techfit Health Fitness",
                "url": "https://www.techfittech.com/",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                }
            },
            "url": "https://www.techfittech.com/mma-cages",
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
        <div className="flex flex-col w-full bg-white text-black overflow-hidden relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero Section - Matching Home Styling */}
            <section ref={heroRef} className="relative w-full min-h-[60vh] py-20 flex items-center justify-center overflow-hidden">
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
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Pro Combat Series</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase max-w-4xl leading-[0.9] text-white drop-shadow-2xl"
                    >
                        Professional Grade <br />
                        <span className="text-red-600">MMA Cages & Rings</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mx-auto mt-8 max-w-[700px] text-zinc-900 md:text-xl font-bold tracking-tight bg-white/80 backdrop-blur-sm px-6 py-3 border-l-4 border-red-600 shadow-xl"
                    >
                        Floor Mount, Elevated & Competition Grade. Custom sizes from 16ft to 30ft
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-10"
                    >
                        <Link to="/get-a-quote">
                            <Button
                                className="bg-red-600 hover:bg-black text-white rounded-none px-8 sm:px-12 py-6 sm:py-8 text-sm font-black tracking-widest transition-all duration-300 hover:scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] group"
                            >
                                <FileText className="h-5 w-5" />
                                Request Price List
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* The Techfit Advantage */}
            <section className="py-12 lg:py-16 bg-zinc-950 text-white overflow-hidden min-h-[90svh] flex items-center">
                <div className="container px-4 mx-auto relative lg:py-0 py-8">
                    {/* <div className="absolute top-0 right-0 text-[15rem] font-black text-zinc-900 leading-none -translate-y-1/2 translate-x-1/4 pointer-events-none select-none z-0">PRO</div> */}

                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                                <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">The Techfit Advantage</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-black tracking-tighter uppercase text-white leading-[0.85] mb-4 md:mb-6 drop-shadow-sm">
                                Superior Strength.<br />Professional Standards.
                            </h2>

                            <div className="space-y-8 mt-8">
                                {advantages.map((adv, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-6"
                                    >
                                        <div className="mt-1 p-3 bg-red-600/10 border border-red-600/20 text-red-600">
                                            {adv.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl md:text-lg font-black uppercase tracking-widest mb-2">{adv.title}</h4>
                                            <p className="text-zinc-400 md:text-sm font-medium">{adv.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img src={image1} loading="lazy" decoding="async" className="w-full h-auto border-b-4 border-zinc-800" alt="Process 1" />
                                <img src={image2} loading="lazy" decoding="async" className="w-full h-auto border-b-4 border-zinc-800" alt="Process 2" />
                            </div>
                            <div className="space-y-4 pt-12">
                                <img src={image3} loading="lazy" decoding="async" className="w-full h-auto border-b-4 border-zinc-800" alt="Process 3" />
                                <img src={image4} loading="lazy" decoding="async" className="w-full h-auto border-b-4 border-red-600" alt="Process 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Comparison 1: Cages (Split Layout + Cage Aesthetic) */}
            <section className="py-12 lg:py-20 bg-white text-black relative overflow-hidden border-b border-zinc-200 sm:min-h-[80svh] flex items-center">
                {/* Subtle Chainlink/Grid Watermark Pattern */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: 'linear-gradient(45deg, #000 1px, transparent 1px), linear-gradient(-45deg, #000 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="container px-4 mx-auto relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-24 items-center">

                        {/* Left Panel: Header & Info */}
                        <div className="w-full lg:w-1/3 flex flex-col items-start text-left shrink-0">
                            <div className="flex items-center gap-2 md:gap-4 mb-2">
                                <div className="h-[2px] w-6 md:w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold tracking-widest text-[10px] sm:text-xs md:text-sm">The Combat Zone</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black tracking-tighter text-black leading-[0.85] mb-2 md:mb-6 drop-shadow-sm flex flex-col">
                                <span>Floor Cage</span>
                                <span className="text-zinc-600 font-light text-xl sm:text-2xl md:text-3xl my-1 sm:my-2">vs</span>
                                <span>Podium Cage</span>
                            </h2>
                            <p className="text-zinc-600 font-medium text-xs sm:text-sm md:text-base leading-snug lg:leading-relaxed mb-4 lg:mb-6 border-l-2 md:border-l-4 border-red-600 pl-4 lg:pl-6 max-w-sm">
                                Academy-grade ground cages versus elevated broadcast structures. Engineered for impact, built to exact professional specifications.
                            </p>
                        </div>

                        {/* Right Panel: The Cages */}
                        <div className="w-full lg:w-2/3 grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 sm:items-stretch items-start relative">
                            {/* Decorative background horizontal 'fence' lines */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full opacity-10 pointer-events-none mix-blend-overlay hidden sm:flex flex-col justify-evenly z-0">
                                <div className="h-[2px] bg-red-600 w-[120%] -ml-[10%] mb-12 transform rotate-1"></div>
                                <div className="h-[2px] bg-red-600 w-[120%] -ml-[10%] transform -rotate-1"></div>
                            </div>

                            {/* Floor Cage Box */}
                            <motion.div
                                onClick={() => setActiveCage(activeCage === 1 ? null : 1)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="group relative bg-white border-2 border-zinc-100 flex flex-col hover:border-red-600 transition-colors duration-500 z-10 shadow-2xl cursor-pointer sm:cursor-default"
                                style={{
                                    // Visual 'Cage' Border Effect
                                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                    backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(220, 38, 38, 0.1) 95%)',
                                    backgroundSize: '30px 100%'
                                }}
                            >
                                <div className="aspect-[3/2] sm:aspect-[4/3] bg-zinc-50 overflow-hidden relative w-full border-b-2 sm:border-b-4 border-zinc-100 group-hover:border-red-600 transition-colors flex-[0_0_auto]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 opacity-40" />
                                    <img src={floorCageImg} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Floor Cage" />

                                    {/* Mobile Tap Hint */}
                                    <div className="absolute top-2 right-2 sm:hidden z-20">
                                        <div className="bg-red-600/80 p-1 rounded-full animate-pulse">
                                            <Zap className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-5 lg:p-6 flex flex-col sm:flex-1 relative z-20 bg-white sm:justify-center">
                                    <h4 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tighter mb-1 sm:mb-2 lg:mb-3 text-black group-hover:text-red-600 transition-colors">Floor Cage</h4>
                                    <p className="text-zinc-600 text-[10px] sm:text-xs md:text-sm font-medium leading-tight lg:leading-relaxed hidden sm:block">
                                        Ground-mounted MMA cage designed for academies and training facilities. Compact, stable, and ideal for spaces requiring professional-grade performance without elevated platforms.
                                    </p>
                                    <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-400 sm:hidden">Tap for details</span>
                                </div>
                            </motion.div>

                            {/* Podium Cage Box */}
                            <motion.div
                                onClick={() => setActiveCage(activeCage === 2 ? null : 2)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="group relative bg-white border-2 border-zinc-100 flex flex-col hover:border-red-600 transition-colors duration-500 z-10 shadow-2xl sm:mt-12 cursor-pointer sm:cursor-default"
                                style={{
                                    // Visual 'Cage' Border Effect
                                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                    backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(220, 38, 38, 0.1) 95%)',
                                    backgroundSize: '30px 100%'
                                }}
                            >
                                <div className="aspect-[3/2] sm:aspect-[4/3] bg-zinc-50 overflow-hidden relative w-full border-b-2 sm:border-b-4 border-zinc-100 group-hover:border-red-600 transition-colors flex-[0_0_auto]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 opacity-40" />
                                    <img src={podiumCageImg} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Podium Cage" />

                                    {/* Podium Base Visual indicator */}
                                    <div className="absolute bottom-0 left-0 w-full h-3 sm:h-4 bg-zinc-50 border-t border-zinc-100 font-mono text-[6px] sm:text-[8px] text-zinc-400 px-2 flex items-center tracking-widest hidden sm:flex z-20">
                                        ELEVATED PLATFORM
                                    </div>

                                    {/* Mobile Tap Hint */}
                                    <div className="absolute top-2 right-2 sm:hidden z-20">
                                        <div className="bg-red-600/80 p-1 rounded-full animate-pulse">
                                            <Zap className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-5 lg:p-6 flex flex-col sm:flex-1 relative z-20 bg-white sm:justify-center">
                                    <h4 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tighter mb-1 sm:mb-2 lg:mb-3 text-black group-hover:text-red-600 transition-colors">Podium Cage</h4>
                                    <p className="text-zinc-600 text-[10px] sm:text-xs md:text-sm font-medium leading-tight lg:leading-relaxed hidden sm:block">
                                        Elevated MMA cage engineered for competitions and showcase environments. Offers enhanced visibility, reinforced structure, and premium finishing suitable for events and broadcast setups.
                                    </p>
                                    <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-400 sm:hidden">Tap for details</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Comparison 2: Rings (Split Layout + Ring Aesthetic) */}
            <section className="py-12 lg:py-20 bg-zinc-950 text-white relative border-b-8 border-red-600 sm:min-h-[85svh] flex items-center overflow-hidden">
                <div className="container px-4 mx-auto relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-24 items-center">

                        {/* Right Panel (now visually on right): Header & Info */}
                        <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end text-left lg:text-right shrink-0">
                            <div className="flex items-center gap-2 md:gap-4 mb-2 lg:flex-row-reverse">
                                <div className="h-[2px] w-6 md:w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold tracking-widest text-[10px] sm:text-xs md:text-sm">Mix Martial Arts</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black tracking-tighter text-white leading-[0.85] mb-2 md:mb-6 drop-shadow-sm flex flex-col">
                                <span>Training Ring</span>
                                <span className="text-zinc-400 font-light text-xl sm:text-2xl md:text-3xl my-1 sm:my-2">vs</span>
                                <span>Competition</span>
                            </h2>
                            <p className="text-zinc-400 font-medium text-xs sm:text-sm md:text-base leading-snug lg:leading-relaxed mb-4 lg:mb-6 border-l-2 lg:border-l-0 lg:border-r-4 border-red-600 pl-4 lg:pl-0 lg:pr-6 max-w-sm">
                                Daily grind durability versus tournament showcase stability. Shock-absorbing foundations built for champions.
                            </p>
                        </div>

                        {/* Left Panel (now visually on left): The Rings */}
                        <div className="w-full lg:w-2/3 grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 sm:items-stretch items-start relative">
                            {/* Decorative 'Ring Ropes' background */}
                            <div className="absolute inset-x-0 top-[40%] -translate-y-1/2 h-full w-full opacity-[0.05] pointer-events-none hidden sm:flex flex-col justify-center gap-6 md:gap-12 z-0">
                                <div className="h-4 w-[150%] -ml-[25%] bg-red-600 transform rotate-2"></div>
                                <div className="h-4 w-[150%] -ml-[25%] bg-red-600 transform -rotate-1"></div>
                                <div className="h-4 w-[150%] -ml-[25%] bg-red-600 transform rotate-1"></div>
                            </div>

                            {/* Training Ring Box */}
                            <motion.div
                                onClick={() => setActiveRing(activeRing === 1 ? null : 1)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="group relative bg-zinc-900 border-2 border-white/5 flex flex-col hover:border-red-600 transition-colors duration-500 z-10 shadow-2xl cursor-pointer sm:cursor-default"
                            >
                                {/* "Ring Corner" posts visual */}
                                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-blue-600 rounded-sm z-30 shadow-md"></div>
                                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 bg-red-600 rounded-sm z-30 shadow-md"></div>

                                <div className="aspect-[3/2] sm:aspect-[4/3] bg-zinc-950 overflow-hidden relative w-full border-b border-white/10 focus:outline-none flex-[0_0_auto]">
                                    <img src={trainingRingImg} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Training Ring" />

                                    {/* Mobile Tap Hint */}
                                    <div className="absolute top-2 right-2 sm:hidden z-20">
                                        <div className="bg-red-600/80 p-1 rounded-full animate-pulse">
                                            <Zap className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-5 lg:p-6 flex flex-col sm:flex-1 relative z-20 bg-zinc-900/50 backdrop-blur-sm sm:justify-center">
                                    <h4 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tighter mb-1 sm:mb-2 lg:mb-3 text-white group-hover:text-red-600 transition-colors">Training Ring</h4>
                                    <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-zinc-800 mb-2 sm:mb-6 group-hover:bg-red-600 transition-colors" />
                                    <p className="text-zinc-400 text-[10px] sm:text-xs md:text-sm font-medium leading-tight lg:leading-relaxed hidden sm:block">
                                        Durable MMA cage/boxing ring built for daily training and skill development. Designed for gyms and academies with focus on safety, shock absorption, and long-term use.
                                    </p>
                                    <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-500 sm:hidden">Tap for details</span>
                                </div>
                            </motion.div>

                            {/* Competition Ring Box */}
                            <motion.div
                                onClick={() => setActiveRing(activeRing === 2 ? null : 2)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="group relative bg-zinc-900 border-2 border-white/5 flex flex-col hover:border-red-600 transition-colors duration-500 z-10 shadow-2xl sm:mt-8 cursor-pointer sm:cursor-default"
                            >
                                {/* "Ring Corner" posts visual */}
                                <div className="absolute -top-2 -left-2 sm:-top-3 -left-3 w-4 h-4 sm:w-6 sm:h-6 bg-blue-600 rounded-sm z-30 shadow-md"></div>
                                <div className="absolute -top-2 -right-2 sm:-top-3 -right-3 w-4 h-4 sm:w-6 sm:h-6 bg-red-600 rounded-sm z-30 shadow-md"></div>

                                <div className="aspect-[3/2] sm:aspect-[4/3] bg-zinc-950 overflow-hidden relative w-full border-b border-white/10 focus:outline-none flex-[0_0_auto]">
                                    <img src={competitionRingImg} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Competition Ring" />

                                    {/* Mobile Tap Hint */}
                                    <div className="absolute top-2 right-2 sm:hidden z-20">
                                        <div className="bg-red-600/80 p-1 rounded-full animate-pulse">
                                            <Zap className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-5 lg:p-6 flex flex-col sm:flex-1 relative z-20 bg-zinc-900/50 backdrop-blur-sm sm:justify-center">
                                    <h4 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tighter mb-1 sm:mb-2 lg:mb-3 text-white group-hover:text-red-600 transition-colors">Competition Ring</h4>
                                    <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-zinc-800 mb-2 sm:mb-6 group-hover:bg-red-600 transition-colors" />
                                    <p className="text-zinc-400 text-[10px] sm:text-xs md:text-sm font-medium leading-tight lg:leading-relaxed hidden sm:block">
                                        Professional MMA cage/boxing ring designed to meet competition standards. Built for tournaments, promotions, and events requiring maximum stability, aesthetics, and athlete safety.
                                    </p>
                                    <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-500 sm:hidden">Tap for details</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-12 lg:py-24 bg-white relative">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4 justify-center">
                            <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Support & Guidance</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-[3.5rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-4 md:mb-8 drop-shadow-sm flex flex-col">
                            <span>Frequently Asked</span>
                            <span className="text-red-600">Questions</span>
                        </h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item - ${i} `} className="border-2 border-zinc-100 px-6 py-2 data-[state=open]:border-red-600 transition-colors">
                                <AccordionTrigger className="text-lg font-black tracking-tighter hover:no-underline text-left">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-600 text-lg font-medium leading-relaxed pb-6">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Final CTA */}
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

            {/* Global Mobile Popups */}
            {/* Floor Cage Modal */}
            <AnimatePresence>
                {activeCage === 1 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCage(null)}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm sm:hidden flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-sm bg-zinc-900 border border-red-600/50 p-6 shadow-2xl flex flex-col items-start"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4 w-full">
                                    <Zap className="h-4 w-4 text-red-600/50" />
                                    <button onClick={() => setActiveCage(null)} className="h-8 w-8 rounded-none border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-red-600 transition-colors">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tighter mb-2 text-white text-left">Floor Cage</h4>
                                <p className="text-zinc-400 text-sm font-medium leading-relaxed text-left">
                                    Ground-mounted MMA cage designed for academies and training facilities. Compact, stable, and ideal for spaces requiring professional-grade performance without elevated platforms.
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Podium Cage Modal */}
            <AnimatePresence>
                {activeCage === 2 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCage(null)}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm sm:hidden flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-sm bg-zinc-900 border border-red-600/50 p-6 shadow-2xl flex flex-col items-start"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4 w-full">
                                    <Zap className="h-4 w-4 text-red-600/50" />
                                    <button onClick={() => setActiveCage(null)} className="h-8 w-8 rounded-none border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-red-600 transition-colors">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tighter mb-2 text-white text-left">Podium Cage</h4>
                                <p className="text-zinc-400 text-sm font-medium leading-relaxed text-left">
                                    Elevated MMA cage engineered for competitions and showcase environments. Offers enhanced visibility, reinforced structure, and premium finishing suitable for events and broadcast setups.
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Training Ring Modal */}
            <AnimatePresence>
                {activeRing === 1 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveRing(null)}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm sm:hidden flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-sm bg-white border border-zinc-200 p-6 shadow-2xl flex flex-col items-start"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4 w-full">
                                    <Zap className="h-4 w-4 text-zinc-300" />
                                    <button onClick={() => setActiveRing(null)} className="h-8 w-8 rounded-none border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-black transition-colors">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tighter mb-2 text-black text-left">Training Ring</h4>
                                <p className="text-zinc-600 text-sm font-medium leading-relaxed text-left">
                                    Durable boxing ring built for daily training and skill development. Designed for gyms and academies with focus on safety, shock absorption, and long-term use.
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Competition Ring Modal */}
            <AnimatePresence>
                {activeRing === 2 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveRing(null)}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm sm:hidden flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-sm bg-white border border-red-600/50 p-6 shadow-2xl flex flex-col items-start"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4 w-full">
                                    <Zap className="h-4 w-4 text-red-600/30" />
                                    <button onClick={() => setActiveRing(null)} className="h-8 w-8 rounded-none border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:border-red-600 transition-colors">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tighter mb-2 text-black text-left">Competition Ring</h4>
                                <p className="text-zinc-600 text-sm font-medium leading-relaxed text-left">
                                    Professional boxing ring designed to meet competition standards. Built for tournaments, promotions, and events requiring maximum stability, aesthetics, and athlete safety.
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
