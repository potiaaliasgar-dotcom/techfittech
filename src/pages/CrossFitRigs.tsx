import { motion } from "framer-motion";

export function CrossFitRigs() {
    return (
        <div className="flex flex-col w-full bg-white text-black min-h-screen">
            <section className="relative w-full py-24 md:py-32 bg-black text-white text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    CrossFit <span className="text-red-600">Rigs</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg">
                    Heavy-duty functional training rigs. Modular designs that grow with your gym. Wall-mounted or Free-standing.
                </motion.p>
            </section>

            <section className="py-24 bg-zinc-50">
                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&h=600&auto=format&fit=crop" className="w-full h-[400px] object-cover grayscale" alt="Rig Setup" />
                            <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&h=600&auto=format&fit=crop" className="w-full h-[400px] object-cover grayscale translate-y-8" alt="Rig Details" />
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-3 text-black">Endless Configurations</h3>
                                <p className="text-zinc-600 text-lg">Our rigs are built on a highly modular 75x75mm 11-gauge steel upright system. Start with a basic squat stand and expand it into a 24ft competition rig as your membership grows.</p>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { title: "Wall Mounted Rigs", desc: "Perfect for space-saving in smaller studios." },
                                    { title: "Free Standing Rigs", desc: "The centerpiece of any heavy-duty CrossFit box." },
                                    { title: "Attachments Available", desc: "J-Cups, Safety Spotter Arms, Dip Stations, Wall Ball Targets, and Flying Pull-up Bars." }
                                ].map((item, i) => (
                                    <li key={i} className="border-l-2 border-red-600 pl-4">
                                        <h4 className="font-bold text-lg uppercase">{item.title}</h4>
                                        <p className="text-zinc-500">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
