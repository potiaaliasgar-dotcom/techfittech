import { motion } from "framer-motion";

export function FreeWeights() {
    return (
        <div className="flex flex-col w-full bg-white text-black min-h-screen">
            <section className="relative w-full py-24 md:py-32 bg-black text-white text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    Free Weights & <span className="text-red-600">Strength</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg">
                    Commercial free weights & strength machines. Wholesale pricing for gym owners.
                </motion.p>
            </section>

            <section className="py-24">
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Hex Dumbbells", desc: "Premium rubber-coated hex dumbbells with knurled ergonomic steel handles.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&h=400&auto=format&fit=crop" },
                            { name: "Bumper Plates", desc: "High-density competition bumper plates designed for Olympic weightlifting drops.", img: "https://images.unsplash.com/photo-1584865288642-42078afc9592?q=80&h=400&auto=format&fit=crop" },
                            { name: "Olympic Bars", desc: "20kg and 15kg barbells with high tensile strength and smooth bearing rotation.", img: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&h=400&auto=format&fit=crop" },
                        ].map((product, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="group border border-zinc-200 bg-zinc-50 overflow-hidden">
                                <div className="aspect-[4/3] bg-zinc-200 overflow-hidden">
                                    <img src={product.img} alt={product.name} className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold uppercase mb-2">{product.name}</h3>
                                    <p className="text-zinc-600">{product.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
