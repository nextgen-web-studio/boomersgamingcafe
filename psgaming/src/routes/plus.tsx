import { createFileRoute } from "@tanstack/react-router";
import { Check, CircleDot, Circle, Plus } from "lucide-react";
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
          <img src="/ps-plus-logo.jpg" alt="PlayStation Plus" className="h-6 object-contain mix-blend-multiply" />
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
      <section className="relative w-full h-[80vh] min-h-[500px] overflow-hidden bg-[#000f28] text-white flex flex-col justify-center border-b-[8px] border-[#FFCC00]">
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-[#FFCC00] size-6 sm:size-8 stroke-[4]" />
              <span className="text-xl sm:text-2xl font-light tracking-widest uppercase">PlayStation Plus</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6 tracking-tight">
              Get more of what you love with PlayStation Plus
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 leading-relaxed font-medium">
              Discover new games to play every month, jump into online multiplayer with friends and get exclusive discounts — all benefits designed to bring you more of the things you love, every time you play.
            </p>
            
            <Button className="bg-[#cd3d26] hover:bg-[#b0301d] text-white rounded-full px-8 py-6 font-bold text-lg shadow-lg">
              Join now
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Table */}
      <section className="bg-[#f3f4f6] py-16 relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: 'none' }}>
            
            {/* Deluxe Tier */}
            <div className="flex-none w-[85vw] sm:w-[400px] lg:w-auto snap-center flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-[#111] p-4 sm:p-6 text-white">
                <h3 className="text-2xl sm:text-3xl font-light tracking-wide uppercase">Deluxe</h3>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
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
                      className={`flex items-start justify-between p-3 sm:p-4 rounded-md cursor-pointer border-2 transition-all ${deluxePlan === plan.id ? 'border-[#00439c] bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{plan.label}</p>
                        <p className="font-medium text-gray-600 text-xs sm:text-sm">{plan.price}</p>
                        {plan.subtitle && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{plan.subtitle}</p>}
                      </div>
                      {deluxePlan === plan.id ? <CircleDot className="text-[#00439c] size-4 sm:size-5 mt-1" /> : <Circle className="text-gray-300 size-4 sm:size-5 mt-1" />}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-5 sm:py-6 rounded-full font-bold text-sm sm:text-base bg-[#00439c] text-white hover:bg-[#00367a]">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Extra Tier */}
            <div className="flex-none w-[85vw] sm:w-[400px] lg:w-auto snap-center flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform lg:-translate-y-4 border-t-8 border-t-[#FFCC00]">
              <div className="bg-[#FFCC00] p-4 sm:p-6 text-black">
                <h3 className="text-2xl sm:text-3xl font-light tracking-wide uppercase">Extra</h3>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
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
                      className={`flex items-start justify-between p-3 sm:p-4 rounded-md cursor-pointer border-2 transition-all ${extraPlan === plan.id ? 'border-[#00439c] bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{plan.label}</p>
                        <p className="font-medium text-gray-600 text-xs sm:text-sm">{plan.price}</p>
                        {plan.subtitle && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{plan.subtitle}</p>}
                      </div>
                      {extraPlan === plan.id ? <CircleDot className="text-[#00439c] size-4 sm:size-5 mt-1" /> : <Circle className="text-gray-300 size-4 sm:size-5 mt-1" />}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-5 sm:py-6 rounded-full font-bold text-sm sm:text-base bg-gray-600 text-white hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Essential Tier */}
            <div className="flex-none w-[85vw] sm:w-[400px] lg:w-auto snap-center flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 p-4 sm:p-6 text-gray-900">
                <h3 className="text-2xl sm:text-3xl font-light tracking-wide uppercase">Essential</h3>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
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
                      className={`flex items-start justify-between p-3 sm:p-4 rounded-md cursor-pointer border-2 transition-all ${essentialPlan === plan.id ? 'border-[#00439c] bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{plan.label}</p>
                        <p className="font-medium text-gray-600 text-xs sm:text-sm">{plan.price}</p>
                        {plan.subtitle && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{plan.subtitle}</p>}
                      </div>
                      {essentialPlan === plan.id ? <CircleDot className="text-[#00439c] size-4 sm:size-5 mt-1" /> : <Circle className="text-gray-300 size-4 sm:size-5 mt-1" />}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-5 sm:py-6 rounded-full font-bold text-sm sm:text-base bg-gray-600 text-white hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Game Catalog Preview (Discover the Game Catalogue) */}
      <section className="bg-[#1f2233] text-white">
        
        {/* Top blue block */}
        <div className="bg-[#00439c] w-full px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight w-full md:w-1/2">
               Discover the<br/>Game Catalogue
             </h2>
             <div className="w-full md:w-1/2 flex justify-start md:justify-end">
               <img src="/ghost-of-yotei.jpg" alt="Ghost of Yotei" className="w-full max-w-md rounded-xl border-4 border-[#FFCC00] shadow-2xl object-cover aspect-[21/9] sm:aspect-auto" />
             </div>
          </div>
        </div>
        
        {/* Carousel section */}
        <div className="px-4 py-16 sm:px-6 mx-auto w-full max-w-7xl">
          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl font-medium">
            With PlayStation Plus Extra or Deluxe you get access to more games from a huge on-demand library. Whether it's your go-to franchises and genres, games you always wanted to play or discovering new favourites by trying something completely different, there's always more to explore with the Game Catalogue.
          </p>
          
          <div className="flex items-center gap-6 mb-8">
            <button className="bg-white text-black font-bold px-6 py-2 rounded-full text-sm">Now trending</button>
            <button className="text-gray-400 font-bold text-sm hover:text-white transition-colors">What's new</button>
          </div>
          
          <div className="flex justify-between items-center mb-4 sm:hidden">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Swipe to explore &rarr;</span>
          </div>
          
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {[
              { title: "Hogwarts Legacy", genre: "Unique", desc: "Experience Hogwarts in the late 1800s in the immersive open-world action RPG.", img: "/marvels-spider-man-miles-morales.jpg" },
              { title: "Silent Hill 2", genre: "Horror", desc: "Experience psychological horror at its finest.", img: "/silent-hill-2.jpg" },
              { title: "RuneScape: Dragonwilds", genre: "Adventure", desc: "Explore a forgotten RuneScape continent.", img: "/horizon-zero-dawn-remastered.jpg" },
              { title: "Marvel's Spider-Man", genre: "Action", desc: "The worlds of Peter Parker and Spider-Man collide.", img: "/marvels-spider-man-2.jpg" },
            ].map((game, i) => (
              <div key={i} className="flex-none w-[260px] sm:w-[320px] bg-[#293047] rounded-2xl overflow-hidden snap-start group cursor-pointer border border-white/5 hover:border-white/20 transition-colors shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-wider mb-2">{game.genre}</p>
                  <h4 className="text-lg sm:text-xl font-bold mb-2 text-white">{game.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-3">{game.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits at a Glance */}
      <section className="bg-gray-50 py-24 overflow-hidden relative">
        <div className="mx-auto max-w-7xl text-center mb-12 px-4 sm:px-6">
          <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">PlayStation Plus at a glance</p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight max-w-3xl mx-auto uppercase">
            Benefits that enhance every way you play
          </h2>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: 'none' }}>
            {[
              { title: "Get exclusive discounts, in-game content and more", desc: "Access members-only PlayStation deals and offers, and claim exclusive content packs.", btn: "Find exclusive content" },
              { title: "Play hundreds of games", desc: "Build your personal collection with our Monthly Games. Find more of the games you love.", btn: "See all games" },
              { title: "Enjoy games online with friends", desc: "Team up with or battle other players, showing the world your skills via online multiplayer.", btn: "Explore multiplayer" },
              { title: "Get exclusive discounts and more", desc: "Access members-only PlayStation deals and offers, and claim exclusive content packs.", btn: "Find exclusive" }
            ].map((benefit, i) => (
              <div key={i} className="flex-none w-[80vw] sm:w-[350px] lg:w-auto snap-center bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="h-40 sm:h-48 bg-[#FFCC00] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/20 mix-blend-overlay" />
                  <img src="/ratchet-and-clank-rift-apart.jpg" className="w-full h-full object-cover mix-blend-multiply opacity-50" alt="" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{benefit.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 flex-1 leading-relaxed">{benefit.desc}</p>
                  <Button className="w-fit bg-[#00439c] hover:bg-[#00367a] text-white rounded-full px-5 sm:px-6 font-bold text-xs sm:text-sm">
                    {benefit.btn}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="bg-white px-4 py-8 sm:px-6 pb-20">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 overflow-hidden bg-white shadow-2xl rounded-3xl border border-gray-100 my-8">
          <div className="p-10 md:p-24 flex flex-col justify-center">
            <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">Take the quiz</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#001230] mb-6 tracking-tight uppercase leading-tight">
              Which PlayStation Plus membership is right for you?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Whether you're looking to join or upgrade, answer a few quick questions to find out exactly which PlayStation Plus membership will get you more from your PlayStation experience.
            </p>
            <Button className="w-fit bg-[#00439c] hover:bg-[#00367a] text-white rounded-full px-10 sm:px-12 py-5 sm:py-6 font-bold text-base sm:text-lg">
              Let's go
            </Button>
          </div>
          <div className="bg-[#001230] relative min-h-[400px] md:min-h-full overflow-hidden p-8 flex items-center justify-center">
            {/* Geometric dark blue background with angled cut */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00439c]/30 to-transparent" />
            
            {/* Collage */}
            <div className="relative w-full h-full max-w-sm mx-auto flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full rotate-[-5deg] scale-105 sm:scale-110">
                <img src="/ghost-of-yotei.jpg" alt="Ghost" className="w-full aspect-[3/4] object-cover rounded-md border-2 border-[#FFCC00] shadow-2xl transform translate-y-8" />
                <div className="grid grid-rows-2 gap-3 sm:gap-4">
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