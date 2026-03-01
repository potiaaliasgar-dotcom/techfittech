import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import heroBg from "@/assets/pickle-and-Paddle-Ball-banner-image.webp";

export function GetAQuote() {
    const [submitted, setSubmitted] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gymName: "",
        city: "",
        requirement: "",
        budget: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }
        setSubmitted(true);
    };

    const closeModal = () => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", gymName: "", city: "", requirement: "", budget: "", message: "" });
        setFormKey(prev => prev + 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "phone") {
            // Only allow numbers for phone
            const cleaned = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: cleaned }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const contactInfo = [
        {
            icon: <Phone className="h-6 w-6" />,
            label: "Call Us",
            value: "+91 98201 66910",
            link: "tel:+919820166910"
        },
        {
            icon: <Mail className="h-6 w-6" />,
            label: "Email Us",
            value: "techfitpa@gmail.com",
            link: "mailto:techfitpa@gmail.com"
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            label: "Factory Address",
            value: "309, Boat Hard Rd, Darukhana, Byculla, Mumbai, Maharashtra 400010",
            link: "https://www.google.com/maps/dir//309,+Boat+Hard+Rd+Darukhana,+Byculla+Mumbai,+Maharashtra+400010/@18.9755155,72.8505722,11z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7ce4cdb3a98ff:0x41004bdeb8ca9a41"
        }
    ];

    return (
        <div className="flex flex-col w-full bg-white text-black overflow-hidden relative font-sans">
            {/* Hero Section */}
            <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105" style={{ backgroundImage: `url(${heroBg})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-black/60" />
                </div>

                <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-center gap-2"
                    >
                        <div className="h-[2px] w-8 bg-red-600"></div>
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Direct From Factory</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase max-w-5xl leading-[0.9] text-white drop-shadow-2xl"
                    >
                        Get A <br />
                        <span className="text-red-600">Factory Quote.</span>
                    </motion.h1>
                </div>
            </section>

            {/* Main Content Split Layout */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* Left Column: Info & Map */}
                        <div className="space-y-12">
                            <div className="space-y-8">
                                <h2 className="text-4xl font-black uppercase tracking-tighter text-black border-l-8 border-red-600 pl-6">
                                    Contact <span className="text-red-600">Factory.</span>
                                </h2>

                                <div className="space-y-8">
                                    {contactInfo.map((info, i) => (
                                        <motion.a
                                            key={i}
                                            href={info.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-6 group cursor-pointer"
                                        >
                                            <div className="mt-1 p-4 bg-red-600 text-white rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black transition-all">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{info.label}</p>
                                                <p className="text-xl font-black uppercase tracking-tighter text-black leading-tight group-hover:text-red-600 transition-colors">
                                                    {info.value}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Map Integration */}
                            <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] border-4 border-black shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] sm:shadow-[16px_16px_0px_0px_rgba(220,38,38,1)] overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.193630263649!2d72.84805627581734!3d18.96759798221147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce4cdb3a98ff%3A0x41004bdeb8ca9a41!2s309%2C%20Boat%20Hard%20Rd%2C%20Darukhana%2C%20Byculla%2C%20Mumbai%2C%20Maharashtra%20400010!5e0!3m2!1sen!2sin!4v1711923000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-zinc-50 p-8 md:p-12 border-2 border-zinc-200 relative shadow-xl"
                            >
                                <div className="absolute -top-4 -right-4 bg-red-600 text-white px-6 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-lg">
                                    Say hello!
                                </div>

                                <form key={formKey} onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Your Name</label>
                                            <Input name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="rounded-none border-2 border-zinc-200 h-14 font-extrabold focus:border-red-600 focus:ring-0" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                                            <Input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="john@example.com" className="rounded-none border-2 border-zinc-200 h-14 font-extrabold focus:border-red-600 focus:ring-0" />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone Number</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-zinc-200 pr-3 pointer-events-none z-10">
                                                    <span className="text-sm font-black text-black">+91</span>
                                                </div>
                                                <Input name="phone" value={formData.phone} onChange={handleChange} required maxLength={10} placeholder="10-digit mobile" className="pl-16 rounded-none border-2 border-zinc-200 h-14 font-extrabold focus:border-red-600 focus:ring-0" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Gym Name</label>
                                            <Input name="gymName" value={formData.gymName} onChange={handleChange} required placeholder="TechFit Studio" className="rounded-none border-2 border-zinc-200 h-14 font-extrabold focus:border-red-600 focus:ring-0" />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">City</label>
                                            <Input name="city" value={formData.city} onChange={handleChange} required placeholder="Mumbai" className="rounded-none border-2 border-zinc-200 h-14 font-extrabold focus:border-red-600 focus:ring-0" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Requirement</label>
                                            <Select required onValueChange={(val) => setFormData(prev => ({ ...prev, requirement: val }))}>
                                                <SelectTrigger className="rounded-none border-2 border-zinc-200 h-14 font-extrabold focus:border-red-600 focus:ring-0">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none border-2 border-black">
                                                    <SelectItem value="mma-cages">MMA Cages & Rings</SelectItem>
                                                    <SelectItem value="free-weights">Commercial Free Weights</SelectItem>
                                                    <SelectItem value="crossfit-rigs">CrossFit Rigs & Racks</SelectItem>
                                                    <SelectItem value="padel-pickleball">Padel & Pickleball Courts</SelectItem>
                                                    <SelectItem value="aqua">Aqua Fitness</SelectItem>
                                                    <SelectItem value="full-setup">Complete Gym Setup</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Budget Range (Optional)</label>
                                        <Select onValueChange={(val) => setFormData(prev => ({ ...prev, budget: val }))}>
                                            <SelectTrigger className="rounded-none border-2 border-zinc-200 h-14 font-extrabold focus:border-red-600 focus:ring-0">
                                                <SelectValue placeholder="Select Range" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-none border-2 border-black">
                                                <SelectItem value="under-5l">Under ₹5 Lakhs</SelectItem>
                                                <SelectItem value="5-15l">₹5 - ₹15 Lakhs</SelectItem>
                                                <SelectItem value="15-30l">₹15 - ₹30 Lakhs</SelectItem>
                                                <SelectItem value="above-30l">₹30 Lakhs +</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Your Message</label>
                                        <Textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project requirements..." className="rounded-none border-2 border-zinc-200 min-h-[120px] font-extrabold focus:border-red-600 focus:ring-0 p-4" />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-red-600 text-white hover:bg-black rounded-none h-14 sm:h-16 font-black tracking-widest sm:tracking-[0.2em] transition-all text-sm sm:text-lg group"
                                    >
                                        Get A Factory Quote
                                        <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-2" />
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none z-0" />

            {/* Success Modal */}
            <AnimatePresence>
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => closeModal()}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 30 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white p-8 sm:p-12 text-center space-y-8 border-4 border-black shadow-[16px_16px_0px_0px_rgba(220,38,38,1)] max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-center">
                                <div className="p-6 bg-red-600 rounded-full animate-bounce">
                                    <Send className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black">Message Received.</h3>
                                <p className="text-zinc-600 text-base sm:text-lg font-medium leading-relaxed">
                                    Our factory representative will review your requirements and reach out on your mobile number within 12-24 hours.
                                </p>
                            </div>
                            <Button
                                onClick={() => closeModal()}
                                className="w-full bg-black text-white hover:bg-red-600 rounded-none uppercase font-black tracking-widest h-14 sm:h-16 transition-all text-sm sm:text-base"
                            >
                                Close
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
