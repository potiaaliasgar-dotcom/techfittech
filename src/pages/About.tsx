import { motion } from "framer-motion";
import { Rocket, TrendingUp, Flag, Shield, Users, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/Homepagebg.webp";
import AliPotia from "@/assets/Ali-Potia.jpg"
import aboutUs from "@/assets/aboutus.png";

export function About() {
    const storyItems = [
        {
            year: "2012",
            title: "The Inception",
            desc: "Techfit was founded with a singular vision: to revolutionize the Indian fitness equipment landscape with world-class manufacturing.",
            fullDesc: "Since our inception in 2012, we have been supplying the Indian fitness industry with our line of innovative fitness equipment. We are constantly adding new and innovative products to our portfolio.",
            icon: Rocket,
            color: "red"
        },
        {
            year: "2016",
            title: "Strategic Acquisition",
            desc: "Acquisition of IMOT Industries, bringing 15 years of cardio expertise and technical goodwill to the Techfit family.",
            fullDesc: "In 2016, we bought over IMOT Industries which came backed with 15 years of experience in assembling cardio equipment and goodwill. The introduction of an upgraded cardio series has brought with it superior features and usability to the Indian market.",
            icon: TrendingUp,
            color: "black"
        },
        {
            year: "Present",
            title: "Market Leadership",
            desc: "Dominating the market with the most comprehensive range of Strength, MMA, and CrossFit solutions built 100% in India.",
            fullDesc: "Today we offer fitness enthusiasts the complete range of Strength, Free Weights, MMA, Cardio & Cross fit Equipment of the highest quality, along with several customized options.",
            icon: Flag,
            color: "red"
        }
    ];

    return (
        <div className="flex flex-col w-full bg-white text-black min-h-screen relative font-sans">
            {/* Hero Section */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105" style={{ backgroundImage: `url(${heroBg})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40" />
                </div>

                <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-center gap-2"
                    >
                        <div className="h-[2px] w-8 bg-red-600"></div>
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Powering India's Fitness</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase max-w-5xl leading-[0.9] text-white drop-shadow-2xl"
                    >
                        About <br />
                        <span className="text-red-600">TechFit.</span>
                    </motion.h1>
                </div>
            </section>

            {/* Company Profile Section */}
            <section className="py-24 bg-white relative">
                <div className="container px-4 mx-auto">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-12 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[2px] w-8 bg-red-600"></div>
                                <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Since 2012</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-black leading-[0.85] mb-2">
                                Company <br /> <span className="text-red-600">Profile.</span>
                            </h2>
                        </div>

                        <div className="lg:col-span-7 space-y-8">
                            <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-black leading-tight border-l-8 border-red-600 pl-8">
                                Techfit is the only manufacturer in India who creates the one-two punch of both world-class Gyms, MMA gear and equipment.
                            </p>
                            <div className="space-y-6 text-zinc-600 text-lg font-medium leading-relaxed">
                                <p>
                                    Our imaginative designs are aesthetically pleasing and ergonomically created to "move as you do." Our innovations go beyond what is currently available, with the use of bio-mechanical development and enhanced usability features. Our fully loaded fitness equipment comes with a blend of automation and functionality; and our range is not only efficient but economical too.
                                </p>
                                <p>
                                    In recent times, Techfit has shot ahead by delivering high-class production administration to many international brands. Rich production coupled with years of management experience and a spot-on after-sales customer service, gives us a keen edge. Our Techfit technology team consults with numerous experts from across the global as well as domestically, and we pride ourselves on adhering to the strictest international design standards.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                            {[
                                { icon: <Shield className="h-6 w-6" />, title: "Bio-Mechanical", desc: "Ergonomic designs built to move as you do." },
                                { icon: <Rocket className="h-6 w-6" />, title: "Innovation", desc: "Strictest international design standards." },
                                { icon: <Users className="h-6 w-6" />, title: "Expert Support", desc: "Elite after-sales customer service." },
                                { icon: <CheckCircle className="h-6 w-6" />, title: "Economical", desc: "Direct factory pricing for Indian gyms." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 bg-zinc-50 border-2 border-zinc-100 space-y-4 hover:border-red-600 transition-colors group"
                                >
                                    <div className="p-3 bg-red-600 text-white w-fit group-hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase tracking-tighter text-black">{item.title}</h4>
                                        <p className="text-[10px] sm:text-xs text-zinc-500 font-medium leading-tight mt-1">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* R&D Section - Dark Theme */}
            <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="container px-4 mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[2px] w-8 bg-red-600"></div>
                                <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Testing & Precision</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-10">
                                Research & <br /> <span className="text-red-600">Development.</span>
                            </h2>
                            <div className="space-y-8 text-zinc-400 text-lg font-medium leading-relaxed">
                                <p>
                                    Techfit believes in innovation on a continuous basis. Our Quality Control managers have a watertight arrangement for durability, noise, static and balance testing. Additionally, we have an alternate assembly line for rust elimination, phosphate, spray, motor and electronic instruments.
                                </p>
                                <p>
                                    In view of this expert approach, each and every machine is principally aimed at targeting the right muscle group, thereby ensuring the fastest visible outcome. Our world class ergonomically manufactured fitness equipment is supplied to hotels, clubs, gyms, the real estate sector and HNI’s with fitness gear custom-made to their needs. Today Techfit is fully equipped to keep India fighting fit, with a fitness experience that tests the ultimate durability and endurance levels of potential champions.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-6 pt-6">
                                    <div className="flex gap-4">
                                        <div className="text-red-600 pt-1"><Target className="h-6 w-6" /></div>
                                        <div>
                                            <h4 className="text-white font-black uppercase text-sm mb-1 tracking-widest">Muscle Focus</h4>
                                            <p className="text-xs">Precision engineering for targeted outcomes.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="text-red-600 pt-1"><Shield className="h-6 w-6" /></div>
                                        <div>
                                            <h4 className="text-white font-black uppercase text-sm mb-1 tracking-widest">Watertight QC</h4>
                                            Maintaining standards across all assembly lines.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="h-64 bg-zinc-900 border-2 border-zinc-800 overflow-hidden group">
                                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" alt="R&D" />
                                </div>
                                <div className="h-48 bg-red-600 flex items-center justify-center text-5xl font-black uppercase text-white tracking-widest leading-none p-6">
                                    R&D Lab
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="h-48 bg-zinc-800 flex items-center justify-center text-4xl font-black uppercase text-red-600 tracking-tighter p-6 border-2 border-zinc-700">
                                    QC Test
                                </div>
                                <div className="h-64 bg-zinc-900 border-2 border-zinc-800 overflow-hidden group">
                                    <img src={aboutUs} className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" alt="Testing" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story / Timeline Section */}
            <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
                {/* Background Text Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-zinc-50 opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0">
                    Legacy of Innovation
                </div>

                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto mb-20 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs">Our Chronicle</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
                            Our <span className="text-red-600">Story.</span>
                        </h2>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        {/* The Rail/Track */}
                        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] sm:w-1 bg-zinc-100 sm:-translate-x-1/2 z-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/20 to-transparent animate-pulse" />
                        </div>

                        <div className="space-y-16 sm:space-y-32">
                            {storyItems.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, type: "spring" }}
                                        className={`flex flex-col sm:flex-row items-start sm:items-center gap-8 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}
                                    >
                                        {/* Milestone Marker */}
                                        <div className="absolute left-4 sm:left-1/2 -translate-x-[11px] sm:-translate-x-1/2 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] z-20 flex items-center justify-center group">
                                            <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-red-600 group-hover:scale-150 transition-transform duration-300" />
                                        </div>

                                        {/* Content Card */}
                                        <div className="flex-1 w-full pl-12 sm:pl-0">
                                            <div className="bg-white border-2 border-zinc-100 p-6 sm:p-10 md:p-12 relative group hover:border-red-600 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2">
                                                {/* Corner Accent */}
                                                <div className="absolute top-0 right-0 w-12 h-12 bg-zinc-50 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-500">
                                                    <Icon className={`h-6 w-6 ${item.color === 'red' ? 'text-red-600' : 'text-black'} group-hover:text-white transition-colors`} />
                                                </div>


                                                <div className="relative z-10">
                                                    <div className="mb-6">
                                                        <div className="flex items-center gap-2 mb-2 sm:hidden">
                                                            <div className="h-[1px] w-4 bg-red-600"></div>
                                                            <span className="text-red-600 font-bold text-sm tracking-widest">{item.year}</span>
                                                        </div>
                                                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black group-hover:text-red-600 transition-colors leading-none">
                                                            {item.title}
                                                        </h3>
                                                    </div>

                                                    <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm sm:text-base">
                                                        <p className="font-bold text-black">{item.desc}</p>
                                                        <p>{item.fullDesc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Spacer with Large Year for Desktop */}
                                        <div className={`flex-1 hidden sm:flex items-center ${i % 2 === 0 ? "justify-end pr-16" : "justify-start pl-16"} pointer-events-none`}>
                                            <span className="text-8xl md:text-9xl font-black text-zinc-100 group-hover:text-red-600/20 transition-colors duration-500 select-none">
                                                {item.year}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="py-24 bg-zinc-50 border-y-2 border-zinc-100 relative">
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-12 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-[2px] w-8 bg-red-600"></div>
                                    <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Leadership</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
                                    Meet Our <span className="text-red-600">Team.</span>
                                </h2>
                            </div>

                            <div className="lg:col-span-5 relative">
                                <div className="aspect-[4/5] bg-zinc-200 border-4 border-black relative z-10 overflow-hidden shadow-[24px_24px_0px_0px_rgba(220,38,38,1)]">
                                    <img src={AliPotia} className="w-full h-full object-cover grayscale opacity-80" alt="Ali Potia" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-10 left-10">
                                        <h3 className="text-4xl font-black uppercase text-white tracking-tighter leading-none">Ali Potia</h3>
                                        <p className="text-red-600 font-black uppercase text-sm mt-3 tracking-[0.3em]">Chief Executive Officer</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-7 space-y-8">
                                <p className="text-2xl font-black uppercase tracking-tight text-black leading-tight border-l-8 border-red-600 pl-8">
                                    "We are fitness people. We have all worked in gyms for most of our lives and want to make a difference for you and your members."
                                </p>
                                <div className="text-zinc-600 text-lg font-medium leading-relaxed bg-white p-8 border-2 border-zinc-200 shadow-xl">
                                    Ali, having completed his higher education in the field of Business Administration from Kingston University, London, is an entrepreneur with fitness expertise.
                                    His vision has driven Techfit to become one of India's most innovative equipment manufacturers.
                                </div>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}
