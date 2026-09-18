import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/plus")({
  component: PlusPage,
});

const pricing = {
  "1 Month": { essential: "₹499", extra: "₹749", premium: "₹849" },
  "3 Months": { essential: "₹1,199", extra: "₹1,999", premium: "₹2,299" },
  "12 Months": { essential: "₹3,949", extra: "₹6,699", premium: "₹7,599" },
};

type Duration = keyof typeof pricing;

function PlusPage() {
  const [duration, setDuration] = useState<Duration>("1 Month");

  return (
    <main className="min-h-screen bg-[#1F1F1F]">
      {/* Hero Section */}
      <section className="relative bg-black pt-20 pb-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/horizon-forbidden-west-wide.jpg" alt="PS Plus Hero" className="size-full object-cover opacity-50 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-transparent to-black/80" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Plus className="text-[#00439c] size-8 stroke-[3]" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white drop-shadow-md">PlayStation Plus</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light leading-tight max-w-4xl mx-auto text-white drop-shadow-xl">
            Choose your <span className="font-bold">PlayStation Plus</span> membership plan
          </h1>
        </div>
      </section>

      {/* Subscription Pricing Section */}
      <section className="px-4 pb-24 sm:px-6 relative z-20 -mt-10" id="subscriptions">
        <div className="mx-auto max-w-7xl">
          
          {/* Duration Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#2A2A2A] rounded-full p-1.5 flex items-center gap-1">
              {(["1 Month", "3 Months", "12 Months"] as Duration[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                    duration === d ? "bg-white text-black" : "text-white hover:bg-white/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* Deluxe / Premium Tier */}
            <div className="flex flex-col bg-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-300">
              <div className="bg-[#111111] p-10 text-white flex-1 border-b-[6px] border-[#333]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Plus className="text-black size-4 stroke-[3]" />
                  </div>
                  <span className="text-2xl font-light tracking-widest uppercase">PlayStation Plus</span>
                </div>
                <h3 className="text-5xl font-light mb-8">Deluxe</h3>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold">{pricing[duration].premium}</span>
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-white text-black hover:bg-gray-200 mb-10">
                  Add to Cart
                </Button>

                <p className="font-bold text-lg mb-6">Enjoy all PlayStation Plus benefits from the Extra and Essential plans, plus exclusive benefits like game trials, cloud streaming, and the Classics Catalog.</p>

                <ul className="space-y-4">
                  {["Game trials", "Classics Catalog", "Game Catalog", "Ubisoft+ Classics", "Monthly games", "Online multiplayer", "Exclusive discounts", "Cloud storage"].map((feat, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Check className="size-5 text-white shrink-0" strokeWidth={2} />
                      <span className="text-gray-300">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Extra Tier */}
            <div className="flex flex-col bg-[#FFCC00] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-300">
              <div className="bg-[#FFCC00] p-10 text-black flex-1 border-b-[6px] border-[#E6B800]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <Plus className="text-[#FFCC00] size-4 stroke-[3]" />
                  </div>
                  <span className="text-2xl font-light tracking-widest uppercase">PlayStation Plus</span>
                </div>
                <h3 className="text-5xl font-light mb-8">Extra</h3>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold">{pricing[duration].extra}</span>
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-black text-white hover:bg-gray-800 mb-10">
                  Add to Cart
                </Button>

                <p className="font-bold text-lg mb-6">Discover a huge catalog of incredible PS4 and PS5 games, plus all Essential benefits.</p>

                <ul className="space-y-4">
                  {["Game Catalog", "Ubisoft+ Classics", "Monthly games", "Online multiplayer", "Exclusive discounts", "Cloud storage"].map((feat, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Check className="size-5 text-black shrink-0" strokeWidth={2} />
                      <span className="text-gray-900">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Essential Tier */}
            <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-300">
              <div className="bg-white p-10 text-black flex-1 border-b-[6px] border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <Plus className="text-white size-4 stroke-[3]" />
                  </div>
                  <span className="text-2xl font-light tracking-widest uppercase">PlayStation Plus</span>
                </div>
                <h3 className="text-5xl font-light mb-8">Essential</h3>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold">{pricing[duration].essential}</span>
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-[#00439c] text-white hover:bg-[#00367A] mb-10">
                  Add to Cart
                </Button>

                <p className="font-bold text-lg mb-6">New games to play each month, online multiplayer, exclusive PS Store discounts and more.</p>

                <ul className="space-y-4">
                  {["Monthly games", "Online multiplayer", "Exclusive discounts", "Cloud storage"].map((feat, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Check className="size-5 text-black shrink-0" strokeWidth={2} />
                      <span className="text-gray-600">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Game Catalog Preview Section */}
      <section className="bg-black text-white px-4 py-24 sm:px-6 border-t border-[#333]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Plus className="text-[#FFCC00] size-8 stroke-[4]" />
              <span className="text-3xl font-light tracking-widest uppercase">PlayStation Plus</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Discover your next great adventure
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Hundreds of incredible PS4 and PS5 games are ready to play with three flexible membership plans.
            </p>
            <Button className="bg-[#00439c] hover:bg-[#00367a] text-white rounded-full px-8 py-6 font-bold text-lg" onClick={() => document.getElementById('subscriptions')?.scrollIntoView({behavior: 'smooth'})}>
              Choose your plan
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:gap-5 relative">
            <div className="transform translate-y-6 relative group">
              <img src="/astro-bot.jpg" alt="Astro Bot" className="rounded-xl object-cover w-full aspect-[3/4] shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="transform -translate-y-2 relative group z-10">
              <img src="/death-stranding-2-on-the-beach.jpg" alt="Death Stranding 2" className="rounded-xl object-cover w-full aspect-[3/4] shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="transform translate-y-8 relative group">
              <img src="/grand-theft-auto-vi.jpg" alt="GTA VI" className="rounded-xl object-cover w-full aspect-[3/4] shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}