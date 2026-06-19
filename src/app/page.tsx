"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Store,
  Utensils,
  Sprout,
  ShieldCheck,
  Heart,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Send,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Wheat,
  Factory
} from "lucide-react";

// Types and Data
import { PRODUCTS, getProductSlug, type Product } from "./products-data";

const QUALITY_IMAGES = [
  "/quality assurance/triple dust aspiration.png",
  "/quality assurance/sortex.png",
  "/quality assurance/moisturiser.png"
];

const COMING_SOON_PRODUCTS = PRODUCTS.filter(p => !p.isAvailable);

// Helper component for responsive and interactive Product Cards
interface ProductCardProps {
  product: Product;
  deviceType: "mobile" | "tablet" | "desktop";
  router: { push: (url: string) => void };
  index: number;
}

function ProductCard({ product, deviceType, router, index }: ProductCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shadow: false });
  const [isTapped, setIsTapped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (deviceType !== "desktop" || !product.isAvailable) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = ((yc - y) / yc) * 6; // max 6 deg
    const rotateY = ((x - xc) / xc) * 6; // max 6 deg
    setTilt({ rotateX, rotateY, shadow: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shadow: false });
  };

  const initialAnim = deviceType === "desktop" ? { opacity: 0, y: 30 } : (deviceType === "tablet" ? { opacity: 0 } : undefined);
  const whileInViewAnim = deviceType === "desktop" ? { opacity: 1, y: 0 } : (deviceType === "tablet" ? { opacity: 1 } : undefined);
  const transitionAnim = deviceType === "desktop"
    ? ({ duration: 0.6, delay: index * 0.1, ease: "easeOut" } as const)
    : (deviceType === "tablet" ? ({ duration: 0.5 } as const) : undefined);

  return (
    <motion.div
      layout={deviceType !== "mobile"}
      initial={initialAnim}
      whileInView={whileInViewAnim}
      viewport={{ once: true, margin: "-50px" }}
      transition={transitionAnim}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => deviceType !== "desktop" && setIsTapped(true)}
      onTouchEnd={() => deviceType !== "desktop" && setIsTapped(false)}
      style={
        deviceType === "desktop" && product.isAvailable
          ? {
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: "transform 0.1s ease-out, box-shadow 0.3s ease-out",
              boxShadow: tilt.shadow ? "0 25px 50px -12px rgba(200, 116, 69, 0.25)" : "none"
            }
          : undefined
      }
      className={`overflow-hidden rounded-3xl border-2 flex flex-col h-full transition-all duration-300 group scroll-snap-align-center shrink-0 w-[280px] md:w-auto ${
        product.isAvailable
          ? "cursor-pointer border-brand-green-light/20 hover:border-brand-green-light hover:shadow-2xl"
          : "cursor-not-allowed border-gray-200"
      } ${
        deviceType === "tablet" && isTapped ? "scale-[0.98] duration-100" : ""
      } ${
        deviceType === "tablet" && !isTapped ? "active:scale-[1.02] duration-100" : ""
      } ${
        deviceType === "mobile" && isTapped ? "opacity-90 duration-75" : ""
      }`}
      onClick={(e) => {
        if (!product.isAvailable) return;
        if ((e.target as HTMLElement).closest("button")) return;
        router.push(`/products/${getProductSlug(product.name)}`);
      }}
    >
      {/* Image Container with Enhanced Design - WHITE TOP */}
      <div className="relative aspect-square w-full bg-white overflow-hidden flex items-center justify-center p-6 md:p-8">
        <div className="relative w-[85%] h-[85%]">
          {product.isAvailable ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-all duration-500 group-hover:scale-110"
              style={product.id === "premium-idly-rava" ? { mixBlendMode: "multiply" } : {}}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-28 h-28 md:w-36 md:h-36 mx-auto bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded-3xl border-4 border-dashed border-brand-green/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-5xl md:text-6xl">📦</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[6px]">
            <div className="bg-gradient-to-r from-brand-orange to-brand-green text-white px-5 py-2.5 rounded-full text-sm md:text-base font-bold uppercase tracking-wide shadow-2xl border-2 border-white" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
              Launching Next
            </div>
          </div>
        )}
        <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-white/95 backdrop-blur-sm border border-brand-green/20 text-brand-brown-dark text-[8px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-md">
          {product.category}
        </span>
        {product.isAvailable && (
          <span className="absolute top-3 md:top-4 right-3 md:right-4 bg-[#C87445] text-white text-[8px] md:text-[9px] font-bold uppercase tracking-wide px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-md">
            ✓ Available
          </span>
        )}
      </div>

      {/* Description Box with Enhanced Styling - BROWN BOTTOM */}
      <div className="p-4 md:p-6 flex flex-col flex-grow bg-[#F5F0E8]">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-brand-brown-dark mb-2 group-hover:text-brand-brown transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-brand-brown-dark/70 text-xs md:text-sm leading-relaxed mb-3 flex-grow line-clamp-2 md:line-clamp-3">
          {product.description}
        </p>

        <div className="hidden sm:flex flex-col gap-2 mb-4">
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span className="text-xs font-medium text-brand-brown-dark/80">{feat}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-brand-green/10 pt-4 mt-auto">
          {product.isAvailable ? (
            <div className="w-full">
              <span className="text-[9px] md:text-[11px] text-brand-brown-dark uppercase font-semibold block">Available Sizes</span>
              <span className="text-xs md:text-sm font-bold text-brand-brown-dark block mt-1">{product.packSizes.join(" • ")}</span>
            </div>
          ) : (
            <div className="w-full">
              <span className="text-[9px] md:text-[11px] text-brand-gold uppercase font-bold tracking-wider block truncate">Launching Soon</span>
              <span className="text-xs md:text-sm font-bold text-brand-brown-dark/70 block truncate">{product.packSizes.slice(0, 2).join(" / ")}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Ravas", "Healthy Flours", "Premium Rice", "Pohas & Millets"];
  const filteredProducts = selectedCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Product list auto-scroll ref and effect for mobile view
  const productContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (deviceType !== "mobile") return;
    const container = productContainerRef.current;
    if (!container) return;

    // Reset scroll to beginning immediately on mount or filter change
    container.scrollLeft = 0;

    const scrollSpeed = 0.5; // slow, smooth scrolling (pixels per frame)
    let animationFrameId: number;
    let isPaused = false;
    let resumeTimeout: NodeJS.Timeout;

    const scroll = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;
        // Seamless loop: reset to 0 once we've scrolled past the first set of products
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleTouchStart = () => {
      isPaused = true;
      clearTimeout(resumeTimeout);
    };

    const handleTouchEnd = () => {
      // Resume slow motion scroll 3 seconds after user finishes manual swipe/touch
      resumeTimeout = setTimeout(() => {
        isPaused = false;
      }, 3000);
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Start auto-scroll loop after a 1.5s delay to let the user see the first products initially
    const delayTimeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scroll);
    }, 1500);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resumeTimeout);
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [deviceType, filteredProducts]);

  // Ref and scroll transform hook for Quality section parallax
  const qualitySectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: qualitySectionRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", phone: "", quantity: "100 kg", notes: "" });

  // Coming Soon Modal States
  const [isComingSoonOpen, setIsComingSoonOpen] = useState<boolean>(false);
  const [comingSoonEmail, setComingSoonEmail] = useState<string>("");
  const [comingSoonSuccess, setComingSoonSuccess] = useState<boolean>(false);

  // Poster Modal State
  const [isPosterOpen, setIsPosterOpen] = useState<boolean>(true);

  // Slideshow for quality assurance section
  const [currentQualityIndex, setCurrentQualityIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQualityIndex((prev) => (prev + 1) % QUALITY_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentQualityIndex]);

  // Modal Carousel States
  const [activeModalProductIndex, setActiveModalProductIndex] = useState<number>(0);

  const nextModalProduct = () => {
    setActiveModalProductIndex((prev) => (prev + 1) % COMING_SOON_PRODUCTS.length);
  };

  const prevModalProduct = () => {
    setActiveModalProductIndex((prev) => (prev - 1 + COMING_SOON_PRODUCTS.length) % COMING_SOON_PRODUCTS.length);
  };

  useEffect(() => {
    if (!isComingSoonOpen) return;
    const interval = setInterval(() => {
      setActiveModalProductIndex((prev) => (prev + 1) % COMING_SOON_PRODUCTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isComingSoonOpen]);


  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isAvail = inquiryProduct?.isAvailable ?? true;
    const typeHeader = isAvail ? "Quick Price Quote" : "Register Launch Alert";
    
    const message = `*Sri Balaji Gold - Product Inquiry*
---------------------------------------
*Type:* ${typeHeader}
*Product:* ${inquiryProduct?.name || ""}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Quantity/Size:* ${formData.quantity}
*Notes/Details:* ${formData.notes}
---------------------------------------`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919620527147?text=${encodedMessage}`;
    
    setInquirySent(true);
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setInquirySent(false);
      setInquiryProduct(null);
      setFormData({ name: "", phone: "", quantity: "100 kg", notes: "" });
    }, 3000);
  };

  const handleMainInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const product = formData.get("product") as string;
    const requirement = formData.get("requirement") as string;
    const details = formData.get("details") as string;

    const message = `*Sri Balaji Gold - New Inquiry*
---------------------------------------
*Name:* ${name}
*Phone:* ${phone}
*Interested Product:* ${product}
*Requirement:* ${requirement}
*Details:* ${details}
---------------------------------------`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919620527147?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleComingSoonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComingSoonSuccess(true);
    setTimeout(() => {
      setComingSoonSuccess(false);
      setComingSoonEmail("");
      setIsComingSoonOpen(false);
    }, 2500);
  };

  // Enhanced Framer Motion Variants for Premium Animations
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    }
  };

  const modalContainerVariants = {
    hidden: {
      opacity: deviceType === "mobile" ? 1 : 0,
      scale: deviceType === "desktop" ? 0.9 : 1,
      y: deviceType === "mobile" ? "100%" : (deviceType === "tablet" ? 400 : 0)
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: deviceType === "desktop" ? ([0.34, 1.56, 0.64, 1] as [number, number, number, number]) : ("easeOut" as const)
      }
    },
    exit: {
      opacity: deviceType === "mobile" ? 1 : 0,
      scale: deviceType === "desktop" ? 0.9 : 1,
      y: deviceType === "mobile" ? "100%" : (deviceType === "tablet" ? 400 : 0),
      transition: {
        duration: 0.3,
        ease: "easeIn" as const
      }
    }
  };

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const statsCardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    hover: {
      y: -6,
      borderColor: "rgba(200, 116, 69, 0.4)",
      boxShadow: "0 15px 30px -10px rgba(200, 116, 69, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const featureCardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(200, 116, 69, 0.25), 0 10px 10px -5px rgba(200, 116, 69, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    }
  };

  const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    }
  };

  return (
    <div className="bg-background min-h-screen relative text-brand-brown-dark font-sans selection:bg-brand-gold/20 selection:text-brand-brown-dark">
      
      {/* 1. Sticky Glassmorphic Navbar */}
      <header className="sticky top-0 h-[80px] border-b border-[#F1E7D8] bg-[#FAF6F0] z-50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-[140px] h-[60px] mix-blend-multiply">
              <Image
                src="/logo.png"
                alt="Sri Balaji Gold"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 font-bold text-sm text-brand-brown-dark">
            <a href="#hero" className="hover:text-brand-gold transition-colors duration-300">Home</a>
            <a href="#products" className="hover:text-brand-gold transition-colors duration-300">Products</a>
            <a href="#about" className="hover:text-brand-gold transition-colors duration-300">Our Story</a>
            <a href="#quality" className="hover:text-brand-gold transition-colors duration-300">Quality</a>
            <button
              onClick={() => setIsComingSoonOpen(true)}
              className="hover:text-brand-gold transition-colors duration-300 font-bold text-sm text-brand-brown-dark cursor-pointer bg-transparent border-none p-0"
            >
              Coming Soon
            </button>
            <a href="#contact" className="hover:text-brand-gold transition-colors duration-300">Contact</a>
          </nav>

          {/* CTA Header Button */}
          <div className="hidden md:block">
            <a
              href="#products"
              className="bg-[#C87445] hover:bg-[#A9582D] text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: '#C87445',
                color: '#ffffff'
              }}
            >
              Shop Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-brown-dark hover:text-brand-gold transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-[80px] left-0 right-0 bg-white border-b border-brand-gold/10 px-6 py-6 flex flex-col gap-4 shadow-lg z-50 rounded-b-2xl"
            >
              <a
                href="#hero"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="font-semibold text-brand-brown-dark hover:text-brand-gold py-1"
              >
                Home
              </a>
              <a
                href="#products"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="font-semibold text-brand-brown-dark hover:text-brand-gold py-1"
              >
                Products
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="font-semibold text-brand-brown-dark hover:text-brand-gold py-1"
              >
                Our Story
              </a>
              <a
                href="#quality"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('quality')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="font-semibold text-brand-brown-dark hover:text-brand-gold py-1"
              >
                Quality
              </a>
              <button
                onClick={() => { setIsComingSoonOpen(true); setIsMobileMenuOpen(false); }}
                className="font-semibold text-brand-brown-dark hover:text-brand-gold py-1 text-left cursor-pointer bg-transparent border-none p-0"
              >
                Coming Soon
              </button>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-brand-brown-dark hover:text-brand-gold py-1"
              >
                Contact
              </a>
              <a
                href="#products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#C87445] text-white font-bold py-3 rounded-xl text-center text-sm shadow-md mt-2"
              >
                Shop Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="w-full relative">
        <div className="w-full h-[540px] md:h-[620px] overflow-hidden relative bg-background">
          
          {/* Background Images - Different for Mobile and Desktop */}
          <div className="absolute inset-0 w-full h-full z-0 select-none">
            {/* Mobile Banner - newspaper ad */}
            <Image
              src="/hero-banner-mobile.jpeg"
              alt="Sri Balaji Gold Mobile Banner"
              fill
              priority
              className="object-cover object-center md:hidden"
            />
            {/* Desktop Banner */}
            <Image
              src="/hero-banner.png"
              alt="Sri Balaji Gold Desktop Banner"
              fill
              priority
              className="object-cover object-[30%_25%] hidden md:block"
            />
          </div>

          {/* Lighter gradient overlay for desktop only */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-background/50 via-background/20 to-transparent w-[50%] z-10 pointer-events-none" />

          {/* Left Content Positioned Responsive - Hidden on mobile since newspaper ad has text */}
          <div className="hidden md:flex absolute top-[50px] sm:top-[80px] md:top-[120px] left-[24px] md:left-[90px] right-[24px] md:right-auto max-w-full md:max-w-[420px] z-20 flex-col items-start">
            
            {/* Heading text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl sm:text-6xl md:text-[72px] font-bold text-brand-brown-dark leading-[0.95] tracking-tight"
            >
              The Taste <br />
              Every Family
            </motion.h1>
            
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-[56px] font-normal block mt-1"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                background: 'linear-gradient(to right, var(--brand-gold), var(--brand-orange))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Trusts
            </motion.span>

            {/* Description text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-brand-brown-dark text-[14px] md:text-[16px] mt-4 md:mt-6 max-w-[350px] leading-relaxed font-medium"
            >
              For over 40 years, Sri Balaji Gold has been bringing pure, stone-ground flours, ravas, and grains to kitchens across India. Crafted with love, processed for purity.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 w-full sm:w-auto"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#C87445] hover:bg-[#A9582D] text-white rounded-xl px-8 py-3.5 md:py-4 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 text-center w-full sm:w-auto"
                style={{
                  backgroundColor: '#C87445',
                  color: '#ffffff'
                }}
              >
                Shop Now
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-brand-gold text-brand-brown-dark rounded-xl px-8 py-3.5 md:py-4 font-bold text-sm hover:bg-background transition-all duration-300 text-center w-full sm:w-auto"
              >
                Our Story
              </motion.a>
            </motion.div>

          </div>

          {/* Curved Wave Separator at the bottom of the hero banner */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[90px] translate-y-[1px]">
              <path d="M0,40 C450,115 950,10 1440,75 L1440,120 L0,120 Z" fill="var(--background)" />
              <path d="M0,40 C450,115 950,10 1440,75" stroke="var(--brand-gold)" strokeWidth="3" fill="none" className="opacity-80" />
            </svg>
          </div>

        </div>
      </section>

      {/* 2.5. Stats Strip Section (Positioned below Hero, outside image overlay) */}
      <section className="w-full bg-background py-12 md:py-16 border-b border-brand-green/10 relative z-30">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Column 1: 40+ Years */}
          <motion.div 
            variants={statsCardVariants}
            whileHover={deviceType === "desktop" ? "hover" : undefined}
            whileTap={deviceType !== "desktop" ? { scale: 0.98 } : undefined}
            className="bg-white/65 backdrop-blur-sm border border-brand-gold/15 rounded-2xl p-6 flex flex-col items-center shadow-[0_4px_20px_-4px_rgba(230,126,34,0.08)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-brand-gold-light rounded-full flex items-center justify-center border border-brand-gold/25 shadow-inner mb-3.5">
              <Award className="w-6 h-6 text-brand-gold" />
            </div>
            <div className="text-brand-brown-dark font-[800] text-lg md:text-xl leading-snug">40+ Years of</div>
            <div className="text-brand-gold text-[10px] font-black uppercase tracking-widest mt-1">Trusted Quality</div>
          </motion.div>

          {/* Column 2: 1000+ Retailers */}
          <motion.div 
            variants={statsCardVariants}
            whileHover={deviceType === "desktop" ? "hover" : undefined}
            whileTap={deviceType !== "desktop" ? { scale: 0.98 } : undefined}
            className="bg-white/65 backdrop-blur-sm border border-brand-gold/15 rounded-2xl p-6 flex flex-col items-center shadow-[0_4px_20px_-4px_rgba(230,126,34,0.08)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-brand-gold-light rounded-full flex items-center justify-center border border-brand-gold/25 shadow-inner mb-3.5">
              <Store className="w-6 h-6 text-brand-gold" />
            </div>
            <div className="text-brand-brown-dark font-[800] text-lg md:text-xl leading-snug">1000+ Retailers</div>
            <div className="text-brand-gold text-[10px] font-black uppercase tracking-widest mt-1">Across Karnataka</div>
          </motion.div>

          {/* Column 3: Millions */}
          <motion.div 
            variants={statsCardVariants}
            whileHover={deviceType === "desktop" ? "hover" : undefined}
            whileTap={deviceType !== "desktop" ? { scale: 0.98 } : undefined}
            className="bg-white/65 backdrop-blur-sm border border-brand-gold/15 rounded-2xl p-6 flex flex-col items-center shadow-[0_4px_20px_-4px_rgba(230,126,34,0.08)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-brand-gold-light rounded-full flex items-center justify-center border border-brand-gold/25 shadow-inner mb-3.5">
              <Utensils className="w-6 h-6 text-brand-gold" />
            </div>
            <div className="text-brand-brown-dark font-[800] text-lg md:text-xl leading-snug">Millions of Breakfasts</div>
            <div className="text-brand-gold text-[10px] font-black uppercase tracking-widest mt-1">Served with Love</div>
          </motion.div>

        </motion.div>
      </section>

      {/* 3. Heritage Story Section */}
      <motion.section 
        id="about" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20 relative"
      >
        {/* Scattered grains decorative background details */}
        <div className="absolute top-12 left-4 opacity-30 select-none pointer-events-none hidden md:block">
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="text-brand-gold">
            <path d="M10,20 Q20,15 30,30 T50,40" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="20" r="3" fill="currentColor" />
            <circle cx="25" cy="22" r="3" fill="currentColor" />
            <circle cx="38" cy="35" r="3" fill="currentColor" />
            <circle cx="48" cy="42" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-16 right-4 opacity-30 select-none pointer-events-none hidden md:block">
          <svg width="80" height="100" viewBox="0 0 80 100" fill="none" className="text-brand-gold">
            <path d="M20,10 Q40,30 30,60 T60,90" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="10" r="3" fill="currentColor" />
            <circle cx="35" cy="32" r="3" fill="currentColor" />
            <circle cx="28" cy="58" r="3" fill="currentColor" />
            <circle cx="58" cy="88" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Large container card matching target layout */}
        <div className="bg-[#F8EFEA] border border-[#EAD7CD] rounded-3xl md:rounded-[32px] p-5 sm:p-8 md:p-14 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 items-stretch">
            
            {/* Left Column: Text content */}
            <div className="lg:col-span-6 flex flex-col justify-between items-start">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown-dark leading-tight">
                    The Taste of Tradition <br />
                    Since 1980
                  </h2>
                  <div className="w-14 h-14 rounded-full overflow-hidden relative border border-brand-gold/30 bg-white p-1.5 flex-shrink-0 shadow-sm flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Lord Balaji Deity"
                      width={56}
                      height={56}
                      className="object-contain scale-[1.6] object-[10%_center]"
                    />
                  </div>
                </div>

                <div className="text-brand-brown-dark text-sm md:text-base space-y-4 font-medium leading-relaxed">
                  <p>
                    Every morning begins with faith, family, and food. Inspired by the trust of Lord Balaji and the love of mothers, Sri Balaji Gold has been a part of countless breakfast tables for over four decades.
                  </p>
                  <p>
                    From soft idlis and crispy dosas to wholesome upma, our products help families create nutritious meals that bring everyone together.
                  </p>
                  <p>
                    Every pack is hygienically processed, carefully selected, and crafted to deliver purity, taste, and nourishment in every serving.
                  </p>
                </div>
              </div>

              {/* Decorative Rice Grains illustration at the bottom left */}
              <div className="mt-8 flex items-center gap-2 text-brand-gold/60">
                <Wheat className="w-5 h-5 text-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-brown-dark/80">Hygienically Packed & Stone Ground</span>
              </div>
            </div>

            {/* Middle Column: Factory Image */}
            <div className="md:col-span-1 lg:col-span-3">
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-full rounded-2xl overflow-hidden border-2 border-white shadow-md group">
                <Image
                  src="/about_factory.png"
                  alt="Sri Balaji Gold Automated Factory Processing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Family Eating Image */}
            <div className="md:col-span-1 lg:col-span-3">
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-full rounded-2xl overflow-hidden border-2 border-white shadow-md group">
                <Image
                  src="/about_family.png"
                  alt="Family eating healthy breakfast together"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 4. Features Cards Section (Positioned below Heritage Story) */}
      <section className="w-full bg-background py-8 md:py-12 relative z-30">
        <div className="max-w-[1240px] mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            
            {/* Directly Sourced */}
            <motion.div 
              variants={featureCardVariants}
              whileHover={deviceType === "desktop" ? "hover" : undefined}
              whileTap={deviceType !== "desktop" ? { scale: 0.98 } : undefined}
              className="flex items-start gap-4 bg-gradient-to-br from-[#C87445] to-[#6E3314] border border-brand-gold/30 rounded-[20px] p-6 text-white transition-all duration-300 cursor-pointer"
            >
              <div className="bg-white/10 p-3 rounded-xl border border-brand-gold/20 flex-shrink-0">
                <Wheat className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-[16px] md:text-[18px] leading-tight">Directly Sourced From Farmers</h3>
                <p className="text-[#EFE8DC]/85 text-xs leading-relaxed mt-2 font-medium">Premium grains sourced from trusted farming communities.</p>
              </div>
            </motion.div>
            
            {/* Sortex Processed */}
            <motion.div 
              variants={featureCardVariants}
              whileHover={deviceType === "desktop" ? "hover" : undefined}
              whileTap={deviceType !== "desktop" ? { scale: 0.98 } : undefined}
              className="flex items-start gap-4 bg-gradient-to-br from-[#C87445] to-[#6E3314] border border-brand-gold/30 rounded-[20px] p-6 text-white transition-all duration-300 cursor-pointer"
            >
              <div className="bg-white/10 p-3 rounded-xl border border-brand-gold/20 flex-shrink-0">
                <Factory className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-[16px] md:text-[18px] leading-tight">Sortex Processed</h3>
                <p className="text-[#EFE8DC]/85 text-xs leading-relaxed mt-2 font-medium">Advanced technology ensures purity and consistency.</p>
              </div>
            </motion.div>

            {/* Trusted By Mothers */}
            <motion.div 
              variants={featureCardVariants}
              whileHover={deviceType === "desktop" ? "hover" : undefined}
              whileTap={deviceType !== "desktop" ? { scale: 0.98 } : undefined}
              className="flex items-start gap-4 bg-gradient-to-br from-[#C87445] to-[#6E3314] border border-brand-gold/30 rounded-[20px] p-6 text-white transition-all duration-300 cursor-pointer"
            >
              <div className="bg-white/10 p-3 rounded-xl border border-brand-gold/20 flex-shrink-0">
                <Heart className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-[16px] md:text-[18px] leading-tight">Trusted By Mothers</h3>
                <p className="text-[#EFE8DC]/85 text-xs leading-relaxed mt-2 font-medium">Serving generations with nutritious breakfast essentials.</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 5. Product Catalog Showcase Section */}
      <section id="products" className="py-24 bg-white border-y border-brand-green/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: deviceType === "desktop" ? 30 : (deviceType === "mobile" ? 10 : 0) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-black text-brand-gold tracking-widest uppercase mb-3 block">
              OUR CATALOGUE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-brown-dark leading-tight mb-4">
              Explore the Sri Balaji Gold Range
            </h2>
            <p className="text-brand-brown-dark text-base">
              Pure grains, premium flours, and traditional breakfast staples meticulously sorted and packaged for your family.
            </p>

            {/* Filter Tabs */}
            {deviceType === "desktop" ? (
              <div className="flex items-center justify-center gap-8 mt-8 border-b border-[#F1E7D8] pb-2 max-w-max mx-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors duration-300 focus:outline-none ${
                      selectedCategory === cat ? "text-[#C87445]" : "text-brand-brown-dark hover:text-[#C87445]"
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <motion.span
                        layoutId="activeCategoryUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C87445]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-150 ${
                      selectedCategory === cat
                        ? "bg-[#C87445] text-white shadow-lg"
                        : "bg-white text-brand-brown-dark hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Grid / Mobile Horizontal Carousel */}
          {deviceType === "mobile" ? (
            <div
              ref={productContainerRef}
              className="flex overflow-x-auto pb-6 gap-4 overscroll-x-contain scrollbar-none"
            >
              {[...filteredProducts, ...filteredProducts].map((product, index) => (
                <ProductCard
                  key={`${product.id}-mobile-card-${index}`}
                  product={product}
                  deviceType={deviceType}
                  router={router}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.id}-desktop-card-${index}`}
                    product={product}
                    deviceType={deviceType}
                    router={router}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

      {/* 6. Quality Process Section */}
      <motion.section 
        id="quality" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24"
      >
        <div className="bg-[#C87445] text-background rounded-3xl md:rounded-[40px] p-6 sm:p-10 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle golden design bg elements */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-gold opacity-[0.07] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand-gold-light opacity-[0.05] blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between relative z-10">
            {/* Left Content */}
            <div className="w-full lg:w-[58%] flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-white tracking-widest uppercase mb-3 block">
                  OUR GOLD STANDARD
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  Quality Assurance In Every Grain
                </h2>
                <p className="text-white text-base md:text-lg mb-8 leading-relaxed font-medium">
                  Every single packet of Sri Balaji Gold undergoes rigorous testing. From seed selection and farm checks to multi-barrier sorting and hygienic packaging, our state-of-the-art facility guarantees optimal kitchen performance.
                </p>
              </div>

              {/* Desktop View Buttons (hidden on mobile/tablet) */}
              <motion.div 
                variants={staggerContainer}
                className="hidden lg:grid grid-cols-3 gap-4 lg:gap-6"
              >
                <button 
                  onClick={() => setCurrentQualityIndex(0)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                    currentQualityIndex === 0 
                      ? "bg-white/10 border-brand-gold/40 shadow-lg" 
                      : "border-transparent bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="font-serif text-2xl font-bold text-white mb-1">01</div>
                  <motion.div 
                    initial={deviceType === "desktop" ? { width: 0 } : { width: "100%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                    className="h-[1px] bg-brand-gold/30 my-2"
                  />
                  <motion.div
                    initial={deviceType === "desktop" ? { opacity: 0, x: -15 } : (deviceType === "tablet" ? { opacity: 0 } : {})}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={deviceType === "desktop" ? { duration: 0.6, ease: "easeOut", delay: 0.3 } : (deviceType === "tablet" ? { duration: 0.6 } : {})}
                  >
                    <div className="font-serif font-bold text-white mb-1 text-sm">Triple Dust Aspiration</div>
                    <p className="text-white text-[11px] leading-relaxed">Grains pass through localized high-pressure aspiration tubes to completely clear dust.</p>
                  </motion.div>
                </button>
                
                <button 
                  onClick={() => setCurrentQualityIndex(1)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                    currentQualityIndex === 1 
                      ? "bg-white/10 border-brand-gold/40 shadow-lg" 
                      : "border-transparent bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="font-serif text-2xl font-bold text-white mb-1">02</div>
                  <motion.div 
                    initial={deviceType === "desktop" ? { width: 0 } : { width: "100%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                    className="h-[1px] bg-brand-gold/30 my-2"
                  />
                  <motion.div
                    initial={deviceType === "desktop" ? { opacity: 0, x: -15 } : (deviceType === "tablet" ? { opacity: 0 } : {})}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={deviceType === "desktop" ? { duration: 0.6, ease: "easeOut", delay: 0.4 } : (deviceType === "tablet" ? { duration: 0.6 } : {})}
                  >
                    <div className="font-serif font-bold text-white mb-1 text-sm">Color Sortex Sort</div>
                    <p className="text-white text-[11px] leading-relaxed">Advanced infrared optical sensors analyze every grain, separating off-color seeds.</p>
                  </motion.div>
                </button>
                
                <button 
                  onClick={() => setCurrentQualityIndex(2)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                    currentQualityIndex === 2 
                      ? "bg-white/10 border-brand-gold/40 shadow-lg" 
                      : "border-transparent bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="font-serif text-2xl font-bold text-white mb-1">03</div>
                  <motion.div 
                    initial={deviceType === "desktop" ? { width: 0 } : { width: "100%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                    className="h-[1px] bg-brand-gold/30 my-2"
                  />
                  <motion.div
                    initial={deviceType === "desktop" ? { opacity: 0, x: -15 } : (deviceType === "tablet" ? { opacity: 0 } : {})}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={deviceType === "desktop" ? { duration: 0.6, ease: "easeOut", delay: 0.5 } : (deviceType === "tablet" ? { duration: 0.6 } : {})}
                  >
                    <div className="font-serif font-bold text-white mb-1 text-sm">Moisture Control</div>
                    <p className="text-white text-[11px] leading-relaxed">Precisely audited moisture limits preserve natural oils, ensuring long shelf life.</p>
                  </motion.div>
                </button>
              </motion.div>

              {/* Mobile / Tablet cards showing image and content (hidden on desktop) */}
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:hidden mt-8"
              >
                {/* Card 01 */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col bg-white/5 rounded-2xl p-4 border border-white/10 shadow-lg"
                >
                  <motion.div 
                    initial={deviceType === "tablet" ? { clipPath: "inset(0 0 100% 0)" } : undefined}
                    whileInView={deviceType === "tablet" ? { clipPath: "inset(0 0 0 0)" } : undefined}
                    transition={deviceType === "tablet" ? { duration: 0.8, ease: "easeOut" } : undefined}
                    className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 mb-4 shadow-md bg-black/10"
                  >
                    <Image
                      src="/quality assurance/triple dust aspiration.png"
                      alt="Triple Dust Aspiration"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div>
                    <div className="font-serif text-xl font-bold text-white mb-1">01</div>
                    <div className="h-[1px] bg-brand-gold/30 my-2 w-full" />
                    <motion.div
                      initial={deviceType === "tablet" ? { opacity: 0 } : undefined}
                      whileInView={deviceType === "tablet" ? { opacity: 1 } : undefined}
                      transition={deviceType === "tablet" ? { duration: 0.6 } : undefined}
                    >
                      <div className="font-serif font-bold text-white mb-1 text-sm">Triple Dust Aspiration</div>
                      <p className="text-white text-[11px] leading-relaxed">Grains pass through localized high-pressure aspiration tubes to completely clear dust.</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card 02 */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col bg-white/5 rounded-2xl p-4 border border-white/10 shadow-lg"
                >
                  <motion.div 
                    initial={deviceType === "tablet" ? { clipPath: "inset(0 0 100% 0)" } : undefined}
                    whileInView={deviceType === "tablet" ? { clipPath: "inset(0 0 0 0)" } : undefined}
                    transition={deviceType === "tablet" ? { duration: 0.8, ease: "easeOut" } : undefined}
                    className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 mb-4 shadow-md bg-black/10"
                  >
                    <Image
                      src="/quality assurance/sortex.png"
                      alt="Color Sortex Sort"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div>
                    <div className="font-serif text-xl font-bold text-white mb-1">02</div>
                    <div className="h-[1px] bg-brand-gold/30 my-2 w-full" />
                    <motion.div
                      initial={deviceType === "tablet" ? { opacity: 0 } : undefined}
                      whileInView={deviceType === "tablet" ? { opacity: 1 } : undefined}
                      transition={deviceType === "tablet" ? { duration: 0.6 } : undefined}
                    >
                      <div className="font-serif font-bold text-white mb-1 text-sm">Color Sortex Sort</div>
                      <p className="text-white text-[11px] leading-relaxed">Advanced infrared optical sensors analyze every grain, separating off-color seeds.</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card 03 */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col bg-white/5 rounded-2xl p-4 border border-white/10 shadow-lg"
                >
                  <motion.div 
                    initial={deviceType === "tablet" ? { clipPath: "inset(0 0 100% 0)" } : undefined}
                    whileInView={deviceType === "tablet" ? { clipPath: "inset(0 0 0 0)" } : undefined}
                    transition={deviceType === "tablet" ? { duration: 0.8, ease: "easeOut" } : undefined}
                    className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 mb-4 shadow-md bg-black/10"
                  >
                    <Image
                      src="/quality assurance/moisturiser.png"
                      alt="Moisture Control"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div>
                    <div className="font-serif text-xl font-bold text-white mb-1">03</div>
                    <div className="h-[1px] bg-brand-gold/30 my-2 w-full" />
                    <motion.div
                      initial={deviceType === "tablet" ? { opacity: 0 } : undefined}
                      whileInView={deviceType === "tablet" ? { opacity: 1 } : undefined}
                      transition={deviceType === "tablet" ? { duration: 0.6 } : undefined}
                    >
                      <div className="font-serif font-bold text-white mb-1 text-sm">Moisture Control</div>
                      <p className="text-white text-[11px] leading-relaxed">Precisely audited moisture limits preserve natural oils, ensuring long shelf life.</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Slideshow (Desktop only) */}
            <div 
              ref={qualitySectionRef}
              className="hidden lg:block w-[38%] relative aspect-square max-w-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQualityIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-[120%] -top-[10%]"
                  style={{ y: deviceType === "desktop" ? imageY : 0 }}
                >
                  <Image
                    src={QUALITY_IMAGES[currentQualityIndex]}
                    alt={
                      currentQualityIndex === 0 
                        ? "Triple Dust Aspiration" 
                        : currentQualityIndex === 1 
                          ? "Color Sortex Sort" 
                          : "Moisture Control"
                    }
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay shadow for rich look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Slide indicators / Progress Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {QUALITY_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQualityIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentQualityIndex === idx ? "w-8 bg-brand-gold" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. Contact / Inquiry Section */}
      <motion.section 
        id="contact" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-12 md:py-24 bg-background border-t border-brand-green/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-black text-brand-gold tracking-widest uppercase mb-3 block">
              PARTNERSHIP & INQUIRIES
            </span>
            <h2 className="font-serif text-4xl font-bold text-brand-brown-dark leading-tight mb-6">
              Become a Retailer or Get Bulk Supplies
            </h2>
            <p className="text-brand-brown-dark mb-8 leading-relaxed">
              We supply retail giants, supermarkets, and local grocery stores with premium flour and grains. Send us a message to request custom bulk price catalogues or samples.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-gold-light text-brand-gold p-3 rounded-xl border border-brand-gold/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown-dark text-sm">Main Processing Unit</h4>
                  <p className="text-brand-brown-dark text-xs mt-1">Sri Venkatalaxmi Agro Foods, Marlanhalli, Karatagi, Koppal District, Karnataka, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-gold-light text-brand-gold p-3 rounded-xl border border-brand-gold/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown-dark text-sm">Customer Helpline</h4>
                  <p className="text-brand-brown-dark text-xs mt-1">
                    <a href="tel:+919620527147" className="hover:underline">+91 96205 27147</a> /{" "}
                    <a href="tel:+919019174747" className="hover:underline">+91 90191 74747</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-gold-light text-brand-gold p-3 rounded-xl border border-brand-gold/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-brown-dark text-sm">Email Support</h4>
                  <p className="text-brand-brown text-xs mt-1">
                    <a href="mailto:Chandukolli@svagrofoods.biz" className="hover:underline">Chandukolli@svagrofoods.biz</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-brand-gold/15 rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-brand-brown-dark mb-2">Send an Inquiry</h3>
              <p className="text-brand-brown-dark text-xs mb-6">Our sales representative will connect with you within 24 business hours.</p>

              <form onSubmit={handleMainInquirySubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase text-brand-brown-dark mb-1.5">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter name"
                      className="border border-brand-gold/30 rounded-xl px-4 py-3 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase text-brand-brown-dark mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter mobile number"
                      className="border border-brand-gold/30 rounded-xl px-4 py-3 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase text-brand-brown-dark mb-1.5">Interested Product</label>
                    <select
                      name="product"
                      className="border border-brand-gold/30 rounded-xl px-4 py-3 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-brand-brown-dark font-semibold appearance-none"
                    >
                      <option>All Products Catalogue</option>
                      {PRODUCTS.map(p => (
                        <option key={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase text-brand-brown-dark mb-1.5">Approx. Monthly Requirement</label>
                    <input
                      type="text"
                      name="requirement"
                      placeholder="e.g. 500 kg"
                      className="border border-brand-gold/30 rounded-xl px-4 py-3 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase text-brand-brown-dark mb-1.5">Message / Delivery Address Details</label>
                  <textarea
                    rows={4}
                    name="details"
                    placeholder="Enter details..."
                    className="border border-brand-gold/30 rounded-xl px-4 py-3 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-brand-brown-dark font-semibold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C87445] hover:bg-[#A9582D] text-white rounded-xl py-4 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                  style={{
                    backgroundColor: '#C87445',
                    color: '#ffffff'
                  }}
                >
                  <Send className="w-5 h-5" />
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 8. Footer */}
      <footer className="w-full bg-gradient-to-r from-[#A9582D] via-[#C87445] to-[#DE8857] text-white border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-6">
            {/* Left: Logo & Brand Name */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white p-0.5">
                <Image src="/logo.png" alt="Sri Balaji Gold Logo" fill className="object-contain" />
              </div>
              <span className="font-serif font-black text-base tracking-[0.28em] text-white whitespace-nowrap">SRI BALAJI GOLD</span>
            </div>

            {/* Center: Copyright Text */}
            <div className="flex-1 text-center px-4">
              <p className="m-0 text-xs sm:text-sm leading-relaxed text-background/75">
                © {new Date().getFullYear()} Sri Venkatalaxmi Agro Foods. All Rights Reserved.
              </p>
            </div>

            {/* Right: Privacy & Terms Links */}
            <div className="flex items-center gap-6 shrink-0">
              <a 
                href="#" 
                className="text-xs sm:text-sm text-background/70 transition-colors duration-300 hover:text-white whitespace-nowrap"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-xs sm:text-sm text-background/70 transition-colors duration-300 hover:text-white whitespace-nowrap"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Bottom Row: Designer Credit */}
          <div className="border-t border-white/5 pt-4">
            <p className="text-center text-[10px] sm:text-xs text-background/50 leading-relaxed">
              Designed &amp; Developed by{' '}
              <a
                href="https://unifirolabs.com"
                className="text-background/60 no-underline transition-all duration-300 hover:text-background/90"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                UnifiroLabs
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* 9. Product Inquiry Modal */}
      <AnimatePresence>
        {inquiryProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-brand-gold/20 rounded-[32px] max-w-md w-full p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setInquiryProduct(null)}
                className="absolute top-6 right-6 text-brand-brown hover:text-brand-brown-dark p-1 bg-background rounded-full"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              {inquirySent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-brand-gold-light text-brand-gold p-4 rounded-full border border-brand-gold/20 mb-4 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-playfair text-xl font-black text-brand-brown-dark mb-2">
                    {inquiryProduct.isAvailable ? "Request Submitted!" : "Registration Complete!"}
                  </h3>
                  <p className="text-brand-brown-light text-xs max-w-xs">
                    {inquiryProduct.isAvailable ? (
                      <>We have received your interest in <strong>{inquiryProduct.name}</strong>. Our representative will contact you shortly!</>
                    ) : (
                      <>We will notify you immediately at this number as soon as <strong>{inquiryProduct.name}</strong> launches in your region!</>
                    )}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-background border border-brand-gold/15 p-1 flex-shrink-0">
                      <Image
                        src={inquiryProduct.image}
                        alt={inquiryProduct.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-brand-gold tracking-wider block mb-0.5">
                        {inquiryProduct.isAvailable ? "Quick Price Quote" : "Register Launch Alert"}
                      </span>
                      <h3 className="font-playfair text-lg font-extrabold text-brand-brown-dark leading-tight">{inquiryProduct.name}</h3>
                    </div>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-brand-brown mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-brand-brown mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-black uppercase text-brand-brown mb-1">
                          {inquiryProduct.isAvailable ? "Quantity Needed" : "Interested Size"}
                        </label>
                        <select
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                        >
                          {inquiryProduct.packSizes.map((size, idx) => (
                            <option key={idx}>{size}</option>
                          ))}
                          {!inquiryProduct.isAvailable && <option>All Sizes / Retail packs</option>}
                          {inquiryProduct.isAvailable && (
                            <>
                              <option>50 kg (Trial)</option>
                              <option>100 kg</option>
                              <option>500 kg+</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-black uppercase text-brand-brown mb-1">Availability</label>
                        {inquiryProduct.isAvailable ? (
                          <div className="border border-[#EAD7CD] bg-[#F8EFEA] text-[#C87445] rounded-lg px-3.5 py-2.5 text-[10px] font-extrabold text-center flex items-center justify-center gap-1">
                            <Sparkles className="w-3 h-3 animate-pulse" /> In Stock
                          </div>
                        ) : (
                          <div className="border border-brand-gold/20 bg-brand-gold-light text-brand-gold rounded-lg px-3.5 py-2.5 text-[10px] font-extrabold text-center flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" /> Coming Soon
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-brand-brown mb-1">
                        {inquiryProduct.isAvailable ? "Delivery Details / Questions" : "Your City / Custom Requirements"}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Enter details..."
                        className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-brown hover:bg-brand-brown-dark text-white rounded-lg py-4 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 mt-4 flex items-center justify-center gap-2 cursor-pointer border-none"
                      style={{
                        backgroundColor: 'var(--brand-brown)',
                        color: '#ffffff',
                        fontWeight: 'bold'
                      }}
                    >
                      <Send className="w-4 h-4" />
                      <span>{inquiryProduct.isAvailable ? "Submit Inquiry" : "Register For Launch"}</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons - Developer (Left) & WhatsApp (Right) */}
      
      {/* Developer Credit Button - Bottom Left */}
      <motion.a
        href="https://unifirolabs.com"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 left-6 z-40 bg-[#0A1628] hover:bg-[#0F1D35] text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2.5 group border border-white/5"
      >
        <span className="text-[10px] text-[#60A5FA]">⚡</span>
        <span className="text-xs font-medium whitespace-nowrap">
          Developed by <span className="font-bold text-white">Unifirolabs</span>
        </span>
        <X className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
      </motion.a>

      {/* WhatsApp Floating Button - Bottom Right */}
      <motion.a
        href="https://wa.me/919620527147"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>

      {/* Poster Modal - Auto-open on page load */}
      <AnimatePresence>
        {isPosterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 md:p-12"
          >
            <motion.a
              href="https://www.instagram.com/sribalajigoldproducts"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-md md:max-w-lg w-full cursor-pointer"
              onClick={() => setIsPosterOpen(false)}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsPosterOpen(false);
                }}
                className="absolute -top-3 -right-3 z-10 bg-white hover:bg-gray-100 text-brand-brown-dark p-2.5 rounded-full shadow-2xl transition-all hover:scale-110"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Poster Image */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl ring-2 ring-white/20">
                <Image
                  src="/poster.jpeg"
                  alt="Old Trust New Aura Same Taste - Sri Balaji Gold"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. Recipes / Coming Soon Modal */}
      <AnimatePresence>
        {isComingSoonOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex ${
              deviceType === "mobile" ? "items-end p-0" : "items-center justify-center p-4"
            }`}
          >
            <motion.div
              variants={modalContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag={deviceType === "mobile" ? "y" : false}
              dragConstraints={{ top: 0, bottom: 300 }}
              dragElastic={0.15}
              onDragEnd={(event, info) => {
                if (deviceType === "mobile" && info.offset.y > 150) {
                  setIsComingSoonOpen(false);
                }
              }}
              className={`bg-white border border-brand-gold/25 relative ${
                deviceType === "mobile"
                  ? "w-full h-[80vh] rounded-t-[32px] rounded-b-none p-6 pb-12 overflow-y-auto"
                  : "rounded-[32px] max-w-3xl w-full p-6 sm:p-8 shadow-2xl"
              }`}
            >
              {deviceType === "mobile" && (
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              )}

              <button
                onClick={() => setIsComingSoonOpen(false)}
                className="absolute top-6 right-6 text-brand-brown hover:text-brand-brown-dark p-1 bg-background rounded-full z-10"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              {comingSoonSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-brand-gold-light text-brand-gold p-4 rounded-full border border-brand-gold/20 mb-4 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-playfair text-2xl font-black text-brand-brown-dark mb-2">Registered Successfully!</h3>
                  <p className="text-brand-brown text-sm max-w-xs leading-relaxed">
                    Thank you! We will notify you immediately as soon as our premium products are launched in your region!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Column: Product Showcase Carousel */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-background border border-brand-green/10 flex flex-col justify-between p-4 group">
                    {/* Active product slide */}
                    <div className="relative flex-grow w-full h-[70%]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeModalProductIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="relative w-full h-full bg-gradient-to-br from-brand-gold-light/30 to-background flex flex-col items-center justify-center p-4">
                            {COMING_SOON_PRODUCTS[activeModalProductIndex] && (
                              <>
                                <motion.div
                                  key={`modal-img-${activeModalProductIndex}`}
                                  initial={{ y: -50, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: 0.55
                                  }}
                                  className="relative w-36 h-36 mb-2"
                                >
                                  <Image
                                    src={COMING_SOON_PRODUCTS[activeModalProductIndex].image}
                                    alt={COMING_SOON_PRODUCTS[activeModalProductIndex].name}
                                    fill
                                    className="object-contain blur-2xl opacity-60 pointer-events-none select-none"
                                  />
                                </motion.div>
                                <div className="text-center">
                                  <h3 className="font-serif text-xl font-black text-brand-gold mb-1">
                                    COMING SOON
                                  </h3>
                                  <div className="flex items-center justify-center gap-2">
                                    <div className="w-6 h-[1px] bg-brand-gold/60"></div>
                                    <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                                    <div className="w-6 h-[1px] bg-brand-gold/60"></div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Product Meta details */}
                    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-brand-gold/10 text-center relative z-10">
                      <span className="text-[9px] font-black uppercase text-brand-gold tracking-wider block">
                        {COMING_SOON_PRODUCTS[activeModalProductIndex]?.category || ""}
                      </span>
                      <h4 className="font-playfair font-bold text-brand-brown-dark text-sm mt-0.5">
                        {COMING_SOON_PRODUCTS[activeModalProductIndex]?.name || ""}
                      </h4>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[8px] font-black tracking-wide uppercase bg-brand-gold/15 text-brand-gold rounded-md border border-brand-gold/25">
                        Launching Soon
                      </span>
                    </div>

                    {/* Carousel Controls */}
                    <button
                      onClick={prevModalProduct}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-brand-gold/20 p-1.5 rounded-full shadow-md text-brand-brown hover:text-brand-gold transition-all z-10 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    >
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                    <button
                      onClick={nextModalProduct}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-brand-gold/20 p-1.5 rounded-full shadow-md text-brand-brown hover:text-brand-gold transition-all z-10 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Indicator dots */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {COMING_SOON_PRODUCTS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveModalProductIndex(idx)}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            activeModalProductIndex === idx ? "w-4 bg-brand-gold" : "w-1 bg-brand-gold/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Form & Info */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gold-light border border-brand-gold/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-brand-gold tracking-wider">New Product Range</span>
                    </div>
                    <h3 className="font-playfair text-2xl sm:text-3xl font-[800] text-brand-brown-dark leading-tight mb-3">
                      Coming Soon to Your Kitchen
                    </h3>
                    <p className="text-brand-brown text-xs leading-relaxed mb-6">
                      We are expanding our range with premium stone-ground flours, double-roasted ravas, and clean, nutritious millets. Register below to receive launch alerts and exclusive early-bird samples!
                    </p>

                    <form onSubmit={handleComingSoonSubmit} className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-black uppercase text-brand-brown mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={comingSoonEmail}
                          onChange={(e) => setComingSoonEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold w-full"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-brand-brown hover:bg-brand-brown-dark text-white rounded-lg py-3 font-extrabold text-xs shadow-md mt-2 flex items-center justify-center gap-2 w-full transition-all duration-300"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Get Launch Invitation
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
