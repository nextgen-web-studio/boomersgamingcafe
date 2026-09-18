import { createFileRoute } from "@tanstack/react-router";
import { Check, Cloud, Gamepad2, Plus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/plus")({
  head: () => ({ meta: [
    { title: "PlayStation Plus Memberships — PS Games Sales" },
    { name: "description", content: "Compare Essential, Extra, and Premium PlayStation Plus memberships." },
    { property: "og:title", content: "PlayStation Plus Memberships — PS Games Sales" },
    { property: "og:description", content: "Compare Essential, Extra, and Premium PlayStation Plus memberships." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PlusPage,
});

function PlusPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-ink pt-20 pb-32 text-ink-foreground">
        <div className="absolute inset-0 z-0">
          <img src="/horizon-forbidden-west-wide.jpg" alt="PS Plus Hero" className="size-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#FFCA28] rounded-full flex items-center justify-center">
              <Plus className="text-black size-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">PlayStation Plus</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
            Hundreds of games.<br />One membership.
          </h1>
          <p className="mt-6 text-xl max-w-2xl text-ink-muted">
            Join PlayStation Plus to discover and play hundreds of PS4 and PS5 games, enjoy online multiplayer, exclusive discounts and more.
          </p>
          <Button className="mt-10 bg-[#FFCA28] hover:bg-[#FFCA28]/90 text-black font-bold text-lg px-8 py-6 rounded-full" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
            View membership plans
          </Button>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="px-4 py-20 sm:px-6 -mt-20 relative z-20">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-3">
          
          {/* Essential Tier */}
          <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="bg-gradient-to-br from-[#DFDFDF] to-[#B3B3B3] p-8 text-black">
              <h3 className="text-3xl font-bold mb-2">Essential</h3>
              <p className="font-medium opacity-80">New games to play each month, online multiplayer, exclusive PS Store discounts and more.</p>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-8">
                <span className="text-4xl font-bold">₹1,499</span>
                <span className="text-muted-foreground ml-1">/ month</span>
              </div>
              <ul className="space-y-4 flex-1">
                {["Monthly games", "Online multiplayer", "Exclusive discounts", "Cloud storage"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8 py-6 rounded-full font-bold text-lg" variant="outline">Subscribe</Button>
            </div>
          </div>

          {/* Extra Tier */}
          <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#FFCA28] transform lg:-translate-y-4">
            <div className="bg-gradient-to-br from-[#FFD54F] to-[#FFA000] p-8 text-black relative">
              <div className="absolute top-4 right-4 bg-black text-[#FFCA28] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <h3 className="text-3xl font-bold mb-2">Extra</h3>
              <p className="font-medium opacity-90">Discover a huge catalog of incredible PS4 and PS5 games, plus all Essential benefits.</p>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-8">
                <span className="text-4xl font-bold">₹1,749</span>
                <span className="text-muted-foreground ml-1">/ month</span>
              </div>
              <ul className="space-y-4 flex-1">
                {["Game Catalog", "Ubisoft+ Classics", "Monthly games", "Online multiplayer"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8 py-6 rounded-full font-bold text-lg bg-[#FFCA28] hover:bg-[#FFCA28]/90 text-black">Subscribe</Button>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="flex flex-col bg-[#1A1A1A] text-white rounded-3xl overflow-hidden shadow-xl border border-[#333]">
            <div className="bg-gradient-to-br from-[#333] to-[#111] p-8">
              <h3 className="text-3xl font-bold mb-2 text-white">Premium</h3>
              <p className="font-medium text-gray-400">Enjoy all core PlayStation Plus benefits, hundreds of games in the Game Catalog, plus exclusive benefits like game trials.</p>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">₹1,849</span>
                <span className="text-gray-400 ml-1">/ month</span>
              </div>
              <ul className="space-y-4 flex-1">
                {["Game trials", "Classics Catalog", "Game Catalog", "Monthly games"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="size-5 text-[#FFCA28] shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-300">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8 py-6 rounded-full font-bold text-lg bg-white text-black hover:bg-gray-200">Subscribe</Button>
            </div>
          </div>

        </div>
      </section>
      
      {/* Game Catalog Preview */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Included with Extra and Premium</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">Discover your next adventure from a huge library of downloadable PS4 and PS5 games, from genre-defining blockbusters to innovative indies, with new games added on a regular basis.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/marvels-spider-man-miles-morales.jpg', '/ghost-of-yotei.jpg', '/demons-souls.jpg', '/returnal.jpg'].map((img, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 shadow-md">
                <img src={img} alt="Game Catalog Game" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}