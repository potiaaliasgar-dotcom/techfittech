import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function About() {
    return (
        <div className="flex flex-col w-full bg-white text-black min-h-screen">
            {/* Hero */}
            <section className="relative w-full py-24 md:py-32 bg-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900 opacity-80 mix-blend-multiply"></div>
                <div className="container relative z-10 px-4 md:px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                    >
                        The TechFit <span className="text-red-600">Story</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl"
                    >
                        Powering India's fitness revolution since day one. We manufacture premium, competition-grade gym equipment from our direct-to-you factory in Mumbai.
                    </motion.p>
                </div>
            </section>

            {/* Make in India Section */}
            <section className="py-24">
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">Proudly <span className="text-red-600">Make In India</span></h2>
                            <p className="text-zinc-600 text-lg mb-6 leading-relaxed">
                                We believe in the power of local manufacturing. By controlling our entire production line in Mumbai, we bypass expensive import duties and middleman margins, passing the ultimate savings directly to gym owners and fitness entrepreneurs.
                            </p>
                            <ul className="space-y-4">
                                {['High-grade gauge steel construction', 'Custom dimensional modifications', 'Zero middleman markups', 'End-to-End Installation Services'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-700 font-medium">
                                        <CheckCircle className="h-5 w-5 text-red-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <div className="aspect-square bg-zinc-100 overflow-hidden relative">
                                <div className="absolute inset-0 bg-red-600 translate-x-4 translate-y-4 -z-10"></div>
                                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" alt="Factory Manufacturing" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
