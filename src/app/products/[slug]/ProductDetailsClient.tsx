"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  CheckCircle2,
  Send,
  ArrowLeft,
  Clock,
  Sparkles,
  X,
  Menu
} from "lucide-react";
import {
  PRODUCTS,
  PRODUCT_RECIPES,
  PRODUCT_SLUG_MAP,
  type Product,
  type Recipe
} from "@/app/products-data";

function getRecipeDetails(recipeName: string) {
  const name = recipeName.toLowerCase();
  if (name.includes("idli")) {
    return {
      time: "20 mins",
      servings: "4 servings",
      ingredients: [
        "2 cups Sri Balaji Idly Rava",
        "1 cup Urad Dal (washed)",
        "Salt to taste",
        "Water for grinding and batter"
      ],
      steps: [
        "Wash and soak urad dal in water for 4 hours.",
        "Grind urad dal to a smooth, fluffy batter.",
        "Wash Sri Balaji Idly Rava, squeeze out water, and mix with the urad dal batter.",
        "Add salt, mix well, and ferment overnight (8-10 hours).",
        "Grease idli plates, pour batter, and steam for 10-12 minutes.",
        "Serve hot with coconut chutney and sambar."
      ]
    };
  } else if (name.includes("dosa")) {
    return {
      time: "15 mins",
      servings: "3 servings",
      ingredients: [
        "1.5 cups Sri Balaji Rava (Bombay/Bansi)",
        "1/2 cup Rice Flour",
        "1/2 cup Curd / Yogurt",
        "1 chopped Onion & Green Chilies",
        "Ghee or oil for cooking"
      ],
      steps: [
        "In a bowl, mix Rava, Rice flour, curd, and water to make a thin watery batter.",
        "Add chopped onions, green chilies, cumin seeds, and salt.",
        "Let the batter rest for 20 minutes.",
        "Heat a tawa, pour batter from outer edge towards center (do not spread).",
        "Drizzle ghee on sides, cook until golden brown and crispy.",
        "Serve hot with potato masala."
      ]
    };
  } else if (name.includes("upma") || name.includes("bath") || name.includes("sheera") || name.includes("halwa")) {
    return {
      time: "15 mins",
      servings: "4 servings",
      ingredients: [
        "1 cup Sri Balaji Bombay/Bansi Suji",
        "2 tablespoons Ghee or Oil",
        "1/2 teaspoon Mustard seeds & Urad dal",
        "1 Onion, finely chopped",
        "Mixed Vegetables (carrots, peas, beans)",
        "2.5 cups Water"
      ],
      steps: [
        "Dry roast Sri Balaji Suji until fragrant (if not pre-roasted). Set aside.",
        "Heat oil/ghee in a pan, temper mustard seeds, urad dal, and curry leaves.",
        "Add onions, green chilies, and vegetables. Sauté until tender.",
        "Pour water and bring to a boil. Add salt to taste.",
        "Reduce heat, add roasted suji slowly while stirring continuously to avoid lumps.",
        "Cover and cook on low heat for 5 minutes. Drizzle ghee and serve."
      ]
    };
  } else {
    return {
      time: "25 mins",
      servings: "4 servings",
      ingredients: [
        "2 cups Sri Balaji Flour/Rice/Poha",
        "1 cup Water or Milk",
        "Spices to taste (cumin, mustard, turmeric)",
        "Fresh herbs (coriander, curry leaves)"
      ],
      steps: [
        "Prepare the base ingredient as per package instructions.",
        "Mix with specified liquids and knead/blend to the desired consistency.",
        "Season with fresh spices, salt, and herbs.",
        "Cook on a medium heat griddle or steam as required.",
        "Serve warm with fresh accompaniments."
      ]
    };
  }
}

export default function ProductDetailsClient({ slug }: { slug: string }) {
  const router = useRouter();

  // Resolve slug
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  const slugConfig = PRODUCT_SLUG_MAP[normalizedSlug];
  const product = slugConfig ? PRODUCTS.find((p: Product) => p.id === slugConfig.id) : null;
  const folderName = slugConfig ? slugConfig.folderName : "";
  const recipes = product ? PRODUCT_RECIPES[product.id] || [] : [];

  // Responsive device type detection state
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

  // Modal & Navigation States
  const [isComingSoonOpen, setIsComingSoonOpen] = useState<boolean>(false);
  const [comingSoonEmail, setComingSoonEmail] = useState<string>("");
  const [comingSoonSuccess, setComingSoonSuccess] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Inquiry States
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", phone: "", quantity: "100 kg", notes: "" });
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Modal Carousel States
  const [activeModalProductIndex, setActiveModalProductIndex] = useState<number>(0);
  const COMING_SOON_PRODUCTS = PRODUCTS.filter((p: Product) => !p.isAvailable);

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
  }, [isComingSoonOpen, COMING_SOON_PRODUCTS.length]);

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

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryProduct(null);
      setFormData({ name: "", phone: "", quantity: "100 kg", notes: "" });
    }, 3000);
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

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-brand-green-dark text-center">
        <div className="max-w-md w-full bg-gradient-to-br from-brand-orange-light to-brand-green-light/20 border-2 border-brand-green/20 rounded-3xl p-8 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-orange flex items-center justify-center mb-6 mx-auto">
            <Sparkles className="w-10 h-10 text-brand-orange" />
          </div>
          <h2 className="text-3xl font-bold text-brand-green-dark mb-3">Product Not Found</h2>
          <p className="text-brand-green-dark/70 text-sm leading-relaxed mb-6">
            The product you are looking for doesn&apos;t exist or has been relocated. Let&apos;s head back to the main catalog.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-brand-green to-brand-green-dark hover:from-brand-green-dark hover:to-brand-green text-white font-bold px-8 py-3 rounded-full text-sm shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </button>
        </div>
      </div>
    );
  }

  // Redirect unavailable products back to home
  if (!product.isAvailable) {
    router.push("/#products");
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-brand-green-dark text-center">
        <div className="max-w-md w-full bg-gradient-to-br from-brand-orange-light to-brand-green-light/20 border-2 border-brand-orange/20 rounded-3xl p-8 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-orange flex items-center justify-center mb-6 mx-auto animate-bounce">
            <div className="text-4xl">🚀</div>
          </div>
          <h2 className="text-3xl font-bold text-brand-green-dark mb-3">Coming Soon!</h2>
          <p className="text-brand-green-dark/70 text-sm leading-relaxed mb-6">
            This product hasn&apos;t launched yet. Stay tuned for exciting updates!
          </p>
          <button
            onClick={() => router.push("/#products")}
            className="bg-gradient-to-r from-brand-orange to-brand-green hover:from-brand-green hover:to-brand-orange text-white font-bold px-8 py-3 rounded-full text-sm shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> View Available Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen relative text-brand-brown-dark font-sans selection:bg-brand-gold/20 selection:text-brand-brown-dark">

      {/* 1. Sticky Glassmorphic Navbar */}
      <header className="sticky top-0 h-[80px] border-b border-[#F1E7D8] bg-[#FAF6F0] z-50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-[140px] h-[60px] mix-blend-multiply">
              <Image
                src="/logo.png"
                alt="Sri Balaji Gold"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 font-bold text-sm text-brand-brown-dark">
            <Link href="/" className="hover:text-brand-gold transition-colors duration-300">Home</Link>
            <Link href="/#products" className="hover:text-brand-gold transition-colors duration-300">Products</Link>
            <Link href="/#about" className="hover:text-brand-gold transition-colors duration-300">Our Story</Link>
            <Link href="/#quality" className="hover:text-brand-gold transition-colors duration-300">Quality</Link>
            <button
              onClick={() => setIsComingSoonOpen(true)}
              className="hover:text-brand-gold transition-colors duration-300 font-bold text-sm text-brand-brown-dark cursor-pointer bg-transparent border-none p-0"
            >
              Coming Soon
            </button>
            <Link href="/#contact" className="hover:text-brand-gold transition-colors duration-300">Contact</Link>
          </nav>

          {/* CTA Header Button */}
          <div className="hidden md:block">
            <Link
              href="/#products"
              className="bg-[#C87445] hover:bg-[#A9582D] text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: '#C87445',
                color: '#ffffff'
              }}
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-brown hover:text-brand-gold transition-colors"
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
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-brand-brown hover:text-brand-gold py-1">Home</Link>
              <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-brand-brown hover:text-brand-gold py-1">Products</Link>
              <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-brand-brown hover:text-brand-gold py-1">Our Story</Link>
              <Link href="/#quality" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-brand-brown hover:text-brand-gold py-1">Quality</Link>
              <button
                onClick={() => { setIsComingSoonOpen(true); setIsMobileMenuOpen(false); }}
                className="font-semibold text-brand-brown hover:text-brand-gold py-1 text-left cursor-pointer bg-transparent border-none p-0"
              >
                Coming Soon
              </button>
              <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-brand-brown hover:text-brand-gold py-1">Contact</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col gap-24">

        {/* Back Button */}
        <div>
          <button
            onClick={() => router.push("/#products")}
            className="group flex items-center gap-2 text-xs font-black uppercase text-brand-brown hover:text-brand-gold transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </button>
        </div>

        {/* SECTION 1: Product Showcase */}
        <section className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left Side: Product Image (Sticky, 500px width) */}
          <div className="w-full lg:w-[500px] flex-shrink-0 lg:sticky lg:top-[120px] z-10">
            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden border border-brand-gold/15 bg-white shadow-2xl flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold-light/20 to-transparent pointer-events-none" />
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  style={product.id === "premium-idly-rava" ? { mixBlendMode: "multiply" } : {}}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="flex-grow flex flex-col text-left">
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-brand-brown-dark leading-tight mb-4">
              {product.name}
            </h1>

            {/* Status Badge */}
            {product.isAvailable ? (
              <div className="inline-flex items-center gap-1.5 border border-[#EAD7CD] bg-[#F8EFEA] text-[#C87445] rounded-full px-4 py-1.5 text-xs font-extrabold w-max mb-8">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Available / In Stock
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 border border-brand-gold/20 bg-brand-gold-light text-brand-gold rounded-full px-4 py-1.5 text-xs font-extrabold w-max mb-8">
                <Clock className="w-3.5 h-3.5" /> Launching Soon / Pre-register
              </div>
            )}

            <p className="text-brand-brown text-base leading-relaxed mb-8 border-b border-brand-green/10 pb-8">
              {product.description}
            </p>

            {/* Features list */}
            <div className="mb-8">
              <h4 className="text-[10px] font-black uppercase text-brand-brown tracking-widest mb-4">Product Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-brand-brown-dark">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <h4 className="text-[10px] font-black uppercase text-brand-brown tracking-widest mb-4">Available Packaging</h4>
              <div className="flex flex-wrap gap-3">
                {product.packSizes.map((size: string, idx: number) => (
                  <div
                    key={idx}
                    className="px-5 py-2.5 rounded-xl border border-brand-gold/20 bg-brand-gold-light/40 text-xs font-extrabold text-brand-brown-dark shadow-sm"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 2: Recipe Gallery */}
      {recipes.length > 0 && (
        <section className="bg-gradient-to-br from-[#F0F5F2] via-[#F8FBF9] to-[#EFF4F1] py-24 border-t border-brand-gold/15 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(230,126,34,0.08),transparent_50%)] pointer-events-none" />
          
          {/* Embed Keyframe Animation Styles */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes steamLeft {
              0% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0; }
              15% { opacity: 0.6; }
              50% { transform: translateY(-40px) scaleX(1.3) scaleY(0.7) translateX(-8px); opacity: 0.35; }
              100% { transform: translateY(-90px) scaleX(1.6) scaleY(0.4) translateX(-16px); opacity: 0; }
            }
            @keyframes steamRight {
              0% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0; }
              15% { opacity: 0.6; }
              50% { transform: translateY(-45px) scaleX(0.7) scaleY(1.3) translateX(8px); opacity: 0.35; }
              100% { transform: translateY(-95px) scaleX(0.4) scaleY(1.6) translateX(16px); opacity: 0; }
            }
            @keyframes glowSteam {
              0%, 100% { opacity: 0.45; filter: blur(8px); }
              50% { opacity: 0.85; filter: blur(14px); }
            }
            @keyframes floatSparkle {
              0% { transform: translateY(10px) translateX(0) scale(0.5); opacity: 0; }
              20% { opacity: 0.8; }
              100% { transform: translateY(-80px) translateX(var(--drift, 10px)) scale(1); opacity: 0; }
            }
          `}} />

          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
              {/* Premium Chef's Ornaments */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-gold" />
                <Sparkles className="w-5 h-5 text-brand-gold animate-pulse" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-gold" />
              </div>
              
              <h2 className="text-6xl sm:text-7xl text-brand-brown-dark tracking-wider relative inline-block mb-3" style={{fontFamily: "'Great Vibes', cursive"}}>
                Recipe Gallery
              </h2>
              <p className="text-[#DAA520] text-xs font-black uppercase tracking-widest mt-2 max-w-lg leading-relaxed">
                Delicious dishes made using Sri Balaji {product.name}
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mt-6 rounded-full" />
            </div>            {/* Grid Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
              {recipes.map((recipe: Recipe, idx: number) => {
                const recipeImagePath = `/recepies/${folderName}/${recipe.image}`;
                const isFailed = failedImages[recipeImagePath];

                const cardInitial = deviceType === "desktop" ? { opacity: 0, y: 30 } : { opacity: 0 };
                const cardWhileInView = deviceType === "desktop" ? { opacity: 1, y: 0 } : { opacity: 1 };
                const cardTransition = deviceType === "desktop"
                  ? ({ duration: 0.5, delay: idx * 0.08, ease: "easeOut" } as const)
                  : ({ duration: 0.4 } as const);

                return (
                  <motion.div
                    key={idx}
                    initial={cardInitial}
                    whileInView={cardWhileInView}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={cardTransition}
                    onClick={() => {
                      if (deviceType === "tablet" || deviceType === "desktop") {
                        setSelectedRecipe(recipe);
                      }
                    }}
                    className={`relative bg-white border-2 border-gray-200 rounded-[32px] p-8 shadow-lg transition-all duration-300 flex flex-col items-center text-center overflow-hidden group ${
                      deviceType === "mobile" ? "" : "cursor-pointer hover:shadow-xl hover:border-brand-gold/30"
                    }`}
                  >
                    {/* 1. Recipe Name (Top) */}
                    <h4 className="font-black text-brand-brown-dark text-xl mb-2 relative z-10" style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                      {recipe.name}
                    </h4>

                    {/* Divider Line */}
                    <div className="w-10 h-0.5 bg-brand-gold/40 transition-all duration-500 rounded-full mb-6 relative z-10" />

                    {/* 2. Recipe Image Container (Below Name) */}
                    <div className={`relative w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-md bg-neutral-50 mb-6 z-10 flex-shrink-0 flex items-center justify-center ${
                      deviceType === "desktop" ? "animate-float-slow group-hover:rotate-5 group-hover:scale-105 transition-all duration-300" : ""
                    }`}>
                      {isFailed ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] flex flex-col items-center justify-center p-4">
                          <div className="relative w-12 h-12 text-brand-gold mb-2 flex items-center justify-center">
                            <Sparkles className="w-10 h-10 animate-pulse" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold">Recipe Ready</span>
                        </div>
                      ) : (
                        <Image
                          src={recipeImagePath}
                          alt={recipe.name}
                          fill
                          className="object-cover transition-transform duration-300"
                          onError={() => setFailedImages(prev => ({ ...prev, [recipeImagePath]: true }))}
                        />
                      )}
                      
                      {/* Inner overlay shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Steam waves & rising golden sparkles particles above the image */}
                    <div className="absolute top-[92px] w-full flex justify-center pointer-events-none z-20">
                      <div className="relative w-44 h-12 overflow-visible">
                        {/* Wavy steam trail 1 */}
                        <div 
                          className="absolute bottom-0 left-[35%] w-3 h-20 bg-gradient-to-t from-white/50 via-brand-gold-light/35 to-transparent rounded-full blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            animation: "steamLeft 2s infinite ease-out",
                          }}
                        />
                        {/* Wavy steam trail 2 */}
                        <div 
                          className="absolute bottom-0 left-[50%] w-4 h-24 bg-gradient-to-t from-white/60 via-brand-gold/25 to-transparent rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            animation: "steamRight 2.5s infinite ease-out",
                            animationDelay: "0.4s"
                          }}
                        />
                        {/* Wavy steam trail 3 */}
                        <div 
                          className="absolute bottom-0 left-[65%] w-2 h-18 bg-gradient-to-t from-white/50 via-brand-gold-light/25 to-transparent rounded-full blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            animation: "steamLeft 1.8s infinite ease-out",
                            animationDelay: "0.8s"
                          }}
                        />

                        {/* Golden light beams/sparkles rising */}
                        <div 
                          className="absolute bottom-1 left-[38%] w-1.5 h-1.5 bg-brand-gold rounded-full filter blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            animation: "floatSparkle 1.8s infinite ease-out",
                            animationDelay: "0.2s",
                            "--drift": "-15px"
                          } as React.CSSProperties}
                        />
                        <div 
                          className="absolute bottom-1 left-[52%] w-1.5 h-1.5 bg-brand-gold-light rounded-full filter blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            animation: "floatSparkle 2.2s infinite ease-out",
                            animationDelay: "0.6s",
                            "--drift": "12px"
                          } as React.CSSProperties}
                        />
                        <div 
                          className="absolute bottom-1 left-[62%] w-1.5 h-1.5 bg-brand-gold rounded-full filter blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            animation: "floatSparkle 2s infinite ease-out",
                            animationDelay: "1s",
                            "--drift": "-8px"
                          } as React.CSSProperties}
                        />

                        {/* Golden Glowing Warmth Aura */}
                        <div 
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-gradient-to-t from-brand-gold/35 to-transparent rounded-full blur-[12px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                          style={{
                            animation: "glowSteam 2s infinite ease-in-out"
                          }}
                        />
                      </div>
                    </div>

                    {/* 3. Short Description (Bottom) */}
                    <p className="text-brand-brown-dark text-sm leading-relaxed max-w-xs mt-2 relative z-10 line-clamp-3">
                      {recipe.description}
                    </p>

                    {/* Attractive Action CTA inside Card */}
                    {deviceType !== "mobile" && (
                      <div className="mt-6 inline-flex items-center gap-1.5 bg-[#C87445]/10 text-[#C87445] group-hover:bg-[#C87445] group-hover:text-white transition-all duration-300 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider relative z-10">
                        <Sparkles className="w-4 h-4" />
                        <span>View Recipe Details</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Side Slide-Over Recipe Detail Panel for Tablet and Desktop */}
      <AnimatePresence>
        {selectedRecipe && (deviceType === "tablet" || deviceType === "desktop") && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="fixed inset-0 z-[60] bg-black"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white z-[70] shadow-2xl flex flex-col border-l border-brand-gold/10"
            >
              <div className="p-6 border-b border-brand-gold/10 flex justify-between items-center bg-brand-gold-light/40">
                <div>
                  <span className="text-[9px] font-black uppercase text-brand-gold tracking-wider block">Recipe Details</span>
                  <h3 className="font-playfair text-xl font-bold text-brand-brown-dark">{selectedRecipe.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-brand-brown hover:text-brand-brown-dark p-2 bg-background hover:bg-gray-100 rounded-full transition-all border-none cursor-pointer flex items-center justify-center"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brand-gold-light border border-brand-gold/10 flex items-center justify-center p-4">
                  <Image
                    src={`/recepies/${folderName}/${selectedRecipe.image}`}
                    alt={selectedRecipe.name}
                    fill
                    className="object-cover"
                    onError={() => {}}
                  />
                </div>

                {(() => {
                  const details = getRecipeDetails(selectedRecipe.name);
                  return (
                    <>
                      <div className="flex justify-around items-center py-3 px-4 bg-brand-gold-light/20 rounded-xl border border-brand-gold/5 text-xs text-brand-brown-dark font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-brand-gold" />
                          <span>Prep Time: {details.time}</span>
                        </div>
                        <div className="w-[1px] h-4 bg-brand-gold/25" />
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-brand-gold" />
                          <span>Serves: {details.servings}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-playfair font-bold text-sm text-brand-brown-dark mb-1.5">About the dish</h4>
                        <p className="text-xs text-brand-brown-dark/80 leading-relaxed">{selectedRecipe.description}</p>
                      </div>

                      <div>
                        <h4 className="font-playfair font-bold text-sm text-brand-brown-dark mb-2">Ingredients Needed</h4>
                        <ul className="space-y-2 p-0 m-0 list-none">
                          {details.ingredients.map((ing, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-brand-brown-dark/90">
                              <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-playfair font-bold text-sm text-brand-brown-dark mb-2">Instructions</h4>
                        <ol className="space-y-3 p-0 m-0 list-none">
                          {details.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs text-brand-brown-dark/90">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C87445] text-white text-[10px] font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Footer */}
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

      {/* 4. Product Inquiry Modal */}
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
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="bg-brand-gold-light text-brand-gold p-4 rounded-full border border-brand-gold/20 mb-4 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-playfair text-xl font-black text-brand-brown-dark mb-2">Inquiry Submitted!</h3>
                  <p className="text-brand-brown text-xs max-w-xs leading-relaxed">
                    Thank you for contacting us. Our sales team will reach out to you within 24 business hours with custom pricing.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative w-12 h-12 rounded-xl border border-brand-gold/25 p-1 bg-background flex-shrink-0">
                      <Image src={inquiryProduct.image} alt={inquiryProduct.name} fill className="object-contain" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-brand-gold tracking-wider block">Bulk Supply Inquiry</span>
                      <h3 className="font-playfair font-bold text-brand-brown-dark text-sm">{inquiryProduct.name}</h3>
                    </div>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4 text-left">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-brand-brown mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter name"
                        className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-brand-brown mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter mobile number"
                        className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-black uppercase text-brand-brown mb-1">Monthly Quantity</label>
                        <select
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="border border-brand-gold/25 rounded-lg px-3.5 py-2.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-brown-dark font-semibold"
                        >
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
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> In Stock
                          </div>
                        ) : (
                          <div className="border border-brand-gold/20 bg-brand-gold-light text-brand-gold rounded-lg px-3.5 py-2.5 text-[10px] font-extrabold text-center flex items-center justify-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Coming Soon
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
                      className="bg-brand-brown hover:bg-brand-brown-dark text-white rounded-lg py-3 font-extrabold text-xs shadow-md mt-2 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {inquiryProduct.isAvailable ? "Request Instant Quote" : "Register For Launch Notification"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Coming Soon Modal */}
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
                                    className="object-contain"
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
                      <ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />
                    </button>
                    <button
                      onClick={nextModalProduct}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-brand-gold/20 p-1.5 rounded-full shadow-md text-brand-brown hover:text-brand-gold transition-all z-10 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    >
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>

                    {/* Indicator dots */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {COMING_SOON_PRODUCTS.map((_: Product, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setActiveModalProductIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
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

// Inline fallback icons for missing references
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
