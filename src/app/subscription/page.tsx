"use client";

import { Users, Tag, Cloud, Download, Gamepad2, Sparkles, Clock, Check, Minus, ShoppingCart, ChevronRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DEMO_GAMES_DETAIL } from "@/lib/mockData";
import Link from "next/link";

const TIERS = [
  {
    id: "Essential",
    name: "ESSENTIAL",
    subtitle: "The essentials to play online",
    features: [
      { text: "Monthly Games", included: true },
      { text: "Online Multiplayer", included: true },
      { text: "Exclusive Discounts", included: true },
      { text: "Cloud Storage", included: true },
      { text: "Share Play", included: true },
      { text: "Game Catalogue", included: false },
      { text: "Ubisoft+ Classics", included: false },
      { text: "Classics Catalogue", included: false },
      { text: "Game Trials", included: false },
    ],
    plans: [
      { id: "12-Month", priceLabel: "₹3,949", monthlyEquivalent: "₹329/month equivalent", price: 3949, badge: "BEST VALUE", savings: "SAVE 34%" },
      { id: "3-Month", priceLabel: "₹1,199", monthlyEquivalent: "₹399/month equivalent", price: 1199 },
      { id: "1-Month", priceLabel: "₹499", monthlyEquivalent: "", price: 499 },
    ]
  },
  {
    id: "Extra",
    name: "EXTRA",
    subtitle: "Hundreds of games to explore",
    features: [
      { text: "Monthly Games", included: true },
      { text: "Online Multiplayer", included: true },
      { text: "Exclusive Discounts", included: true },
      { text: "Cloud Storage", included: true },
      { text: "Share Play", included: true },
      { text: "Game Catalogue", included: true },
      { text: "Ubisoft+ Classics", included: true },
      { text: "Classics Catalogue", included: false },
      { text: "Game Trials", included: false },
    ],
    plans: [
      { id: "12-Month", priceLabel: "₹6,699", monthlyEquivalent: "₹558/month equivalent", price: 6699, badge: "BEST VALUE", savings: "SAVE 25%" },
      { id: "3-Month", priceLabel: "₹1,999", monthlyEquivalent: "₹666/month equivalent", price: 1999 },
      { id: "1-Month", priceLabel: "₹749", monthlyEquivalent: "", price: 749 },
    ]
  },
  {
    id: "Deluxe",
    name: "DELUXE",
    subtitle: "The ultimate gaming experience",
    features: [
      { text: "Monthly Games", included: true },
      { text: "Online Multiplayer", included: true },
      { text: "Exclusive Discounts", included: true },
      { text: "Cloud Storage", included: true },
      { text: "Share Play", included: true },
      { text: "Game Catalogue", included: true },
      { text: "Ubisoft+ Classics", included: true },
      { text: "Classics Catalogue", included: true },
      { text: "Game Trials", included: true },
    ],
    plans: [
      { id: "12-Month", priceLabel: "₹8,709", monthlyEquivalent: "₹725/month equivalent", price: 8709, badge: "BEST VALUE", savings: "SAVE 25%" },
      { id: "3-Month", priceLabel: "₹2,599", monthlyEquivalent: "₹866/month equivalent", price: 2599 },
      { id: "1-Month", priceLabel: "₹979", monthlyEquivalent: "", price: 979 },
    ]
  }
];

function TierCard({ tier, onSubscribe, isActive }: { tier: typeof TIERS[0], onSubscribe: (tierId: string, plan: any) => void, isActive: boolean }) {
  const [selectedPlan, setSelectedPlan] = useState("12-Month");
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      onSubscribe(tier.id, tier.plans.find(p => p.id === selectedPlan));
      setIsAdding(false);
    }, 400);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`min-w-[85vw] md:min-w-0 snap-center relative rounded-[24px] md:rounded-[28px] overflow-hidden flex flex-col transition-all duration-300 ${
        isActive ? 'ring-2 ring-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-[1.02] md:scale-105 z-10' : 'border border-white/10 opacity-70 md:opacity-100 hover:border-white/20 scale-[0.98] md:scale-100 z-0'
      }`}
      style={{
        background: 'linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.9) 100%)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {isActive && (
        <div className="absolute inset-0 bg-blue-500/5 blur-xl pointer-events-none" />
      )}

      {/* Header */}
      <div className="p-6 md:p-8 flex flex-col items-center text-center border-b border-white/5 relative z-10">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2 uppercase">{tier.name}</h3>
        <p className="text-sm md:text-sm text-blue-200/70 font-medium">{tier.subtitle}</p>
      </div>

      {/* Pricing Selector */}
      <div className="p-4 md:p-6 bg-black/20 flex flex-col gap-3 border-b border-white/5 relative z-10">
        {tier.plans.map(plan => (
          <div 
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative flex flex-col p-4 rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden ${
              selectedPlan === plan.id 
                ? 'border-[2px] border-blue-500 bg-blue-500/10' 
                : 'border-[2px] border-transparent hover:bg-white/5 bg-white/5'
            }`}
          >
            {plan.badge && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider">
                {plan.badge}
              </div>
            )}
            <div className="flex justify-between items-start mb-1">
              <span className={`font-bold text-sm tracking-wide uppercase ${selectedPlan === plan.id ? 'text-white' : 'text-gray-300'}`}>
                {plan.id}
              </span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                selectedPlan === plan.id ? 'border-blue-500' : 'border-gray-500'
              }`}>
                <AnimatePresence>
                  {selectedPlan === plan.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-2.5 h-2.5 bg-blue-500 rounded-full" 
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-black tracking-tight ${selectedPlan === plan.id ? 'text-white' : 'text-gray-300'}`}>
                {plan.priceLabel}
              </span>
              {plan.monthlyEquivalent && (
                <span className="text-[12px] text-gray-400 font-medium mt-1">
                  {plan.monthlyEquivalent}
                </span>
              )}
              {plan.savings && (
                <span className="text-[12px] text-blue-400 font-bold mt-1">
                  {plan.savings}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="p-6 md:p-8 flex-1 bg-transparent relative z-10">
        <div className="space-y-4">
          {tier.features.map((f, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-4 text-[14px] md:text-[15px] font-medium transition-all ${
                f.included ? 'text-white' : 'text-gray-500 opacity-60'
              }`}
            >
              {f.included ? (
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-blue-400" strokeWidth={3} />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-gray-600">
                  <Minus className="w-3.5 h-3.5 text-gray-500" strokeWidth={3} />
                </div>
              )}
              <span className={!f.included ? 'line-through decoration-gray-600' : ''}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-4 relative z-10">
        <button 
          onClick={handleAdd}
          disabled={isAdding}
          className="relative w-full h-[56px] rounded-[16px] overflow-hidden group disabled:opacity-80"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-transform duration-300 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold tracking-wide text-[15px]">
            {isAdding ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <span className="flex items-center gap-2 drop-shadow-md">
                ADD TO CART <ShoppingCart className="w-5 h-5 ml-1" />
              </span>
            )}
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function SubscriptionPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Default to Extra (middle) on mobile

  const handleSubscribe = (tierId: string, selectedPlan: any) => {
    let cover = "/images/psplus-essential.svg";
    if (tierId === "Extra") cover = "/images/psplus-extra.svg";
    if (tierId === "Deluxe") cover = "/images/psplus-deluxe.svg";

    addToCart({
      gameId: `ps-plus-${tierId.toLowerCase()}-${selectedPlan.id}`,
      title: `PlayStation Plus ${tierId} - ${selectedPlan.id}`,
      platform: "PS5 • PS4",
      coverImage: cover,
      purchaseType: "permanent",
      price: selectedPlan.price
    });
    router.push('/cart');
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    if(index !== activeIndex && index >= 0 && index < TIERS.length) {
      setActiveIndex(index);
    }
  };

  const allFeatures = [
    "Monthly Games",
    "Online Multiplayer",
    "Exclusive Discounts",
    "Cloud Storage",
    "Share Play",
    "Game Catalogue",
    "Ubisoft+ Classics",
    "Classics Catalogue",
    "Game Trials",
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Hero Section */}
      <div className="pt-28 pb-16 px-4 flex flex-col items-center justify-center text-center relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          NextGen Membership
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white max-w-3xl drop-shadow-2xl">
          LEVEL UP <br className="md:hidden" /> YOUR GAMING
        </h1>
        <p className="text-base md:text-xl text-blue-100/70 max-w-2xl font-medium leading-relaxed px-4">
          Choose the membership that fits the way you play. Unlock exclusive catalogs, cloud saves, online multiplayer, and more.
        </p>
      </div>

      {/* Pricing Tiers Carousel / Grid */}
      <div className="max-w-[1280px] mx-auto relative z-10 mb-24">
        {/* Mobile: Swipe Indicator */}
        <div className="flex md:hidden justify-center items-center gap-2 mb-6">
           <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mr-2">Swipe to Explore</span>
           {TIERS.map((_, idx) => (
             <div 
               key={idx} 
               className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-8 bg-blue-500" : "w-2 bg-white/20"}`} 
             />
           ))}
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-12 px-6 md:px-8 md:grid md:grid-cols-3 md:overflow-visible md:snap-none scrollbar-hide items-stretch py-4"
        >
          {TIERS.map((tier, idx) => (
            <TierCard 
              key={tier.id} 
              tier={tier} 
              onSubscribe={handleSubscribe} 
              isActive={activeIndex === idx || typeof window !== 'undefined' && window.innerWidth >= 768} 
            />
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-[1000px] mx-auto px-6 mb-32 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 tracking-tight">COMPARE MEMBERSHIP BENEFITS</h2>
        
        <div className="hidden md:block rounded-3xl overflow-hidden border border-white/10 bg-[#0f172a]/50 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 text-lg font-medium text-gray-400 w-2/5 border-b border-white/5">Features</th>
                {TIERS.map(tier => (
                  <th key={tier.id} className="p-6 text-xl font-black text-center w-1/5 border-b border-white/5 text-white">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 font-medium text-gray-300 border-b border-white/5 group-last:border-0">{feature}</td>
                  {TIERS.map(tier => {
                    const hasFeature = tier.features.find(f => f.text === feature)?.included;
                    return (
                      <td key={tier.id} className="p-6 text-center border-b border-white/5 border-l border-white/5 group-last:border-b-0">
                        {hasFeature ? (
                          <Check className="w-6 h-6 text-blue-500 mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="w-5 h-5 text-gray-600 mx-auto" strokeWidth={2} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Comparison Layout */}
        <div className="md:hidden space-y-6">
          {TIERS.map(tier => (
            <div key={tier.id} className="rounded-2xl border border-white/10 bg-[#0f172a]/50 p-6">
              <h3 className="text-2xl font-black text-white mb-6 text-center">{tier.name}</h3>
              <div className="space-y-4">
                {allFeatures.map((feature, idx) => {
                  const hasFeature = tier.features.find(f => f.text === feature)?.included;
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${hasFeature ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                      {hasFeature ? (
                        <Check className="w-5 h-5 text-blue-500 shrink-0" strokeWidth={3} />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-600 shrink-0" strokeWidth={2} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storefront Sections (Trending / New Releases) */}
      <div className="max-w-[1280px] mx-auto px-6 pb-32 relative z-10">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <span className="text-blue-500">🔥</span> TRENDING NOW
            </h2>
            <Link href="/games" className="text-blue-400 font-bold text-sm hover:text-blue-300 uppercase tracking-widest hidden md:block">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.values(DEMO_GAMES_DETAIL).slice(0, 4).map(game => (
              <Link href={`/games/${game.slug}`} key={game.slug} className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 block">
                <Image src={game.coverImage} alt={game.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{game.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold text-white">{game.platform}</span>
                    <span className="text-sm font-semibold text-gray-300">{game.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <span className="text-blue-500">🆕</span> NEW RELEASES
            </h2>
            <Link href="/games" className="text-blue-400 font-bold text-sm hover:text-blue-300 uppercase tracking-widest hidden md:block">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.values(DEMO_GAMES_DETAIL).slice(4, 8).map(game => (
              <Link href={`/games/${game.slug}`} key={game.slug} className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 block">
                <Image src={game.coverImage} alt={game.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{game.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold text-white">{game.platform}</span>
                    <span className="text-sm font-semibold text-gray-300">{game.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
