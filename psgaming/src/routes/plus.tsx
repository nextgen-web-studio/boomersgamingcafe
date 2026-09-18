import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, CircleDot, Circle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/plus")({
  component: PlusPage,
});

function PlusPage() {
  const [deluxePlan, setDeluxePlan] = useState("12");
  const [extraPlan, setExtraPlan] = useState("12");
  const [essentialPlan, setEssentialPlan] = useState("12");

  return (
    <main className="min-h-screen bg-white pb-0 flex flex-col w-full overflow-x-hidden">
      
      {/* Sub-Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between text-sm hidden md:flex">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <Plus className="text-[#FFCC00] size-5 stroke-[4]" />
          <span>PlayStation Plus</span>
        </div>
        <div className="flex items-center gap-8 font-medium text-gray-600">
          <a href="#" className="text-black bg-gray-100 px-3 py-1 rounded-full">Overview</a>
          <a href="#" className="hover:text-black transition-colors">What's new on PlayStation Plus</a>
          <a href="#" className="hover:text-black transition-colors">All games A-Z</a>
        </div>
        <Button className="bg-[#cd3d26] hover:bg-[#b0301d] text-white rounded-full px-5 font-bold h-8 text-xs">
          Join PlayStation Plus
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#001230] text-white flex flex-col justify-center border-b-[12px] border-[#FFCC00]">
        <div className="absolute inset-0 z-0">
          <img src="/marvels-spider-man-2-wide.jpg" alt="PS Plus Hero" className="size-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001230] via-[#001230]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-[#FFCC00] size-8 stroke-[4]" />
              <span className="text-2xl font-light tracking-widest uppercase">PlayStation Plus</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6 tracking-tight">
              Get more of what you love with PlayStation Plus
            </h1>
            
            <p className="text-lg text-gray-300 mb-10 leading-relaxed font-medium">
              Discover new games to play every month, jump into online multiplayer with friends and get exclusive discounts ?" all benefits designed to bring you more of the things you love, every time you play.
            </p>
            
            <Button className="bg-[#cd3d26] hover:bg-[#b0301d] text-white rounded-full px-8 py-6 font-bold text-lg shadow-lg">
              Join now
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Table */}
      <section className="bg-[#f3f4f6] px-4 py-16 sm:px-6 relative z-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* Deluxe Tier */}
            <div className="flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-[#111] p-6 text-white">
                <h3 className="text-3xl font-light tracking-wide uppercase">Deluxe</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="space-y-4 mb-8 flex-1">
                  {["Game Trials", "Classics Catalogue", "Game Catalogue", "Ubisoft+ Classics", "Monthly Games", "Online Multiplayer", "Exclusive Discounts", "Cloud Storage"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <Check className="size-4 text-[#00439c] stroke-[3]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 bg-gray-50 p-2 rounded-lg mb-6">
                  {[
                    { id: "12", label: "12-Month Plan", price: "Rs 7,599 every 12 months", subtitle: "30% off 12 months versus 1 month" },
                    { id: "3", label: "3-Month Plan", price: "Rs 2,299 every 3 months" },
                    { id: "1", label: "1-Month Plan", price: "Rs 849 every month" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setDeluxePlan(plan.id)}
                      className={`flex items-start justify-between p-4 rounded-md cursor-pointer border-2 transition-all ${deluxePlan === plan.id ? 'border-[#00439c] bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{plan.label}</p>
                        <p className="font-medium text-gray-600">{plan.price}</p>
                        {plan.subtitle && <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>}
                      </div>
                      {deluxePlan === plan.id ? <CircleDot className="text-[#00439c] size-5" /> : <Circle className="text-gray-300 size-5" />}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-[#00439c] text-white hover:bg-[#00367a]">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Extra Tier */}
            <div className="flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform lg:-translate-y-4 border-t-8 border-t-[#FFCC00]">
              <div className="bg-[#FFCC00] p-6 text-black">
                <h3 className="text-3xl font-light tracking-wide uppercase">Extra</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    { text: "Classics Catalogue", disabled: true },
                    { text: "Game Catalogue", disabled: false },
                    { text: "Ubisoft+ Classics", disabled: false },
                    { text: "Monthly Games", disabled: false },
                    { text: "Online Multiplayer", disabled: false },
                    { text: "Exclusive Discounts", disabled: false },
                    { text: "Cloud Storage", disabled: false }
                  ].map((feat, i) => (
                    <li key={i} className={`flex items-center gap-3 font-medium ${feat.disabled ? 'text-gray-300' : ''}`}>
                      {feat.disabled ? <div className="size-4" /> : <Check className="size-4 text-[#00439c] stroke-[3]" />}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 bg-gray-50 p-2 rounded-lg mb-6">
                  {[
                    { id: "12", label: "12-Month Plan", price: "Rs 6,699 every 12 months", subtitle: "25% off 12 months versus 1 month" },
                    { id: "3", label: "3-Month Plan", price: "Rs 1,999 every 3 months" },
                    { id: "1", label: "1-Month Plan", price: "Rs 749 every month" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setExtraPlan(plan.id)}
                      className={`flex items-start justify-between p-4 rounded-md cursor-pointer border-2 transition-all ${extraPlan === plan.id ? 'border-[#00439c] bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{plan.label}</p>
                        <p className="font-medium text-gray-600">{plan.price}</p>
                        {plan.subtitle && <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>}
                      </div>
                      {extraPlan === plan.id ? <CircleDot className="text-[#00439c] size-5" /> : <Circle className="text-gray-300 size-5" />}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-gray-600 text-white hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Essential Tier */}
            <div className="flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 p-6 text-gray-900">
                <h3 className="text-3xl font-light tracking-wide uppercase">Essential</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    { text: "Classics Catalogue", disabled: true },
                    { text: "Game Catalogue", disabled: true },
                    { text: "Ubisoft+ Classics", disabled: true },
                    { text: "Monthly Games", disabled: false },
                    { text: "Online Multiplayer", disabled: false },
                    { text: "Exclusive Discounts", disabled: false },
                    { text: "Cloud Storage", disabled: false }
                  ].map((feat, i) => (
                    <li key={i} className={`flex items-center gap-3 font-medium ${feat.disabled ? 'text-gray-300' : ''}`}>
                      {feat.disabled ? <div className="size-4" /> : <Check className="size-4 text-[#00439c] stroke-[3]" />}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 bg-gray-50 p-2 rounded-lg mb-6">
                  {[
                    { id: "12", label: "12-Month Plan", price: "Rs 3,949 every 12 months", subtitle: "34% off 12 months versus 1 month" },
                    { id: "3", label: "3-Month Plan", price: "Rs 1,199 every 3 months" },
                    { id: "1", label: "1-Month Plan", price: "Rs 499 every month" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setEssentialPlan(plan.id)}
                      className={`flex items-start justify-between p-4 rounded-md cursor-pointer border-2 transition-all ${essentialPlan === plan.id ? 'border-[#00439c] bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{plan.label}</p>
                        <p className="font-medium text-gray-600">{plan.price}</p>
                        {plan.subtitle && <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>}
                      </div>
                      {essentialPlan === plan.id ? <CircleDot className="text-[#00439c] size-5" /> : <Circle className="text-gray-300 size-5" />}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-gray-600 text-white hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Game Catalog Preview (Trending) */}
      <section className="bg-[#0a0a0a] text-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              With PlayStation Plus Extra or Deluxe you get access to more games from a huge on-demand library. Whether it's your go-to franchises and genres, games you always wanted to play or discovering new favourites by trying something completely different, there's always more to explore with the Game Catalogue.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black font-bold px-6 py-2 rounded-full text-sm">Now trending</button>
              <button className="bg-transparent hover:bg-white/10 text-white font-bold px-6 py-2 rounded-full text-sm transition-colors">What's new</button>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {[
              { title: "Hogwarts Legacy", genre: "Unique", desc: "Experience Hogwarts in the late 1800s in the immersive open-world action RPG.", img: "/marvels-spider-man-miles-morales.jpg" },
              { title: "Silent Hill 2", genre: "Horror", desc: "Experience psychological horror at its finest.", img: "/silent-hill-2.jpg" },
              { title: "RuneScape: Dragonwilds", genre: "Adventure", desc: "Explore a forgotten RuneScape continent.", img: "/horizon-zero-dawn-remastered.jpg" },
              { title: "Marvel's Spider-Man", genre: "Action", desc: "The worlds of Peter Parker and Spider-Man collide.", img: "/marvels-spider-man-2.jpg" },
            ].map((game, i) => (
              <div key={i} className="flex-none w-[320px] bg-[#1a1a1a] rounded-2xl overflow-hidden snap-start group cursor-pointer border border-white/5 hover:border-white/20 transition-colors shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <p className="text-[#0070d1] text-xs font-bold uppercase tracking-wider mb-2">{game.genre}</p>
                  <h4 className="text-xl font-bold mb-2">{game.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-2">{game.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits at a Glance */}
      <section className="bg-gray-50 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl text-center mb-16">
          <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">PlayStation Plus at a glance</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight max-w-3xl mx-auto uppercase">
            Benefits that enhance every way you play
          </h2>
        </div>
        
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Get exclusive discounts, in-game content and more", desc: "Access members-only PlayStation deals and offers, and claim exclusive content packs.", btn: "Find exclusive content" },
            { title: "Play hundreds of games", desc: "Build your personal collection with our Monthly Games. Find more of the games you love.", btn: "See all games" },
            { title: "Enjoy games online with friends", desc: "Team up with or battle other players, showing the world your skills via online multiplayer.", btn: "Explore multiplayer" },
            { title: "Get exclusive discounts and more", desc: "Access members-only PlayStation deals and offers, and claim exclusive content packs.", btn: "Find exclusive" }
          ].map((benefit, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 bg-[#FFCC00] relative overflow-hidden">
                {/* Yellow abstraction */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/20 mix-blend-overlay" />
                <img src="/ratchet-and-clank-rift-apart.jpg" className="w-full h-full object-cover mix-blend-multiply opacity-50" alt="" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h4>
                <p className="text-sm text-gray-600 mb-8 flex-1 leading-relaxed">{benefit.desc}</p>
                <Button className="w-fit bg-[#00439c] hover:bg-[#00367a] text-white rounded-full px-6 font-bold text-sm">
                  {benefit.btn}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="bg-white px-4 py-0 sm:px-0">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 overflow-hidden bg-white shadow-2xl rounded-3xl border border-gray-100 my-12">
          <div className="p-12 md:p-24 flex flex-col justify-center">
            <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">Take the quiz</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#001230] mb-6 tracking-tight uppercase leading-tight">
              Which PlayStation Plus membership is right for you?
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Whether you're looking to join or upgrade, answer a few quick questions to find out exactly which PlayStation Plus membership will get you more from your PlayStation experience.
            </p>
            <Button className="w-fit bg-[#00439c] hover:bg-[#00367a] text-white rounded-full px-12 py-6 font-bold text-lg">
              Let's go
            </Button>
          </div>
          <div className="bg-[#001230] relative min-h-[400px] md:min-h-full overflow-hidden p-8 flex items-center justify-center">
            {/* Geometric dark blue background with angled cut */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00439c]/20 to-transparent" />
            
            {/* Collage */}
            <div className="relative w-full h-full max-w-sm mx-auto flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full rotate-[-5deg] scale-110">
                <img src="/ghost-of-yotei.jpg" alt="Ghost" className="w-full aspect-[3/4] object-cover rounded-md border-2 border-[#FFCC00] shadow-2xl transform translate-y-8" />
                <div className="grid grid-rows-2 gap-4">
                  <img src="/marvels-spider-man-2.jpg" alt="Spider-Man" className="w-full h-full object-cover rounded-md border-2 border-[#FFCC00] shadow-xl" />
                  <img src="/god-of-war-ragnarok.jpg" alt="God of War" className="w-full h-full object-cover rounded-md border-2 border-[#FFCC00] shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}