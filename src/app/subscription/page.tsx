"use client";

import { Check, Info, Users, Tag, Cloud, Download, Gamepad2, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Authentic PlayStation Plus rounded cross inline SVG
const PSPlusLogo = ({ className = "h-8" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg viewBox="0 0 100 100" className="h-full aspect-square text-[#F3C51A]" fill="currentColor">
      <path d="M70,36.5H63.5V30c0-6.9-5.6-12.5-12.5-12.5h-2c-6.9,0-12.5,5.6-12.5,12.5v6.5H30c-6.9,0-12.5,5.6-12.5,12.5v2 c0,6.9,5.6,12.5,12.5,12.5h6.5V70c0,6.9,5.6,12.5,12.5,12.5h2c6.9,0,12.5-5.6,12.5-12.5v-6.5H70c6.9,0,12.5-5.6,12.5-12.5v-2 C82.5,42.1,76.9,36.5,70,36.5z" />
    </svg>
    <span className="font-bold tracking-tight whitespace-nowrap text-black" style={{ fontFamily: 'sans-serif' }}>
      PlayStation Plus
    </span>
  </div>
);

const TIERS = [
  {
    id: "Deluxe",
    name: "DELUXE",
    headerBg: "bg-[#1F1F1F]",
    headerText: "text-[#F3C51A]",
    features: [
      { text: "Classics Catalogue", icon: Gamepad2 },
      { text: "Game Trials", icon: Clock },
      { text: "Game Catalogue", icon: Sparkles },
      { text: "Ubisoft+ Classics", icon: Download },
      { text: "Monthly Games", icon: Gamepad2 },
      { text: "Online Multiplayer", icon: Users },
      { text: "Exclusive Discounts", icon: Tag },
      { text: "Cloud Storage", icon: Cloud },
      { text: "Share Play", icon: Users },
    ],
    plans: [
      { id: "12-Month", priceLabel: "Rs 9,879 every 12 months", price: 9879, badge: "Best value*", subtext: "33% off 12 months versus 1 month" },
      { id: "3-Month", priceLabel: "Rs 2,989 every 3 months", price: 2989 },
      { id: "1-Month", priceLabel: "Rs 1,109 every month", price: 1109 },
    ]
  },
  {
    id: "Extra",
    name: "EXTRA",
    headerBg: "bg-[#F3C51A]",
    headerText: "text-black",
    features: [
      { text: "Game Catalogue", icon: Sparkles },
      { text: "Ubisoft+ Classics", icon: Download },
      { text: "Monthly Games", icon: Gamepad2 },
      { text: "Online Multiplayer", icon: Users },
      { text: "Exclusive Discounts", icon: Tag },
      { text: "Cloud Storage", icon: Cloud },
      { text: "Share Play", icon: Users },
    ],
    plans: [
      { id: "12-Month", priceLabel: "Rs 8,709 every 12 months", price: 8709, badge: "Best value*", subtext: "25% off 12 months versus 1 month" },
      { id: "3-Month", priceLabel: "Rs 2,599 every 3 months", price: 2599 },
      { id: "1-Month", priceLabel: "Rs 979 every month", price: 979 },
    ]
  },
  {
    id: "Essential",
    name: "ESSENTIAL",
    headerBg: "bg-[#EBEBEB]",
    headerText: "text-black",
    features: [
      { text: "Monthly Games", icon: Gamepad2 },
      { text: "Online Multiplayer", icon: Users },
      { text: "Exclusive Discounts", icon: Tag },
      { text: "Exclusive Content", icon: Download },
      { text: "Cloud Storage", icon: Cloud },
      { text: "Share Play", icon: Users },
    ],
    plans: [
      { id: "12-Month", priceLabel: "Rs 3,949 every 12 months", price: 3949, badge: "Best value*", subtext: "34% off 12 months versus 1 month" },
      { id: "3-Month", priceLabel: "Rs 1,199 every 3 months", price: 1199 },
      { id: "1-Month", priceLabel: "Rs 499 every month", price: 499 },
    ]
  }
];

function TierCard({ tier, onSubscribe }: { tier: typeof TIERS[0], onSubscribe: Function }) {
  const [selectedPlan, setSelectedPlan] = useState("12-Month");

  return (
    <div className="min-w-[85vw] md:min-w-0 snap-center bg-white text-black rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className={`${tier.headerBg} px-6 py-5 flex items-center justify-between`}>
        <h3 className={`text-2xl font-black tracking-tight ${tier.headerText}`}>{tier.name}</h3>
      </div>

      {/* Features */}
      <div className="p-6 flex-1 bg-white">
        <div className="space-y-4">
          {tier.features.map((f, idx) => (
            <div key={idx} className="flex items-center gap-4 text-[15px] text-gray-800 font-medium">
              <f.icon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              {f.text}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Options */}
      <div className="p-6 bg-gray-50/80 border-t border-gray-100 flex flex-col gap-3">
        {tier.plans.map(plan => (
          <label 
            key={plan.id} 
            className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedPlan === plan.id 
                ? 'border-[#0070D1] bg-white shadow-sm' 
                : 'border-transparent hover:bg-gray-100 bg-transparent'
            }`}
          >
            <div className="flex flex-col pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-[15px] text-gray-900">{plan.id} Plan</span>
                {plan.badge && (
                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-[3px] font-bold tracking-wide uppercase">
                    {plan.badge}
                  </span>
                )}
              </div>
              <span className="text-[13px] font-semibold text-gray-700">{plan.priceLabel}</span>
              {plan.subtext && <span className="text-[11px] text-gray-500 mt-0.5">{plan.subtext}</span>}
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
              selectedPlan === plan.id ? 'border-[#0070D1]' : 'border-gray-300'
            }`}>
              {selectedPlan === plan.id && <div className="w-3 h-3 bg-[#0070D1] rounded-full" />}
            </div>
          </label>
        ))}
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6 pt-2 bg-gray-50/80">
        <button 
          onClick={() => onSubscribe(tier.id, tier.plans.find(p => p.id === selectedPlan))} 
          className="w-full bg-[#0070D1] hover:bg-[#005fb3] text-white font-bold py-4 rounded-full transition-colors text-[15px] shadow-md shadow-blue-900/10"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function SubscriptionPage() {
  const { addToCart } = useCart();
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24 font-sans selection:bg-blue-200">
      
      {/* Header Section */}
      <div className="pt-20 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <PSPlusLogo className="h-10 md:h-12 scale-110" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-[#1F1F1F] max-w-2xl">
          COMPARE MEMBERSHIP PLANS
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl font-medium leading-relaxed px-4">
          Discover your next great adventure with brand-new catalogues of hundreds of current and classic games, limited-time trials, online multiplayer, member-exclusive discounts and more, with a choice of three membership options.
        </p>
      </div>

      {/* Pricing Tiers Carousel / Grid */}
      <div className="max-w-[1200px] mx-auto relative">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-6 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none scrollbar-hide items-stretch">
          {TIERS.map(tier => (
            <TierCard key={tier.id} tier={tier} onSubscribe={handleSubscribe} />
          ))}
        </div>
        
        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden justify-center items-center gap-2 pb-8 opacity-50">
           <div className="w-8 h-1 bg-[#0070D1] rounded-full"></div>
           <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
           <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
