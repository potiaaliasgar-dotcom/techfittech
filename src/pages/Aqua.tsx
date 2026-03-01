import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, FileText, ChevronLeft, ChevronRight, Droplets, Waves, Thermometer, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import heroBg from "@/assets/aqua-hero.png";

export function Aqua() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    const features = [
        {
            icon: Droplets,
            title: "Aqua Resistance Training",
            desc: "Water-based resistance systems engineered for maximum muscle engagement with minimal joint stress. Perfect for rehabilitation and advanced conditioning."
        },
        {
            icon: Waves,
            title: "Hydrotherapy Integration",
            desc: "Integrated hydrotherapy jets and temperature control for recovery, wellness, and therapeutic fitness solutions in commercial and residential setups."
        },
        {
            icon: Thermometer,
            title: "Climate-Controlled Pools",
            desc: "Precision-engineered pool heating and cooling systems that maintain optimal water temperature year-round for peak performance training."
        },
        {
            icon: Shield,
            title: "Commercial-Grade Durability",
            desc: "Built with marine-grade stainless steel, anti-corrosion coatings, and industrial filtration systems designed for high-traffic fitness facilities."
        },
        {
            icon: Zap,
            title: "Underwater Fitness Equipment",
            desc: "Specialized underwater treadmills, cycling stations, and resistance machines engineered for aquatic fitness programs and athletic recovery."
        }
    ];

    const faqs = [
        {
            q: "What types of aqua fitness equipment do you offer?",
            a: "We provide a comprehensive range of aquatic fitness solutions including underwater treadmills, aqua cycling stations, resistance jet systems, hydrotherapy pools, and modular pool-based training platforms. All equipment is manufactured with marine-grade materials for maximum durability."
        },
        {
            q: "Can the aqua fitness systems be installed in existing facilities?",
            a: "Yes. Our modular aqua fitness systems are designed for both new constructions and retrofitting into existing pools and fitness facilities. Our turnkey installation team handles everything from structural assessment to final commissioning."
        },
        {
            q: "What maintenance is required for aqua fitness equipment?",
            a: "Our equipment is built with anti-corrosion materials and sealed mechanical systems that require minimal maintenance. We provide comprehensive maintenance packages and 24/7 technical support for all commercial installations."
        },
        {
            q: "Is aqua fitness suitable for rehabilitation?",
            a: "Absolutely. Aqua fitness is one of the most effective forms of rehabilitation training. The buoyancy of water reduces joint stress by up to 90% while providing natural resistance for muscle strengthening. Our systems are used by physiotherapy clinics, sports rehabilitation centers, and hospitals."
        }
    ];

    const galleryImages = [
        { title: "Infinity Training Pool", tag: "Pool Design" },
        { title: "Underwater Treadmill", tag: "Cardio Equipment" },
        { title: "Aqua Cycling Station", tag: "Resistance Training" },
        { title: "Hydrotherapy Zone", tag: "Recovery Systems" },
        { title: "Commercial Installation", tag: "Turnkey Solutions" },
    ];

    return (
        <div className="flex flex-col w-full bg-white text-black overflow-hidden relative font-sans">
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
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Aquatic Fitness Solutions</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase max-w-5xl leading-[0.9] text-white drop-shadow-2xl mb-8"
                    >
                        Premium <br />
                        <span className="text-red-600">Aqua Fitness</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mx-auto max-w-[800px] text-zinc-900 md:text-xl font-bold tracking-tight bg-white/80 backdrop-blur-sm px-8 py-6 border-l-4 border-red-600 shadow-xl leading-relaxed"
                    >
                        Next-generation aquatic fitness equipment and pool solutions for gyms, wellness centers, rehabilitation facilities, and luxury residences. Engineered for performance, built for durability.
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

            {/* Features Section */}
            <section className="py-24 bg-white border-t-2 border-zinc-100">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Why Choose Techfit Aqua</span>
                            <div className="h-[2px] w-8 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-black leading-[0.85] mb-4">
                            Aqua. <span className="text-red-600">Redefined.</span>
                        </h2>
                        <p className="text-zinc-500 font-medium text-base md:text-lg max-w-lg mx-auto">
                            Cutting-edge aquatic fitness solutions designed to transform any facility into a world-class wellness destination.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-zinc-50 border-2 border-zinc-100 p-8 relative group hover:border-red-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="absolute top-0 right-0 w-12 h-12 bg-zinc-100 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-500">
                                        <Icon className="h-6 w-6 text-zinc-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="mb-6">
                                        <div className="w-12 h-12 bg-red-600/10 flex items-center justify-center mb-4">
                                            <Icon className="h-6 w-6 text-red-600" />
                                        </div>
                                        <h3 className="text-xl font-black uppercase tracking-tighter text-black group-hover:text-red-600 transition-colors">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-zinc-500 font-medium leading-relaxed text-sm">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Hero Image Showcase */}
            <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
                </div>
                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Premium Installations</span>
                            <div className="h-[2px] w-8 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
                            Built for <span className="text-red-600">Excellence.</span>
                        </h2>
                        <p className="text-zinc-400 font-medium text-base md:text-lg max-w-2xl mx-auto mb-12">
                            From luxury wellness centers to professional rehabilitation clinics, our aqua fitness solutions deliver unmatched quality and performance.
                        </p>

                        <div className="relative aspect-[16/10] overflow-hidden border-4 border-white/10 group cursor-pointer" onClick={() => setGalleryIndex(0)}>
                            <img
                                src={heroBg}
                                alt="Premium Aqua Fitness Installation"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex items-end justify-between gap-2 sm:gap-4">
                                <div>
                                    <p className="text-white/80 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-1">Turnkey Solutions</p>
                                    <p className="text-white text-lg sm:text-3xl font-black uppercase tracking-tight">Infinity Training Pool</p>
                                </div>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setGalleryIndex(0);
                                    }}
                                    className="bg-transparent text-white hover:text-red-600 rounded-none px-0 py-2 h-auto uppercase font-black tracking-[0.2em] text-[8px] sm:text-xs transition-all duration-300 group/btn relative shrink-0"
                                >
                                    <span className="relative">
                                        Discover Gallery
                                        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600 group-hover/btn:bg-white transition-colors"></div>
                                    </span>
                                    <ArrowRight className="ml-2 sm:ml-3 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-2" />
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
                            <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Knowledge Base</span>
                            <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-4">
                            Aqua <br /> <span className="text-red-600">FAQ.</span>
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

            {/* Final CTA */}
            <section className="py-16 sm:py-24 bg-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 z-0" />
                <div className="container relative z-10 px-4 mx-auto text-center">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                        Ready to Dive In? <br />
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
                                <h4 className="text-white text-xl font-black uppercase tracking-tighter">Aqua Gallery</h4>
                                <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest">{galleryImages[galleryIndex].title}</p>
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
                                src={heroBg}
                                className="max-h-full max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
                                alt="Gallery View"
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-12 mt-12 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-full">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryIndex((prev) => (prev !== null ? (prev === 0 ? galleryImages.length - 1 : prev - 1) : null));
                                }}
                                className="h-14 w-14 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <span className="text-white font-black font-mono text-lg">
                                {galleryIndex + 1} <span className="text-white/30">/</span> {galleryImages.length}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryIndex((prev) => (prev !== null ? (prev === galleryImages.length - 1 ? 0 : prev + 1) : null));
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
