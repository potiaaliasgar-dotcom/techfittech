import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Zap, X, FileText, Package, ListChecks, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

import heroBg from "@/assets/commercial-free-weights-strength-machines.webp";
import productImage1 from "@/assets/productCatalog/rubber-dumbell.webp";
import productImage2 from "@/assets/productCatalog/Rubber-Plates.webp";
import productImage3 from "@/assets/productCatalog/Full-power-rack.webp";
import productImage4 from "@/assets/productCatalog/Deadlift-platfrom.webp";

import image3 from "@/assets/weightGallery/image-3-5.webp";
import image2 from "@/assets/weightGallery/image-1-5.webp";
import image4 from "@/assets/weightGallery/image-4-4.webp";
import image1 from "@/assets/weightGallery/image-5-3.webp";
import image5 from "@/assets/weightGallery/iamge-6.webp";

interface Product {
    id: number;
    title: string;
    subtitle: string;
    specs: string;
    desc: string;
    img: string;
}

function ProductCard({ product, onClick, onQuoteClick, isMobile = false }: { product: Product; onClick: () => void; onQuoteClick: () => void; isMobile?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative bg-white border border-zinc-200 hover:border-red-600 transition-all duration-500 overflow-hidden flex flex-col ${isMobile ? "mx-1 shadow-lg" : "shadow-sm hover:shadow-xl"}`}
        >
            {/* Image Container - Large & Prominent */}
            <div className="aspect-[4/3] overflow-hidden relative bg-white cursor-pointer p-8 sm:p-12" onClick={onClick}>
                <img
                    src={product.img}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    alt={product.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-100 group-hover:border-red-600 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-zinc-100 group-hover:border-red-600 transition-colors duration-300"></div>
            </div>

            {/* Content Area - Compact & Clean */}
            <div className="p-5 flex flex-col gap-3 bg-white">
                <div>
                    <p className="text-red-600 text-[9px] font-bold uppercase tracking-[0.25em] mb-1">{product.subtitle}</p>
                    <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight text-black group-hover:text-red-600 transition-colors leading-tight">
                        {product.title}
                    </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-[2px] bg-red-600"></div>
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-700">{product.specs}</span>
                    </div>
                    <Button
                        onClick={onQuoteClick}
                        size="sm"
                        className="bg-black text-white hover:bg-red-600 rounded-none h-9 px-4 text-[10px] uppercase font-black tracking-widest transition-all duration-300"
                    >
                        Get Quote
                        <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

export function FreeWeights() {
    const heroRef = useRef(null);
    const enquiryRef = useRef<HTMLDivElement>(null);
    const [activeProduct, setActiveProduct] = useState<number | null>(null);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        item: "",
        quantity: "",
        phone: ""
    });

    const scrollToEnquiry = () => {
        enquiryRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }
        setSubmitted(true);
    };

    const faqs = [
        {
            q: "What range of strength equipment do you offer?",
            a: "We offer a comprehensive range of commercial-grade strength equipment, including hex dumbbells, Olympic bumper plates, heavy-duty power racks, deadlift platforms, and competition-spec bars. Each piece is engineered for maximum durability in high-traffic gym environments."
        },
        {
            q: "Do you offer branding on weights?",
            a: "Yes. We can provide Custom Logo Bumper Plates and Branded Dumbbells for bulk orders, giving your facility a premium, cohesive look. Our high-durability printing process ensures logos stay sharp even after years of use."
        },
        {
            q: "What is the weight capacity of your benches and racks?",
            a: "Our commercial power racks and benches are static load tested to 500kg+ and 400kg+ respectively. We use 11-gauge structural steel (3mm+) to ensure zero-wobble performance under maximum loads."
        },
        {
            q: "Are your bumper plates drop-safe?",
            a: "Absolutely. Our TechFit Bumper Plates are made from high-density virgin rubber with a stainless steel inner hub. They are drop-tested to 30,000+ drops from 7 feet to ensure long-term performance and floor protection."
        }
    ];

    const products = [
        {
            id: 1,
            title: "Rubber Dumbbell",
            subtitle: "Hex Series",
            specs: "2.5kg - 50kg",
            desc: "Precision balanced hex dumbbells with premium rubber coating and ergonomic knurled handles.",
            tag: "Best Seller",
            img: productImage1
        },
        {
            id: 2,
            title: "Rubber Plates",
            subtitle: "Olympic Series",
            specs: "2.5kg - 50kg",
            desc: "High-density rubber plates with steel insert for smooth loading and minimal bounce.",
            tag: "Durable",
            img: productImage2
        },
        {
            id: 3,
            title: "Full Power Rack",
            subtitle: "Commercial Series",
            specs: "Color/Black",
            desc: "Heavy-duty 75x75mm structural steel frame with laser-cut hole numbering.",
            tag: "Pro Series",
            img: productImage3
        },
        {
            id: 4,
            title: "Deadlift Platform",
            subtitle: "Impact Series",
            specs: "Commercial Spec",
            desc: "Triple-layer sound reduction system with heavy-duty rubber tiles and bamboo center.",
            tag: "Heavy Duty",
            img: productImage4
        },

    ];

    const advantageImages = [
        { src: image1, title: "Global Standards", tag: "Commercial" },
        { src: image2, title: "Master Craft", tag: "Engineering" },
        { src: image3, title: "Custom Branding", tag: "Personalization" },
        { src: image4, title: "Impact Tested", tag: "Quality Control" },
        { src: image5, title: "Precision Casting", tag: "Manufacturing" },
    ];

    return (
        <div className="flex flex-col w-full bg-white text-black overflow-hidden relative font-sans">
            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full min-h-[60vh] py-16 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105" style={{ backgroundImage: `url(${heroBg})` }} />
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
                        <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">Strength & Conditioning</span>
                        <div className="h-[2px] w-8 bg-red-600"></div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase max-w-5xl leading-[0.9] text-white drop-shadow-2xl"
                    >
                        Commercial Free Weights <br />
                        <span className="text-red-600">& Strength Machines</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mx-auto mt-8 max-w-[800px] text-zinc-900 md:text-xl font-bold tracking-tight bg-white/80 backdrop-blur-sm px-6 py-3 border-l-4 border-red-600 shadow-xl"
                    >
                        Wholesale pricing for Gym Owners. Bouncers, Hex Dumbbells, Olympic Plates
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-10"
                    >
                        <Button
                            onClick={scrollToEnquiry}
                            size="sm"
                            className="bg-red-600 hover:bg-black text-white rounded-none px-12 py-8 text-sm font-black tracking-widest transition-all duration-300 hover:scale-[1.02] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] group"
                        >
                            <FileText className="h-5 w-5" />
                            Get A Quote
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Product Catalog Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="container px-4 mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-red-600"></div>
                            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">Commercial Inventory</span>
                            <div className="h-[2px] w-8 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-black leading-[0.85] mb-4">
                            Product <span className="text-red-600">Catalog.</span>
                        </h2>
                        <p className="text-zinc-500 font-medium text-base max-w-lg mx-auto">
                            Industrial-grade strength solutions engineered for elite performance.
                        </p>
                    </div>

                    {/* Desktop Grid View: 2x2 Layout */}
                    <div className="hidden sm:grid grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} onClick={() => setActiveProduct(product.id)} onQuoteClick={scrollToEnquiry} />
                        ))}
                    </div>

                    {/* Mobile Carousel View: Horizontal Only */}
                    <div className="sm:hidden -mx-4 overflow-hidden">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-0">
                                {products.map((product) => (
                                    <CarouselItem key={product.id} className="pl-4 basis-[85%]">
                                        <ProductCard product={product} onClick={() => setActiveProduct(product.id)} onQuoteClick={scrollToEnquiry} isMobile />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center mt-8 w-full">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 flex items-center gap-3 bg-red-600/5 border border-red-600/20 px-6 py-2 rounded-full animate-pulse shadow-sm">
                                    <ArrowRight className="h-3 w-3 rotate-180" /> SWIPE CATALOG <ArrowRight className="h-3 w-3" />
                                </span>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* Strength Gallery Section */}
            <section className="py-20 bg-white border-t-2 border-zinc-100 overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[2px] w-8 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Precision Engineering</span>
                            <div className="h-[2px] w-8 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-black leading-[0.85] mb-4">
                            Strength. <span className="text-red-600">Redefined.</span>
                        </h2>
                        <p className="text-zinc-500 font-medium text-base md:text-lg max-w-lg mx-auto">
                            Every weight and machine is engineered for the highest standard of durability.
                        </p>
                    </div>

                    {/* Single Hero Image */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-zinc-200 group cursor-pointer bg-black" onClick={() => setGalleryIndex(0)}>
                            <img
                                src={advantageImages[0].src}
                                alt={advantageImages[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-70 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">{advantageImages[0].tag}</p>
                                    <p className="text-white text-xl sm:text-2xl font-black uppercase tracking-tight">{advantageImages[0].title}</p>
                                </div>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setGalleryIndex(0);
                                    }}
                                    className="bg-transparent text-white hover:text-red-600 rounded-none px-0 py-2 h-auto uppercase font-black tracking-[0.2em] text-[10px] sm:text-xs transition-all duration-300 group/btn relative"
                                >
                                    <span className="relative">
                                        Discover Gallery
                                        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600 group-hover/btn:bg-white transition-colors"></div>
                                    </span>
                                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto mb-8 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                            <span className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm">Expert Support</span>
                            <div className="h-[2px] w-8 md:w-12 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase text-black leading-[0.85] mb-4">
                            Free Weights <br /> <span className="text-red-600">FAQ.</span>
                        </h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4 max-w-4xl mx-auto">
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
            {/* Bulk Enquiry Form Section (Final CTA) */}
            <section ref={enquiryRef} className="py-12 bg-zinc-50 relative overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">

                            {/* Form Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-[2px] w-8 bg-red-600"></div>
                                    <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Direct Factory Access</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-black leading-[0.85] mb-8">
                                    Bulk <br /> <span className="text-red-600">Enquiry.</span>
                                </h2>
                                <p className="text-zinc-600 text-lg font-medium leading-relaxed mb-10">
                                    Planning a commercial facility or a large-scale studio? Get priority manufacturing slots and factory-direct pricing by submitting your details below.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-red-600 p-2 text-white">
                                            <Package className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase tracking-tighter text-black">Custom Branding</h4>
                                            <p className="text-sm text-zinc-500 font-medium">Available for bulk orders of plates and dumbbells.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-black p-2 text-white">
                                            <ListChecks className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase tracking-tighter text-black">Facility Design</h4>
                                            <p className="text-sm text-zinc-500 font-medium">Free digital layout consultation included with quotes.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actual Form */}
                            <div className="relative">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white p-12 text-center space-y-6 border-4 border-black shadow-[16px_16px_0px_0px_rgba(220,38,38,1)]"
                                    >
                                        <div className="flex justify-center">
                                            <Package className="h-16 w-16 text-red-600" />
                                        </div>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter text-black">Inquiry Sent</h3>
                                        <p className="text-zinc-500 font-medium text-sm">
                                            Our factory representative will reach out to you on <strong>+91 {formData.phone}</strong> shortly.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            className="w-full bg-black text-white rounded-none uppercase font-black tracking-widest h-14"
                                        >
                                            Submit Another
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white p-8 md:p-12 border-2 border-zinc-200 shadow-2xl relative"
                                    >
                                        <div className="absolute -top-3 -right-3 bg-red-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                                            Factory Direct
                                        </div>

                                        <form onSubmit={handleInquirySubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Select Item Needed</label>
                                                <Select onValueChange={(val: string) => setFormData({ ...formData, item: val })} required>
                                                    <SelectTrigger className="rounded-none border-2 border-zinc-100 h-14 font-extrabold focus:border-red-600 focus:ring-0 transition-all">
                                                        <SelectValue placeholder="Select Item" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-none border-2 border-black">
                                                        <SelectItem value="dumbbells">Rubber Dumbbell</SelectItem>
                                                        <SelectItem value="plates">Rubber Plates</SelectItem>
                                                        <SelectItem value="racks">Full Power Rack</SelectItem>
                                                        <SelectItem value="platform">Deadlift Platform</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Estimated Quantity</label>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter weight in kg"
                                                    required
                                                    value={formData.quantity}
                                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                                    className="rounded-none border-2 border-zinc-100 h-14 font-extrabold focus:border-red-600 focus:ring-0 transition-all placeholder:font-medium"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone Number</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-zinc-200 pr-3 pointer-events-none z-10">
                                                        <span className="text-sm font-black text-black">+91</span>
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        inputMode="numeric"
                                                        placeholder="Enter 10-digit mobile"
                                                        maxLength={10}
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, '');
                                                            if (val.length <= 10) {
                                                                setFormData({ ...formData, phone: val });
                                                            }
                                                        }}
                                                        className="rounded-none border-2 border-zinc-100 h-14 pl-16 font-extrabold focus:border-red-600 focus:ring-0 transition-all placeholder:font-medium"
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-red-600 text-white hover:bg-black rounded-none h-16 uppercase font-black tracking-widest transition-all text-lg group"
                                            >
                                                Submit Inquiry
                                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </form>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] z-0 pointer-events-none" />
            </section>

            {/* Product Detail Popup (Mobile Only) */}
            <AnimatePresence>
                {activeProduct !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveProduct(null)}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm sm:hidden flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-sm p-6 shadow-2xl flex flex-col items-start bg-white border-4 border-black relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest z-10">
                                Product Insight
                            </div>

                            <div className="flex justify-between items-center mb-6 w-full">
                                <div className="h-8 w-8 bg-red-600 flex items-center justify-center text-white">
                                    <Zap className="h-4 w-4" />
                                </div>
                                <button onClick={() => setActiveProduct(null)} className="h-8 w-8 border-2 border-zinc-200 text-zinc-400 hover:text-black hover:border-black flex items-center justify-center transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {products.find(p => p.id === activeProduct) && (
                                <>
                                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-2 text-left text-black leading-none">
                                        {products.find(p => p.id === activeProduct)?.title}
                                    </h4>
                                    <p className="text-red-600 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                                        {products.find(p => p.id === activeProduct)?.subtitle} | {products.find(p => p.id === activeProduct)?.specs}
                                    </p>
                                    <p className="text-sm font-medium leading-relaxed text-left text-zinc-600 mb-8 border-l-2 border-zinc-100 pl-4">
                                        {products.find(p => p.id === activeProduct)?.desc}
                                    </p>

                                    <Button
                                        onClick={() => {
                                            setActiveProduct(null);
                                            scrollToEnquiry();
                                        }}
                                        className="w-full bg-black text-white hover:bg-red-600 rounded-none h-14 uppercase font-black tracking-widest transition-all"
                                    >
                                        Request Factory Quote
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                <h4 className="text-white text-xl font-black uppercase tracking-tighter">Strength View</h4>
                                <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest">{advantageImages[galleryIndex].title}</p>
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
                                src={advantageImages[galleryIndex].src}
                                className="max-h-full max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
                                alt="Gallery View"
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-12 mt-12 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-full">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryIndex((prev) => (prev !== null ? (prev === 0 ? advantageImages.length - 1 : prev - 1) : null));
                                }}
                                className="h-14 w-14 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <span className="text-white font-black font-mono text-lg">
                                {galleryIndex + 1} <span className="text-white/30">/</span> {advantageImages.length}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryIndex((prev) => (prev !== null ? (prev === advantageImages.length - 1 ? 0 : prev + 1) : null));
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
