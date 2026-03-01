import { ArrowRight, ChevronRight, Dumbbell, ShieldAlert, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import heroBg from "@/assets/Homepagebg.webp";

// Lineup Images
import ringImg from "@/assets/lineup/Competition-Ring.webp";
import rigsImg from "@/assets/lineup/CrossFit-Rigs-2.webp";
import weightsImg from "@/assets/lineup/Free-Weights-Strength.webp";

export function Home() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // Parallax effect for the hero background
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="flex flex-col w-full bg-white text-black overflow-hidden relative">

            {/* Background Graphic Watermark */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none text-[30vw] font-black tracking-tighter uppercase whitespace-nowrap z-0">
                TECHFIT
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full min-h-[calc(100svh-5rem)] py-20 flex items-center justify-center overflow-hidden z-10">
                {/* Dynamic Parallax Background */}
                <motion.div
                    style={{ y: yBg }}
                    className="absolute inset-0 z-0 bg-black"
                >
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 scale-105" style={{ backgroundImage: `url(${heroBg})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                </motion.div>

                <motion.div
                    style={{ opacity: opacityText }}
                    className="container relative z-10 px-4 flex flex-col items-center text-center -mt-20"
                >
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="mb-6 flex items-center gap-2"
                    >
                        <div className="h-[2px] w-12 bg-red-600"></div>
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm sm:text-base">Elite Equipment</span>
                        <div className="h-[2px] w-12 bg-red-600"></div>
                    </motion.div> */}

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl sm:text-7xl md:text-5xl lg:text-[5rem] font-black tracking-tighter uppercase max-w-6xl leading-[0.85] text-white drop-shadow-2xl mix-blend-overlay"
                    >
                        India’s <span className="text-red-600">Premier</span> Manufacturer of MMA Cages & Commercial Gym Rigs.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mx-auto mt-8 max-w-[800px] text-zinc-900 md:text-xl font-bold  tracking-widest bg-white/80 backdrop-blur-sm px-6 py-2 border-l-4 border-red-600 shadow-xl"
                    >
                        Direct from Factory Pricing. Custom Built in Mumbai. Trusted by 500+ Gyms
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 mt-12"
                    >
                        <Button size="sm" className="bg-red-600 hover:bg-black text-white rounded-none px-12 py-8 text-sm font-black tracking-widest transition-all duration-300 hover:scale-[1.02] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] group" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                            View our products
                            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Decorative Scrolling Ticker */}
            <div className="w-full bg-red-600 text-white overflow-hidden py-3 border-y-4 border-black relative z-20 shadow-2xl skew-y-1 transform origin-left -mt-20 hover:[&>div]:[animation-play-state:paused]">
                <div className="flex w-fit animate-marquee whitespace-nowrap gap-12 text-xs md:text-lg font-black uppercase tracking-widest pr-12">
                    <span>★ BUILT IN MUMBAI</span>
                    <span>★ FACTORY DIRECT PRICING</span>
                    <span>★ COMPETITION GRADE STEEL</span>
                    <span>★ BUILT IN MUMBAI</span>
                    <span>★ FACTORY DIRECT PRICING</span>
                    <span>★ COMPETITION GRADE STEEL</span>
                    <span>★ BUILT IN MUMBAI</span>
                    <span>★ FACTORY DIRECT PRICING</span>
                    <span>★ COMPETITION GRADE STEEL</span>

                    {/* Seamless Loop Duplicate */}
                    <span>★ BUILT IN MUMBAI</span>
                    <span>★ FACTORY DIRECT PRICING</span>
                    <span>★ COMPETITION GRADE STEEL</span>
                    <span>★ BUILT IN MUMBAI</span>
                    <span>★ FACTORY DIRECT PRICING</span>
                    <span>★ COMPETITION GRADE STEEL</span>
                    <span>★ BUILT IN MUMBAI</span>
                    <span>★ FACTORY DIRECT PRICING</span>
                    <span>★ COMPETITION GRADE STEEL</span>
                </div>
            </div>

            {/* Products Section (Carousel) */}
            <section id="products" className="py-8 md:py-24 flex items-center bg-white border-b border-zinc-200 relative z-20 overflow-hidden min-h-[100svh] md:min-h-0">
                {/* Background Watermark */}
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-[20vw] font-black tracking-tighter uppercase whitespace-nowrap z-0">
                    LINEUP
                </div> */}

                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col h-full justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-24 h-full">
                        {/* Left Panel: Header & Info */}
                        <div className="w-full md:w-1/3 flex flex-col items-start text-left shrink-0">
                            <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                                <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Industrial Grade</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-4 md:mb-8 drop-shadow-sm flex items-center justify-between w-full md:block">
                                <div>The <br className="hidden md:block" /><span className="text-red-600">Lineup</span></div>
                            </h2>
                            <p className="hidden md:block text-zinc-600 font-medium text-lg leading-relaxed mb-8 border-l-4 border-black pl-6 max-w-sm">
                                Precision engineered commercial equipment built in Mumbai for India's toughest training environments. Direct from factory floor to your facility.
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
                                    {/* Product 1 */}
                                    <CarouselItem className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2 shrink-0">
                                        <motion.div whileHover={{ y: -15 }} className="group h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black bg-white transition-all duration-300">
                                            <div className="relative aspect-[3/2] md:aspect-[3/2] bg-zinc-200 overflow-hidden border-b-2 border-black max-h-[260px] md:max-h-none">
                                                <div className="absolute top-2 md:top-4 left-2 md:left-4 z-20 bg-black text-white font-bold px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs uppercase tracking-widest border border-white/20">
                                                    Competition-Ring
                                                </div>
                                                <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                                                <img src={ringImg} alt="Competition Ring" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                            </div>
                                            <div className="p-6 flex flex-col flex-1 bg-white relative">
                                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 text-black border-b-2 border-red-600 pb-1 md:pb-2 inline-block self-start">MMA Octagons & Rings</h3>
                                                <p className="text-zinc-600 mb-6 flex-1 leading-relaxed font-medium text-sm md:text-base line-clamp-3 md:line-clamp-none">Professional-grade MMA cages and boxing rings designed for training academies, competitions, and commercial gyms.</p>
                                                <Link to="/mma-cages" className="inline-flex items-center text-white bg-black hover:bg-red-600 font-black uppercase tracking-widest text-xs md:text-sm transition-colors mt-auto px-6 py-4 w-full justify-between group-hover:pl-6 md:group-hover:pl-8 duration-300">
                                                    Explore Cages <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </CarouselItem>

                                    {/* Product 2 */}
                                    <CarouselItem className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2 shrink-0">
                                        <motion.div whileHover={{ y: -15 }} className="group h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black bg-white transition-all duration-300">
                                            <div className="relative aspect-[3/2] md:aspect-[3/2] bg-zinc-200 overflow-hidden border-b-2 border-black max-h-[260px] md:max-h-none">
                                                <div className="absolute top-2 md:top-4 left-2 md:left-4 z-20 bg-black text-white font-bold px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs uppercase tracking-widest border border-white/20">
                                                    CrossFit-Rigs (2)
                                                </div>
                                                <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                                                <img src={rigsImg} alt="CrossFit Rigs" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                            </div>
                                            <div className="p-6 flex flex-col flex-1 bg-white relative">
                                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 text-black border-b-2 border-red-600 pb-1 md:pb-2 inline-block self-start">CrossFit Rigs</h3>
                                                <p className="text-zinc-600 mb-6 flex-1 leading-relaxed font-medium text-sm md:text-base line-clamp-3 md:line-clamp-none">Custom-built CrossFit and functional training rigs engineered for strength, endurance, and scalability. Ideal for CrossFit boxes.</p>
                                                <Link to="/crossfit-rigs" className="inline-flex items-center text-white bg-black hover:bg-red-600 font-black uppercase tracking-widest text-xs md:text-sm transition-colors mt-auto px-6 py-4 w-full justify-between group-hover:pl-6 md:group-hover:pl-8 duration-300">
                                                    Explore Rigs <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </CarouselItem>

                                    {/* Product 3 */}
                                    <CarouselItem className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2 shrink-0">
                                        <motion.div whileHover={{ y: -15 }} className="group h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black bg-white transition-all duration-300">
                                            <div className="relative aspect-[3/2] md:aspect-[3/2] bg-zinc-200 overflow-hidden border-b-2 border-black max-h-[260px] md:max-h-none">
                                                <div className="absolute top-2 md:top-4 left-2 md:left-4 z-20 bg-black text-white font-bold px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs uppercase tracking-widest border border-white/20">
                                                    Free-Weights-Strength
                                                </div>
                                                <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"></div>
                                                <img src={weightsImg} alt="Free Weights" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                            </div>
                                            <div className="p-6 flex flex-col flex-1 bg-white relative">
                                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 text-black border-b-2 border-red-600 pb-1 md:pb-2 inline-block self-start">Free Weights & Strength</h3>
                                                <p className="text-zinc-600 mb-6 flex-1 leading-relaxed font-medium text-sm md:text-base line-clamp-3 md:line-clamp-none">Premium free weights, racks, platforms, and strength equipment built for durability and performance across India.</p>
                                                <Link to="/free-weights" className="inline-flex items-center text-white bg-black hover:bg-red-600 font-black uppercase tracking-widest text-xs md:text-sm transition-colors mt-auto px-6 py-4 w-full justify-between group-hover:pl-6 md:group-hover:pl-8 duration-300">
                                                    View Bulk Pricing <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </CarouselItem>
                                </CarouselContent>
                                <div className="hidden md:flex justify-start gap-4 mt-8">
                                    <CarouselPrevious className="static translate-y-0 border-2 border-black rounded-none h-12 w-12 hover:bg-red-600 hover:text-white" />
                                    <CarouselNext className="static translate-y-0 border-2 border-black rounded-none h-12 w-12 hover:bg-red-600 hover:text-white" />
                                </div>
                                <div className="flex justify-center md:hidden mt-4 w-full">
                                    <span className="border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-black">
                                        <ArrowRight className="h-3 w-3 rotate-180" /> DRAG TO EXPLORE <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>

            {/* Powering India's Best Gyms Section */}
            <section className="py-16 md:py-24 flex items-center bg-black border-y-8 border-red-600 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2000&auto=format&fit=crop')] bg-cover mix-blend-screen" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 w-full mb-16">
                    <div className="flex flex-col items-start text-left shrink-0 mb-16">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Trusted By</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-white leading-[0.85] drop-shadow-sm">
                            Powering India's <br className="hidden md:block" /><span className="text-red-600">Best Gyms</span>
                        </h2>
                    </div>

                    <div className="relative w-full z-10">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 1000,
                                })
                            ]}
                            className="w-full"
                        >
                            <CarouselContent className="items-center">
                                <CarouselItem className="basis-1/2 md:basis-1/3 flex justify-center">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-neutral-500 hover:text-white transition-colors duration-300">gold gym logo</h3>
                                </CarouselItem>
                                <CarouselItem className="basis-1/2 md:basis-1/3 flex justify-center">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-neutral-500 hover:text-white transition-colors duration-300">MFN logo</h3>
                                </CarouselItem>
                                <CarouselItem className="basis-1/2 md:basis-1/3 flex justify-center">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-neutral-500 hover:text-white transition-colors duration-300">MMA matrix Gym logo</h3>
                                </CarouselItem>
                                <CarouselItem className="basis-1/2 md:basis-1/3 flex justify-center">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-neutral-500 hover:text-white transition-colors duration-300">gold gym logo</h3>
                                </CarouselItem>
                                <CarouselItem className="basis-1/2 md:basis-1/3 flex justify-center">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-neutral-500 hover:text-white transition-colors duration-300">MFN logo</h3>
                                </CarouselItem>
                                <CarouselItem className="basis-1/2 md:basis-1/3 flex justify-center">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-neutral-500 hover:text-white transition-colors duration-300">MMA matrix Gym logo</h3>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* Why TechFit? */}
            <section className="py-16 md:py-24 flex items-center bg-white relative z-20 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 w-full">
                        <div className="flex flex-col items-start text-left shrink-0">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[2px] w-12 bg-red-600"></div>
                                <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Our Advantage</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] drop-shadow-sm">
                                Why <br className="hidden md:block" /><span className="text-red-600">TechFit?</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-zinc-600 font-bold tracking-widest border-l-4 border-red-600 pl-4 py-2 mb-2">
                            Engineered in Mumbai. Built for extreme abuse. Direct from the factory floor to your gym.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div whileHover={{ y: -10 }} className="group flex flex-col items-start bg-zinc-50 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all duration-300">
                            <div className="h-16 w-16 bg-red-600 border-2 border-black flex items-center justify-center mb-8 rotate-3 group-hover:-rotate-3 transition-transform text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                <Target className="h-8 w-8" />
                            </div>
                            <span className="text-sm font-black text-red-600 mb-2 block uppercase tracking-widest border border-red-600 px-2 py-1">Factory Direct</span>
                            {/* <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Factory Direct</h3> */}
                            <p className="text-zinc-600 group-hover:text-zinc-300 text-lg leading-relaxed font-medium">No middleman margins. You buy directly from the source.</p>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="group flex flex-col items-start bg-zinc-50 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all duration-300 mt-0 md:mt-12">
                            <div className="h-16 w-16 bg-red-600 border-2 border-black flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-3 transition-transform text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                <ShieldAlert className="h-8 w-8" />
                            </div>
                            <span className="text-sm font-black text-red-600 mb-2 block uppercase tracking-widest border border-red-600 px-2 py-1">Heavy Duty</span>
                            {/* <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Heavy Duty</h3> */}
                            <p className="text-zinc-600 group-hover:text-zinc-300 text-lg leading-relaxed font-medium">Commercial grade steel gauge tested for safety.</p>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="group flex flex-col items-start bg-zinc-50 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all duration-300 mt-0 md:mt-24">
                            <div className="h-16 w-16 bg-red-600 border-2 border-black flex items-center justify-center mb-8 rotate-6 group-hover:-rotate-6 transition-transform text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                <Dumbbell className="h-8 w-8" />
                            </div>
                            <span className="text-sm font-black text-red-600 mb-2 block uppercase tracking-widest border border-red-600 px-2 py-1">Customization</span>
                            {/* <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Customization</h3> */}
                            <p className="text-zinc-600 group-hover:text-zinc-300 text-lg leading-relaxed font-medium">We build to your gym's exact dimensions.</p>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* FAQs */}
            <section className="py-16 md:py-24 flex flex-col justify-center bg-zinc-100 border-t-8 border-black overflow-hidden relative">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="flex flex-col items-start text-left shrink-0 mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Support</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] drop-shadow-sm">
                            Frequently Asked <br className="hidden md:block" /><span className="text-red-600">Questions</span>
                        </h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="item-1" className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 transition-all data-[state=open]:shadow-none data-[state=open]:translate-x-[4px] data-[state=open]:translate-y-[4px]">
                            <AccordionTrigger className="text-xl md:text-2xl font-black uppercase hover:text-red-600 data-[state=open]:text-red-600 text-left py-6 hover:no-underline">Do you provide installation services?</AccordionTrigger>
                            <AccordionContent className="text-zinc-700 text-lg leading-relaxed pb-6 font-medium">
                                Yes. TechFit provides end-to-end support. For Rigs, Cages, and Rings, we can send a technical team to your location for professional assembly. Alternatively, we provide a detailed video guide and manual for your local contractor to follow.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 transition-all data-[state=open]:shadow-none data-[state=open]:translate-x-[4px] data-[state=open]:translate-y-[4px]">
                            <AccordionTrigger className="text-xl md:text-2xl font-black uppercase hover:text-red-600 data-[state=open]:text-red-600 text-left py-6 hover:no-underline">What is the lead time for a custom order?</AccordionTrigger>
                            <AccordionContent className="text-zinc-700 text-lg leading-relaxed pb-6 font-medium">
                                Lead times vary depending on the extent of customization and the type of equipment. Generally, custom rigs and cages take about 2-4 weeks from order confirmation to dispatch.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 transition-all data-[state=open]:shadow-none data-[state=open]:translate-x-[4px] data-[state=open]:translate-y-[4px]">
                            <AccordionTrigger className="text-xl md:text-2xl font-black uppercase hover:text-red-600 data-[state=open]:text-red-600 text-left py-6 hover:no-underline">Does the equipment come with a warranty?</AccordionTrigger>
                            <AccordionContent className="text-zinc-700 text-lg leading-relaxed pb-6 font-medium">
                                Yes, we stand behind the quality of our products. Our structural steel frames come with a solid warranty against manufacturing defects.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 transition-all data-[state=open]:shadow-none data-[state=open]:translate-x-[4px] data-[state=open]:translate-y-[4px]">
                            <AccordionTrigger className="text-xl md:text-2xl font-black uppercase hover:text-red-600 data-[state=open]:text-red-600 text-left py-6 hover:no-underline">How do I get a price quote?</AccordionTrigger>
                            <AccordionContent className="text-zinc-700 text-lg leading-relaxed pb-6 font-medium">
                                You can easily get a quote by connecting with us directly via WhatsApp, or sending an email to techfitpa@gmail.com with your requirements.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section >

        </div >
    );
}
