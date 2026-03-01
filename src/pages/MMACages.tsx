import { motion } from "framer-motion";

export function MMACages() {
    return (
        <div className="flex flex-col w-full bg-white text-black min-h-screen">
            <section className="relative w-full py-24 md:py-32 bg-black text-white text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    MMA Cages & <span className="text-red-600">Boxing Rings</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg">
                    Floor Mount, Elevated & Competition Grade. Custom sizes from 16ft to 30ft.
                </motion.p>
            </section>

            <section className="py-24">
                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-3">Floor Cages</h3>
                                <p className="text-zinc-600 text-lg">Cost-effective solutions for low-ceiling gyms. Bolted directly to the floor for absolute stability, wrapped with high-density padding.</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-3">Podium Cages (Elevated)</h3>
                                <p className="text-zinc-600 text-lg">Tournament standard. Features an elevated platform, catwalks, and premium canvas finishing for professional fight nights.</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-3">Custom Branding</h3>
                                <p className="text-zinc-600 text-lg">Get your gym's logo professionally printed on the ring canvas, corner pads, bumper cushions, and ropes.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&h=600&auto=format&fit=crop" className="w-full h-[300px] object-cover grayscale" alt="Cage 1" />
                            <img src="https://images.unsplash.com/photo-1629853965578-8380e2f5b4d7?q=80&h=600&auto=format&fit=crop" className="w-full h-[300px] object-cover grayscale" alt="Cage 2" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
