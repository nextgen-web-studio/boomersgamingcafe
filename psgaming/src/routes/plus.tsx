import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/plus")({
  head: () => ({ meta: [
    { title: "PlayStation Plus Memberships — PS Games Sales" },
    { name: "description", content: "Compare Essential, Extra, and Premium PlayStation Plus memberships." },
  ]}), component: PlusPage,
});

function PlusPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1F]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-20 pb-32 text-white border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img src="/horizon-forbidden-west-wide.jpg" alt="PS Plus Hero" className="size-full object-cover opacity-50 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Plus className="text-[#00439c] size-8 stroke-[3]" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white drop-shadow-md">PlayStation Plus</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-3xl text-white drop-shadow-xl">
            Hundreds of games.<br />One membership.
          </h1>
          <p className="mt-6 text-xl max-w-2xl text-gray-300 drop-shadow-md">
            Join PlayStation Plus to discover and play hundreds of PS4 and PS5 games, enjoy online multiplayer, exclusive discounts and more.
          </p>
          <Button className="mt-10 bg-white hover:bg-gray-200 text-black font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)]" onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}>
            View membership plans
          </Button>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="px-4 py-20 sm:px-6 relative z-20">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-3">
          
          {/* Essential Tier */}
          <div className="flex flex-col bg-[#2A2A2A] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-transform hover:-translate-y-2 duration-300">
            <div className="bg-gradient-to-b from-[#6A6A6A] to-[#3A3A3A] p-8 text-white">
              <h3 className="text-3xl font-black mb-2 tracking-tight">Essential</h3>
              <p className="font-medium text-gray-100">New games to play each month, online multiplayer, exclusive PS Store discounts and more.</p>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-8">
                <span className="text-5xl font-black text-white">₹1,499</span>
                <span className="text-gray-400 font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-5 flex-1">
                {["Monthly games", "Online multiplayer", "Exclusive discounts", "Cloud storage"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="bg-white/10 p-1 rounded-full"><Check className="size-4 text-white" strokeWidth={3} /></div>
                    <span className="font-bold text-gray-200 text-lg">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-10 py-7 rounded-full font-bold text-lg bg-[#3A3A3A] hover:bg-[#4A4A4A] text-white border-none shadow-lg">Subscribe</Button>
            </div>
          </div>

          {/* Extra Tier */}
          <div className="flex flex-col bg-[#2A2A2A] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(255,202,40,0.15)] border-2 border-[#FFCA28] transform lg:-translate-y-8 transition-transform hover:-translate-y-10 duration-300 relative">
            <div className="absolute -inset-1 bg-gradient-to-b from-[#FFCA28]/20 to-transparent blur-xl pointer-events-none" />
            <div className="bg-gradient-to-b from-[#FFCA28] to-[#F57C00] p-8 text-black relative">
              <div className="absolute top-6 right-6 bg-black text-[#FFCA28] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">Most Popular</div>
              <h3 className="text-3xl font-black mb-2 tracking-tight">Extra</h3>
              <p className="font-bold text-black/80">Discover a huge catalog of incredible PS4 and PS5 games, plus all Essential benefits.</p>
            </div>
            <div className="p-8 flex-1 flex flex-col relative z-10">
              <div className="mb-8">
                <span className="text-5xl font-black text-white">₹1,749</span>
                <span className="text-gray-400 font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-5 flex-1">
                {["Game Catalog", "Ubisoft+ Classics", "Monthly games", "Online multiplayer"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="bg-[#FFCA28]/20 p-1 rounded-full"><Check className="size-4 text-[#FFCA28]" strokeWidth={3} /></div>
                    <span className="font-bold text-gray-200 text-lg">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-10 py-7 rounded-full font-black text-lg bg-[#FFCA28] hover:bg-[#FFD54F] text-black shadow-[0_10px_20px_rgba(255,202,40,0.3)]">Subscribe</Button>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="flex flex-col bg-[#111111] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 transition-transform hover:-translate-y-2 duration-300">
            <div className="bg-gradient-to-b from-[#2A2A2A] to-[#111111] p-8 text-white border-b border-white/5">
              <h3 className="text-3xl font-black mb-2 tracking-tight">Premium</h3>
              <p className="font-medium text-gray-300">Enjoy all core PlayStation Plus benefits, hundreds of games in the Game Catalog, plus exclusive benefits like game trials.</p>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-8">
                <span className="text-5xl font-black text-white">₹1,849</span>
                <span className="text-gray-500 font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-5 flex-1">
                {["Game trials", "Classics Catalog", "Game Catalog", "Monthly games"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="bg-white/10 p-1 rounded-full"><Check className="size-4 text-white" strokeWidth={3} /></div>
                    <span className="font-bold text-gray-300 text-lg">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-10 py-7 rounded-full font-black text-lg bg-white text-black hover:bg-gray-200 shadow-[0_10px_20px_rgba(255,255,255,0.1)]">Subscribe</Button>
            </div>
          </div>

        </div>
      </section>
      
      {/* Game Catalog Preview */}
      <section className="bg-black px-4 py-32 sm:px-6 border-t border-white/10">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">Included with Extra and Premium</h2>
          <p className="text-xl text-gray-400 mb-16 max-w-4xl mx-auto font-medium leading-relaxed">Discover your next adventure from a huge library of downloadable PS4 and PS5 games, from genre-defining blockbusters to innovative indies, with new games added on a regular basis.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['/marvels-spider-man-miles-morales.jpg', '/ghost-of-yotei.jpg', '/demons-souls.jpg', '/returnal.jpg'].map((img, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                <img src={img} alt="Game Catalog Game" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}