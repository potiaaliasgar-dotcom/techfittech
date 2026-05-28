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
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

import heroBg from "@/assets/aqua-hero.webp";
import treadmillImg from "@/assets/Aqua/Techfit_Aqua_Series_Premium_Brochure_page-0001.jpg";
import bikeImg from "@/assets/Aqua/Techfit_Aqua_Series_Premium_Brochure_page-0003.jpg";
import moonWalkerImg from "@/assets/Aqua/Techfit_Aqua_Series_Premium_Brochure_page-0002.jpg";


export function Aqua() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    // const faqs = [
    //     {
    //         q: "What types of aqua fitness equipment do you offer?",
    //         a: "We provide a comprehensive range of aquatic fitness solutions including underwater treadmills, aqua cycling stations, resistance jet systems, hydrotherapy pools, and modular pool-based training platforms. All equipment is manufactured with marine-grade materials for maximum durability."
    //     },
    //     {
    //         q: "Can the aqua fitness systems be installed in existing facilities?",
    //         a: "Yes. Our modular aqua fitness systems are designed for both new constructions and retrofitting into existing pools and fitness facilities. Our turnkey installation team handles everything from structural assessment to final commissioning."
    //     },
    //     {
    //         q: "What maintenance is required for aqua fitness equipment?",
    //         a: "Our equipment is built with anti-corrosion materials and sealed mechanical systems that require minimal maintenance. We provide comprehensive maintenance packages and 24/7 technical support for all commercial installations."
    //     },
    //     {
    //         q: "Is aqua fitness suitable for rehabilitation?",
    //         a: "Absolutely. Aqua fitness is one of the most effective forms of rehabilitation training. The buoyancy of water reduces joint stress by up to 90% while providing natural resistance for muscle strengthening. Our systems are used by physiotherapy clinics, sports rehabilitation centers, and hospitals."
    //     }
    // ];

    const galleryImages = [
        { title: "Aqua Moon Walker", tag: "Underwater Elliptical", src: moonWalkerImg },
        { title: "Aqua Bike", tag: "Underwater Cycle", src: bikeImg },
        { title: "Aqua Treadmill", tag: "Manual Underwater Treadmill", src: treadmillImg },
    ];

        const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.techfittech.com/aqua#webpage",
            "url": "https://www.techfittech.com/aqua",
            "name": "SS316 Underwater Treadmills & Aqua Fitness Equipment India — TechFit",
            "description": "TechFit is India's premier supplier of SS316 marine-grade aqua fitness equipment: underwater treadmills, aqua bikes, and aqua moon walkers for hydrotherapy, sports rehabilitation, and hotels."
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Underwater treadmill supplier India",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit supplies premium SS316 marine-grade underwater treadmills in India for hotel pools, rehabilitation centres, physiotherapy clinics, and home pools."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Aqua fitness equipment India",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "TechFit's Aqua Series includes marine-grade underwater treadmills, underwater spin exercise bikes, and aqua moon walkers, all designed for chlorinated and salt-water pools."
                    }
                }
            ]
        },
        {
            "@type": "Product",
            "name": "TechFit Aqua Treadmill — SS316 Series",
            "description": "SS316 marine-grade rust-resistant underwater treadmill with manual belt operation, shock-absorbing belt design, and 160kg user capacity. Ideal for hotels, clinics, and professional sports rehab.",
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
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Manual Underwater Treadmill</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase max-w-5xl leading-[0.9] text-white drop-shadow-2xl mb-8"
                    >
                        TECHFIT <br />
                        <span className="text-red-600">AQUA TREADMILL</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mx-auto max-w-[800px] text-zinc-900 md:text-xl font-bold tracking-tight bg-white/80 backdrop-blur-sm px-8 py-6 border-l-4 border-red-600 shadow-xl leading-relaxed"
                    >
                        Premium SS316 marine-grade underwater stainless steel treadmill. Engineered for performance, built for excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
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


            {/* Aqua Equipment Section — Lineup Style */}
            <section className="py-8 md:py-24 flex items-center bg-white border-t-2 border-zinc-100 relative z-20 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col h-full justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-24 h-full">
                        {/* Left Panel: Header & Info */}
                        <div className="w-full md:w-1/3 flex flex-col items-start text-left shrink-0">
                            <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                                <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Premium SS316 Marine Grade</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-4 md:mb-8 drop-shadow-sm flex items-center justify-between w-full md:block">
                                <div>Our <br className="hidden md:block" /><span className="text-red-600">Equipment</span></div>
                            </h2>
                            <p className="hidden md:block text-zinc-600 font-medium text-lg leading-relaxed mb-8 border-l-4 border-black pl-6 max-w-sm">
                                Underwater Stainless Steel fitness equipment built for durability and performance. SS316 Marine Grade construction across our entire Aqua range.
                            </p>
                            <div className="hidden md:block w-24 h-2 bg-black"></div>
                        </div>

                        {/* Right Panel: Carousel */}
                        <div className="w-full md:w-2/3 relative flex-1 flex flex-col justify-center">
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-4 md:-ml-6">
                                    {galleryImages.map((item, i) => (
                                        <CarouselItem key={i} className="pl-4 md:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/2 shrink-0">
                                            <motion.div whileHover={{ y: -15 }} className="group h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black bg-white transition-all duration-300">
                                                <div className="relative aspect-[3/2] bg-zinc-200 overflow-hidden border-b-2 border-black max-h-[260px] md:max-h-none cursor-pointer" onClick={() => setGalleryIndex(i)}>
                                                    <div className="absolute top-2 md:top-4 left-2 md:left-4 z-20 bg-black text-white font-bold px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs uppercase tracking-widest border border-white/20">
                                                        {item.tag}
                                                    </div>
                                                    <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                                                    <img src={item.src} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                </div>
                                                <div className="p-6 flex flex-col flex-1 bg-white relative">
                                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 text-black border-b-2 border-red-600 pb-1 md:pb-2 inline-block self-start">{item.title}</h3>
                                                    {/* <p className="text-zinc-600 mb-6 flex-1 leading-relaxed font-medium text-sm md:text-base line-clamp-3 md:line-clamp-none">{item.desc}</p> */}
                                                    <Link to="/get-a-quote" className="inline-flex items-center text-white bg-black hover:bg-red-600 font-black uppercase tracking-widest text-xs md:text-sm transition-colors mt-auto px-6 py-4 w-full justify-between group-hover:pl-6 md:group-hover:pl-8 duration-300">
                                                        Get Quote <ChevronRight className="h-2 w-2 md:h-3 md:w-3" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="hidden md:flex justify-start gap-4 mt-8">
                                    <CarouselPrevious className="static translate-y-0 border-2 border-black rounded-none h-12 w-12 hover:bg-red-600 hover:text-white" />
                                    <CarouselNext className="static translate-y-0 border-2 border-black rounded-none h-12 w-12 hover:bg-red-600 hover:text-white" />
                                </div>
                                <div className="flex justify-center md:hidden mt-4 w-full">
                                    <span className="border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-black">
                                        <ArrowRight className="h-3 w-3 rotate-180" /> SWIPE TO EXPLORE <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </Carousel>
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
                        <AccordionItem value="item-1" className="border-2 border-zinc-200 bg-white px-8 py-4 data-[state=open]:border-red-600 transition-colors">
                            <AccordionTrigger className="text-xl font-black tracking-tighter hover:no-underline text-left">
                                What is SS316 Marine Grade Stainless Steel?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 text-lg font-medium leading-relaxed pb-6 whitespace-pre-line">
                                SS316 is a premium-grade stainless steel alloy known for its superior corrosion resistance, especially in saltwater and chlorinated pool environments. All our Aqua equipment is built with SS316 to ensure maximum longevity and zero rust, even with continuous underwater use.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-2 border-zinc-200 bg-white px-8 py-4 data-[state=open]:border-red-600 transition-colors">
                            <AccordionTrigger className="text-xl font-black tracking-tighter hover:no-underline text-left">
                                What is the recommended water depth for Aqua equipment?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 text-lg font-medium leading-relaxed pb-6 whitespace-pre-line">
                                Our Aqua Treadmill, Bike, and Moon Walker are optimized for water depths of 900mm to 1200mm. This range provides the ideal balance of buoyancy and resistance for effective underwater training and rehabilitation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-2 border-zinc-200 bg-white px-8 py-4 data-[state=open]:border-red-600 transition-colors">
                            <AccordionTrigger className="text-xl font-black tracking-tighter hover:no-underline text-left">
                                What is the weight capacity of the Aqua Treadmill?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 text-lg font-medium leading-relaxed pb-6 whitespace-pre-line">
                                The Aqua Treadmill supports a weight capacity of up to 160 kg. It features a heavy-duty manual treadmill belt and dual stability support rails for safe, self-paced underwater training.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border-2 border-zinc-200 bg-white px-8 py-4 data-[state=open]:border-red-600 transition-colors">
                            <AccordionTrigger className="text-xl font-black tracking-tighter hover:no-underline text-left">
                                Can the Aqua equipment be installed in existing pools?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 text-lg font-medium leading-relaxed pb-6 whitespace-pre-line">
                                Yes. Our modular Aqua equipment is designed for both new constructions and retrofitting into existing pool facilities. Our turnkey installation team handles everything from structural assessment to final commissioning.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div >
            </section >

            {/* Final CTA */}
            < section className="py-16 sm:py-24 bg-red-600 text-white relative overflow-hidden" >
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
            </section >

            {/* Gallery Lightbox Modal */}
            <AnimatePresence>
                {
                    galleryIndex !== null && (
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
                            <div className="relative w-full h-[70vh] flex items-center justify-center p-4">
                                <motion.img
                                    key={galleryIndex}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    src={galleryImages[galleryIndex].src}
                                    className="max-h-full max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10 bg-white"
                                    alt={galleryImages[galleryIndex].title}
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
                    )
                }
            </AnimatePresence >
        </div >
    );
}
