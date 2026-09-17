"use client";

import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PSPlusLogo = ({ className = "h-8" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg viewBox="0 0 100 100" className="h-full aspect-square text-[#F3C51A]" fill="currentColor">
      {/* Authentic PlayStation Plus rounded cross */}
      <path d="M70,36.5H63.5V30c0-6.9-5.6-12.5-12.5-12.5h-2c-6.9,0-12.5,5.6-12.5,12.5v6.5H30c-6.9,0-12.5,5.6-12.5,12.5v2 c0,6.9,5.6,12.5,12.5,12.5h6.5V70c0,6.9,5.6,12.5,12.5,12.5h2c6.9,0,12.5-5.6,12.5-12.5v-6.5H70c6.9,0,12.5-5.6,12.5-12.5v-2 C82.5,42.1,76.9,36.5,70,36.5z" />
    </svg>
    <span className="font-bold tracking-tight whitespace-nowrap" style={{ fontFamily: 'sans-serif' }}>
      PlayStation Plus
    </span>
  </div>
);

export default function SubscriptionPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = {
    Essential: { monthly: 499, annual: 3949 },
    Extra: { monthly: 749, annual: 6699 },
    Deluxe: { monthly: 849, annual: 7599 }
  };

  const handleSubscribe = (tier: keyof typeof plans) => {
    let cover = "/images/psplus-essential.svg";
    if (tier === "Extra") cover = "/images/psplus-extra.svg";
    if (tier === "Deluxe") cover = "/images/psplus-deluxe.svg";

    const price = plans[tier][billingCycle];
    const typeLabel = billingCycle === 'monthly' ? '1 Month' : '12 Months';

    addToCart({
      gameId: `ps-plus-${tier.toLowerCase()}-${billingCycle}`,
      title: `PlayStation Plus ${tier} - ${typeLabel}`,
      platform: "PS5 • PS4",
      coverImage: cover,
      purchaseType: "permanent",
      price: price
    });
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-white text-black pb-24 font-sans">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden py-24 md:py-32 bg-black flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url('/images/gow-hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          
          {/* Authentic PS Plus Logo */}
          <div className="mb-6 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl inline-block">
            <PSPlusLogo className="h-10 md:h-14 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-6xl font-light mb-4 md:mb-6 tracking-tight max-w-3xl leading-tight text-white">
            Choose your PlayStation Plus plan
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl font-light mb-8 md:mb-10">
            Enjoy all the core PlayStation Plus benefits, hundreds of games in the Game Catalog, as well as exclusive benefits like game trials, cloud streaming, and the Classics Catalog.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 relative z-20">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-colors ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-white hover:text-white/80'}`}
            >
              1 Month
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-colors ${billingCycle === 'annual' ? 'bg-white text-black' : 'text-white hover:text-white/80'}`}
            >
              12 Months
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="container mx-auto px-4 max-w-[1400px] mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ESSENTIAL TIER (Light/Gray styling) */}
          <div className="flex flex-col bg-[#E6E6E6] text-black rounded-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300">
            <div className="p-8 pb-4 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <PSPlusLogo className="h-4 text-black mb-2 opacity-60" />
                  <h3 className="text-4xl font-light tracking-tight">ESSENTIAL</h3>
                </div>
              </div>
              <p className="text-gray-700 text-sm h-16">
                Enhance your PlayStation experience with core features, including online multiplayer access, two PS4 and one PS5 downloadable games to play each month, exclusive discounts, and more.
              </p>
              
              <div className="my-8 h-14">
                <p className="text-xs text-gray-500 mb-1">{billingCycle === 'monthly' ? '1 Month' : '12 Months'}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-medium">₹{plans.Essential[billingCycle]}</span>
                </div>
              </div>

              <Button onClick={() => handleSubscribe("Essential")} className="w-full bg-[#E04F26] hover:bg-[#c94520] text-white rounded-full font-bold py-6 text-lg mb-8">
                Add to Cart
              </Button>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Monthly Games</div>
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Online Multiplayer</div>
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Exclusive Discounts</div>
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Exclusive Content</div>
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Cloud Storage</div>
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Share Play</div>
              </div>
            </div>
          </div>

          {/* EXTRA TIER (Yellow styling) */}
          <div className="flex flex-col bg-[#F3C51A] text-black rounded-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300 relative">
            <div className="p-8 pb-4 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <PSPlusLogo className="h-4 text-black mb-2 opacity-70" />
                  <h3 className="text-4xl font-light tracking-tight">EXTRA</h3>
                </div>
              </div>
              <p className="text-black/80 text-sm h-16">
                Enjoy all the core PlayStation Plus benefits, and explore a world of incredible gaming experiences with the Game Catalog, featuring hundreds of downloadable PS4 and PS5 games.
              </p>
              
              <div className="my-8 h-14">
                <p className="text-xs text-black/60 mb-1">{billingCycle === 'monthly' ? '1 Month' : '12 Months'}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-medium">₹{plans.Extra[billingCycle]}</span>
                </div>
              </div>

              <Button onClick={() => handleSubscribe("Extra")} className="w-full bg-black hover:bg-gray-900 text-white rounded-full font-bold py-6 text-lg mb-8">
                Add to Cart
              </Button>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Game Catalog</div>
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0" /> Ubisoft+ Classics</div>
                <div className="flex gap-4 text-black/50 border-t border-black/10 pt-4"><Check className="h-5 w-5 shrink-0" /> Monthly Games</div>
                <div className="flex gap-4 text-black/50"><Check className="h-5 w-5 shrink-0" /> Online Multiplayer</div>
                <div className="flex gap-4 text-black/50"><Check className="h-5 w-5 shrink-0" /> Exclusive Discounts</div>
                <div className="flex gap-4 text-black/50"><Check className="h-5 w-5 shrink-0" /> Exclusive Content</div>
                <div className="flex gap-4 text-black/50"><Check className="h-5 w-5 shrink-0" /> Cloud Storage</div>
                <div className="flex gap-4 text-black/50"><Check className="h-5 w-5 shrink-0" /> Share Play</div>
              </div>
            </div>
          </div>

          {/* DELUXE TIER (Black/Dark styling) */}
          <div className="flex flex-col bg-[#1A1A1A] text-white border border-gray-800 rounded-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300">
            <div className="p-8 pb-4 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <PSPlusLogo className="h-4 text-white mb-2 opacity-80" />
                  <h3 className="text-4xl font-light tracking-tight">DELUXE</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm h-16">
                Enjoy all the core PlayStation Plus benefits, hundreds of games in the Game Catalog, as well as exclusive benefits like game trials and the Classics Catalog.
              </p>
              
              <div className="my-8 h-14">
                <p className="text-xs text-gray-500 mb-1">{billingCycle === 'monthly' ? '1 Month' : '12 Months'}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-medium">₹{plans.Deluxe[billingCycle]}</span>
                </div>
              </div>

              <Button onClick={() => handleSubscribe("Deluxe")} className="w-full bg-white hover:bg-gray-200 text-black rounded-full font-bold py-6 text-lg mb-8">
                Add to Cart
              </Button>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0 text-[#F3C51A]" /> Classics Catalog</div>
                <div className="flex gap-4"><Check className="h-5 w-5 shrink-0 text-[#F3C51A]" /> Game Trials</div>
                <div className="flex gap-4 text-gray-500 border-t border-gray-800 pt-4"><Check className="h-5 w-5 shrink-0" /> Game Catalog</div>
                <div className="flex gap-4 text-gray-500"><Check className="h-5 w-5 shrink-0" /> Ubisoft+ Classics</div>
                <div className="flex gap-4 text-gray-500"><Check className="h-5 w-5 shrink-0" /> Monthly Games</div>
                <div className="flex gap-4 text-gray-500"><Check className="h-5 w-5 shrink-0" /> Online Multiplayer</div>
                <div className="flex gap-4 text-gray-500"><Check className="h-5 w-5 shrink-0" /> Exclusive Discounts</div>
                <div className="flex gap-4 text-gray-500"><Check className="h-5 w-5 shrink-0" /> Cloud Storage</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
