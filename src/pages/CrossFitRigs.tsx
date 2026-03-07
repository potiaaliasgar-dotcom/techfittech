import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import heroBg from "@/assets/crossfit_rigs.webp";

import wallmounted from "@/assets/ConfigOptions/Wall-Mounted-Series-Space-Saver-.webp"
import islandRigs from "@/assets/ConfigOptions/Island-Rigs-Centerpiece-.webp"

// Placeholder images for rigs (using weights/cages/rings if specific ones aren't available, but user mentioned image 1..4)
import image1 from "@/assets/ModularGrid/image-1-4.webp"
import image2 from "@/assets/ModularGrid/image-2-4.webp"
import image3 from "@/assets/ModularGrid/image-3-4.webp"
import image4 from "@/assets/ModularGrid/image-4-3.webp"

export function CrossFitRigs() {
    const heroRef = useRef(null);
    const [activeRig, setActiveRig] = useState<number | null>(null);

    const faqs = [
        {
            q: "Are your CrossFit rigs modular?",
            a: "Yes. TechFit rigs utilize a modular grid system. You can start with a basic wall-mount unit and expand it indefinitely by adding uprights and pull-up bars as your facility grows."
        },
        {
            q: "What attachments are compatible with the rigs?",
            a: "Our rigs are compatible with a wide range of accessories including J-Cups, Spotter Arms, Dip Bars, Monkey Bars, Landmines, and more. All attachments follow standard sizing for easy integration."
        },
        {
            q: "Can the rigs be customized for my gym space?",
            a: "Absolutely. We specialize in custom solutions. Whether you have low ceilings, tight wall space, or need a massive island centerpiece, we can engineer a rig that fits your exact blueprints."
        },
        {
            q: "What is the build quality of the steel?",
            a: "We use premium 11-gauge (3mm+) heavy-duty structural steel for all our uprights and cross-members. Our rigs are engineered to withstand extreme abuse in high-volume commercial environments."
        }
    ];

    const attachments = [
        "J-Cups",
        "Spotter Arms",
        "Dip Bars",
        "Monkey Bars",
        "Landmines"
    ];

    const galleryImages = [
        { src: image2, title: "Wall Mount", tag: "Space Saver" },
        { src: image1, title: "Custom Setup", tag: "Academy" },
        { src: image3, title: "Island Rig", tag: "Freestanding" },
        { src: image4, title: "Competition", tag: "Pro Grade" },
    ];

    return (
        <div className="flex flex-col w-full bg-white text-black overflow-hidden relative">

            {/* Hero Section */}
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
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Functional Training</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase max-w-4xl leading-[0.9] text-white drop-shadow-2xl"
                    >
                        Heavy Duty <br />
                        <span className="text-red-600">Functional Training Rigs</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mx-auto mt-8 max-w-[700px] text-zinc-900 md:text-xl font-bold tracking-tight bg-white/80 backdrop-blur-sm px-6 py-3 border-l-4 border-red-600 shadow-xl"
                    >
                        Modular designs that grow with your gym. Wall-mounted or Free-standing.
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
                                <Zap className="h-5 w-5" />
                                Get Design Consultation
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Modular Grid Carousel Section */}
            <section className="py-12 lg:py-24 bg-white text-black overflow-hidden relative flex items-center min-h-[100svh]">
                <div className="container px-4 mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        {/* Information Panel */}
                        <div className="w-full lg:w-1/3 space-y-8">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Engineered Precision</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter uppercase text-black leading-[0.9] drop-shadow-sm">
                                Modular Grid.<br />Infinite Configurations.
                            </h2>

                            <div className="mt-8 pt-6 border-t border-zinc-100">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Compatible Attachments</h4>
                                <div className="flex flex-wrap gap-2">
                                    {attachments.map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 bg-zinc-100 text-black text-[10px] font-bold uppercase tracking-widest border border-zinc-200 hover:bg-black hover:text-white transition-all cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Carousel Panel */}
                        <div className="w-full lg:w-2/3 relative">
                            <div className="absolute -top-12 -left-12 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full z-0" />
                            <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-zinc-900/5 blur-[120px] rounded-full z-0" />

                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="relative z-10 w-full"
                            >
                                <CarouselContent>
                                    {galleryImages.map((img, index) => (
                                        <CarouselItem key={index} className="basis-full">
                                            <div className="group relative aspect-[16/10] overflow-hidden border-2 border-black bg-zinc-100 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                                <img
                                                    src={img.src}
                                                    alt={img.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="absolute bottom-0 left-0 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                                    <span className="text-red-600 font-black uppercase tracking-widest text-xs mb-2 block">{img.tag}</span>
                                                    <h3 className="text-white text-3xl font-black uppercase tracking-tighter">{img.title}</h3>
                                                </div>
                                                <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-white/20">
                                                    Rig Frame {index + 1}
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="hidden md:flex absolute -bottom-16 right-0 gap-4">
                                    <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-none border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-1 translate-y-1 active:scale-95" />
                                    <CarouselNext className="static translate-y-0 h-14 w-14 rounded-none border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-1 translate-y-1 active:scale-95" />
                                </div>
                                <div className="flex justify-center md:hidden mt-12 w-full">
                                    <span className="border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-black">
                                        <ArrowRight className="h-3 w-3 rotate-180" /> DRAG TO EXPLORE <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Comparison: Rigs */}
            <section className="py-12 lg:py-20 bg-zinc-950 text-white relative overflow-hidden border-b-8 border-red-600 sm:min-h-[85svh] flex items-center">
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="container px-4 mx-auto relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-24 items-center">

                        {/* Left Panel: Header & Info */}
                        <div className="w-full lg:w-1/3 flex flex-col items-start text-left shrink-0">
                            <div className="flex items-center gap-2 md:gap-4 mb-2">
                                <div className="h-[2px] w-6 md:w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold tracking-widest text-[10px] sm:text-xs md:text-sm">Configuration Options</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter text-white leading-[0.85] mb-2 md:mb-6 drop-shadow-sm flex flex-col">
                                <span>Wall Mounted</span>
                                <span className="text-zinc-600 font-light text-xl sm:text-2xl md:text-3xl my-1 sm:my-2">vs</span>
                                <span>Island Rigs</span>
                            </h2>
                            <p className="text-zinc-400 font-medium text-xs sm:text-sm md:text-base leading-snug lg:leading-relaxed mb-4 lg:mb-6 border-l-2 md:border-l-4 border-red-600 pl-4 lg:pl-6 max-w-sm">
                                Space-efficient wall-mounted solutions versus high-traffic freestanding island rigs. Custom built for your facility's footprint.
                            </p>
                        </div>

                        {/* Right Panel: The Rigs */}
                        <div className="w-full lg:w-2/3 grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 sm:items-stretch items-start relative">
                            {/* Wall Mounted rig */}
                            <motion.div
                                onClick={() => setActiveRig(1)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="group relative bg-zinc-900 flex flex-col hover:border-red-600 transition-colors duration-500 z-10 shadow-2xl cursor-pointer sm:cursor-default"
                                style={{
                                    border: '4px solid #18181b',
                                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                                    backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(220, 38, 38, 0.2) 95%)',
                                    backgroundSize: '30px 100%'
                                }}
                            >
                                <div className="aspect-[3/2] sm:aspect-[4/3] bg-zinc-900 overflow-hidden relative w-full border-b-2 sm:border-b-4 border-zinc-800 group-hover:border-red-600 transition-colors flex-[0_0_auto]">
                                    <img src={wallmounted} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4 sm:p-8" alt="Wall Mounted Rig" />
                                    <div className="absolute top-2 right-2 sm:hidden z-20">
                                        <div className="bg-red-600/80 p-1 rounded-full animate-pulse">
                                            <Zap className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-5 lg:p-6 flex flex-col sm:flex-1 relative z-20 bg-zinc-900/95 backdrop-blur-sm sm:justify-center">
                                    <h4 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tighter mb-1 sm:mb-2 lg:mb-3 text-white group-hover:text-red-600 transition-colors">Wall Mounted Series</h4>
                                    <p className="text-zinc-400 text-[10px] sm:text-xs md:text-sm font-medium leading-tight lg:leading-relaxed hidden sm:block">
                                        Space-saving functional rigs mounted directly to the wall. ( Space Saver ) Ideal for boutique studios and facilities where floor space is a premium.
                                    </p>
                                    <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-500 sm:hidden">Tap for details</span>
                                </div>
                            </motion.div>

                            {/* Island rig */}
                            <motion.div
                                onClick={() => setActiveRig(2)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="group relative bg-zinc-900 flex flex-col hover:border-red-600 transition-colors duration-500 z-10 shadow-2xl sm:mt-12 cursor-pointer sm:cursor-default"
                                style={{
                                    border: '4px solid #18181b',
                                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                                    backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(220, 38, 38, 0.2) 95%)',
                                    backgroundSize: '30px 100%'
                                }}
                            >
                                <div className="aspect-[3/2] sm:aspect-[4/3] bg-zinc-900 overflow-hidden relative w-full border-b-2 sm:border-b-4 border-zinc-800 group-hover:border-red-600 transition-colors flex-[0_0_auto]">
                                    <img src={islandRigs} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 p-4 sm:p-8" alt="Island Rig" />
                                    <div className="absolute top-2 right-2 sm:hidden z-20">
                                        <div className="bg-red-600/80 p-1 rounded-full animate-pulse">
                                            <Zap className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-5 lg:p-6 flex flex-col sm:flex-1 relative z-20 bg-zinc-900/95 backdrop-blur-sm sm:justify-center">
                                    <h4 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tighter mb-1 sm:mb-2 lg:mb-3 text-white group-hover:text-red-600 transition-colors">Island Rigs</h4>
                                    <p className="text-zinc-400 text-[10px] sm:text-xs md:text-sm font-medium leading-tight lg:leading-relaxed hidden sm:block">
                                        The ultimate centerpiece for high-traffic training. ( Centerpiece ) Freestanding, 360-degree access rigs designed for maximum athlete throughput.
                                    </p>
                                    <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-500 sm:hidden">Tap for details</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-12 lg:py-24 bg-zinc-50 relative">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4 justify-center">
                            <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Support & Guidance</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-4 md:mb-8 drop-shadow-sm flex flex-col">
                            <span>Frequently Asked</span>
                            <span className="text-red-600">Questions</span>
                        </h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-2 border-zinc-200 bg-white px-6 py-2 data-[state=open]:border-red-600 transition-colors">
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
            <AnimatePresence>
                {activeRig !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveRig(null)}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm sm:hidden flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`w-full max-w-sm p-6 shadow-2xl flex flex-col items-start ${activeRig === 1 ? "bg-zinc-900 border border-red-600/50" : "bg-zinc-100 border border-zinc-300"}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4 w-full">
                                <Zap className={`h-4 w-4 ${activeRig === 1 ? "text-red-600/50" : "text-zinc-400"}`} />
                                <button onClick={() => setActiveRig(null)} className={`h-8 w-8 rounded-none border flex items-center justify-center transition-colors ${activeRig === 1 ? "border-zinc-800 text-zinc-500 hover:text-white hover:border-red-600" : "border-zinc-200 text-zinc-400 hover:text-black hover:border-black"}`}>
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <h4 className={`text-xl font-black uppercase tracking-tighter mb-2 text-left ${activeRig === 1 ? "text-white" : "text-black"}`}>
                                {activeRig === 1 ? "Wall Mounted Series ( Space Saver )" : "Island Rigs ( Centerpiece )"}
                            </h4>
                            <p className={`text-sm font-medium leading-relaxed text-left ${activeRig === 1 ? "text-zinc-400" : "text-zinc-600"}`}>
                                {activeRig === 1
                                    ? "Space-saving functional rigs mounted directly to the wall. Perfect for smaller studios and facilities where floor space is a premium."
                                    : "The ultimate centerpiece for high-traffic training. Freestanding, 360-degree access rigs designed for maximum athlete throughput."}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
