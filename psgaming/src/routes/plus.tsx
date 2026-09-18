import { createFileRoute } from "@tanstack/react-router";
import { Check, CircleDot, Circle, Plus, ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between text-sm w-full">
        <div className="flex items-center gap-2 font-bold text-gray-900 shrink-0">
          <img src="/ps-plus-logo.jpg" alt="PlayStation Plus" className="h-5 sm:h-6 object-contain mix-blend-multiply" />
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 mx-4">
          <a href="#" className="text-black bg-gray-100 px-3 py-1 rounded-full">Overview</a>
          <a href="#" className="hover:text-black transition-colors">What's new on PlayStation Plus</a>
          <a href="#" className="hover:text-black transition-colors">All games A-Z</a>
        </div>
        <Button 
          onClick={() => document.getElementById('subscription-tiers')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-[#cd3d26] hover:bg-[#b0301d] text-white rounded-full px-4 sm:px-5 font-bold h-8 text-xs shrink-0 ml-auto"
        >
          Join PlayStation Plus
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-[#000f28] text-white flex flex-col justify-center border-b-[8px] border-[#FFCC00]">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/ghost-of-yotei.jpg" alt="Ghost of Tsushima" className="w-full h-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000f28] via-[#000f28]/80 to-transparent sm:via-[#000f28]/60" />
          <div className="absolute inset-0 bg-[#000f28]/30 sm:hidden" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 mt-8 sm:mt-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="relative flex items-center justify-center size-8 sm:size-10">
                <Plus className="text-[#FFCC00] size-full stroke-[3]" />
              </div>
              <span className="text-2xl sm:text-3xl font-light tracking-widest uppercase">PLAYSTATION PLUS</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6 tracking-tight">
              Get more of what you love with PlayStation Plus
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-8 sm:mb-10 leading-relaxed font-medium max-w-md">
              Discover new games to play every month, jump into online multiplayer with friends and get exclusive discounts — all benefits designed to bring you more of the things you love, every time you play.
            </p>
            
            <Button 
              onClick={() => document.getElementById('subscription-tiers')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#cd3d26] hover:bg-[#b0301d] text-white rounded-full px-8 py-6 font-bold text-base sm:text-lg shadow-lg"
            >
              Join now
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Table */}
      <section id="subscription-tiers" className="bg-[#f5f5f7] py-16 sm:py-24 relative z-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: 'none' }}>
            
            {/* Deluxe Tier */}
            <div className="flex-none w-[85vw] sm:w-[400px] lg:w-auto snap-center flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1f2233] p-4 sm:p-5 text-white">
                <h3 className="text-xl sm:text-2xl font-bold tracking-wide uppercase">Deluxe</h3>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8 flex-1">
                  {[
                    "Classics Catalogue", "Game Trials", "Game Catalogue", "Ubisoft+ Classics", 
                    "Monthly Games", "Online Multiplayer", "Exclusive Discounts", "Share Play", "Cloud Storage"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 font-semibold text-[11px] sm:text-[13px] text-gray-800">
                      <Check className="size-3.5 text-[#0070cc] stroke-[4] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 mb-8">
                  {[
                    { id: "12", label: "12-Month Plan", price: "Rs 7,599 every 12 months", subtitle: "30% off 12 months versus 1 month" },
                    { id: "3", label: "3-Month Plan", price: "Rs 2,299 every 3 months" },
                    { id: "1", label: "1-Month Plan", price: "Rs 849 every month" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setDeluxePlan(plan.id)}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${deluxePlan === plan.id ? 'bg-[#f0f0f0]' : 'bg-[#f7f7f7] hover:bg-[#f0f0f0]'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 text-[13px] sm:text-sm">{plan.label}</p>
                        <p className="font-medium text-gray-600 text-[11px] sm:text-xs mt-0.5">{plan.price}</p>
                        {plan.subtitle && <p className="text-[10px] text-gray-400 mt-1">{plan.subtitle}</p>}
                      </div>
                      <div className="size-5 rounded-full border-2 border-[#0070cc] flex items-center justify-center shrink-0 bg-white">
                         {deluxePlan === plan.id && <div className="size-2.5 bg-[#0070cc] rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-sm sm:text-base bg-[#0070cc] text-white hover:bg-[#005fb3]">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Extra Tier */}
            <div className="flex-none w-[85vw] sm:w-[400px] lg:w-auto snap-center flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform lg:-translate-y-4">
              <div className="bg-[#ffcc00] p-4 sm:p-5 text-black">
                <h3 className="text-xl sm:text-2xl font-bold tracking-wide uppercase">Extra</h3>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8 flex-1">
                  {[
                    { text: "Classics Catalogue", disabled: true },
                    { text: "Game Trials", disabled: true },
                    { text: "Game Catalogue", disabled: false },
                    { text: "Ubisoft+ Classics", disabled: false },
                    { text: "Monthly Games", disabled: false },
                    { text: "Online Multiplayer", disabled: false },
                    { text: "Exclusive Discounts", disabled: false },
                    { text: "Share Play", disabled: false },
                    { text: "Cloud Storage", disabled: false }
                  ].map((feat, i) => (
                    <li key={i} className={`flex items-center gap-2 font-semibold text-[11px] sm:text-[13px] ${feat.disabled ? 'text-gray-300' : 'text-gray-800'}`}>
                      {feat.disabled ? <div className="size-3.5 border-2 border-gray-200 rounded-sm shrink-0" /> : <Check className="size-3.5 text-[#0070cc] stroke-[4] shrink-0" />}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 mb-8">
                  {[
                    { id: "12", label: "12-Month Plan", price: "Rs 6,699 every 12 months", subtitle: "25% off 12 months versus 1 month" },
                    { id: "3", label: "3-Month Plan", price: "Rs 1,999 every 3 months" },
                    { id: "1", label: "1-Month Plan", price: "Rs 749 every month" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setExtraPlan(plan.id)}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${extraPlan === plan.id ? 'bg-[#f0f0f0]' : 'bg-[#f7f7f7] hover:bg-[#f0f0f0]'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 text-[13px] sm:text-sm">{plan.label}</p>
                        <p className="font-medium text-gray-600 text-[11px] sm:text-xs mt-0.5">{plan.price}</p>
                        {plan.subtitle && <p className="text-[10px] text-gray-400 mt-1">{plan.subtitle}</p>}
                      </div>
                      <div className="size-5 rounded-full border-2 border-[#0070cc] flex items-center justify-center shrink-0 bg-white">
                         {extraPlan === plan.id && <div className="size-2.5 bg-[#0070cc] rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-sm sm:text-base bg-[#363636] text-white hover:bg-black">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Essential Tier */}
            <div className="flex-none w-[85vw] sm:w-[400px] lg:w-auto snap-center flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#eaeaed] p-4 sm:p-5 text-gray-900">
                <h3 className="text-xl sm:text-2xl font-bold tracking-wide uppercase">Essential</h3>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8 flex-1">
                  {[
                    { text: "Classics Catalogue", disabled: true },
                    { text: "Game Trials", disabled: true },
                    { text: "Game Catalogue", disabled: true },
                    { text: "Ubisoft+ Classics", disabled: true },
                    { text: "Monthly Games", disabled: false },
                    { text: "Online Multiplayer", disabled: false },
                    { text: "Exclusive Discounts", disabled: false },
                    { text: "Share Play", disabled: false },
                    { text: "Cloud Storage", disabled: false }
                  ].map((feat, i) => (
                    <li key={i} className={`flex items-center gap-2 font-semibold text-[11px] sm:text-[13px] ${feat.disabled ? 'text-gray-300' : 'text-gray-800'}`}>
                      {feat.disabled ? <div className="size-3.5 border-2 border-gray-200 rounded-sm shrink-0" /> : <Check className="size-3.5 text-[#0070cc] stroke-[4] shrink-0" />}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 mb-8">
                  {[
                    { id: "12", label: "12-Month Plan", price: "Rs 3,949 every 12 months", subtitle: "34% off 12 months versus 1 month" },
                    { id: "3", label: "3-Month Plan", price: "Rs 1,199 every 3 months" },
                    { id: "1", label: "1-Month Plan", price: "Rs 499 every month" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setEssentialPlan(plan.id)}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${essentialPlan === plan.id ? 'bg-[#f0f0f0]' : 'bg-[#f7f7f7] hover:bg-[#f0f0f0]'}`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 text-[13px] sm:text-sm">{plan.label}</p>
                        <p className="font-medium text-gray-600 text-[11px] sm:text-xs mt-0.5">{plan.price}</p>
                        {plan.subtitle && <p className="text-[10px] text-gray-400 mt-1">{plan.subtitle}</p>}
                      </div>
                      <div className="size-5 rounded-full border-2 border-[#0070cc] flex items-center justify-center shrink-0 bg-white">
                         {essentialPlan === plan.id && <div className="size-2.5 bg-[#0070cc] rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-sm sm:text-base bg-[#363636] text-white hover:bg-black">
                  Subscribe
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Game Catalog Preview (Discover the Game Catalogue) */}
      <section className="bg-[#1f2233] text-white relative overflow-hidden">
        
        {/* Background Blue Wave (simulated with absolute positioning) */}
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-[#00439c] rounded-b-[40%] transform -scale-x-100 scale-y-110 sm:-translate-y-[20%] z-0" />
        
        <div className="relative z-10 mx-auto w-full max-w-7xl pt-16 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
             
             <div className="w-full md:w-1/2">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-8">
                 Discover<br/>the Game<br/>Catalogue
               </h2>
               
               <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-lg font-medium mb-10">
                 With PlayStation Plus Extra or Deluxe you get access to more games from a huge on-demand library. Whether it's your go-to franchises and genres, games you always wanted to play or discovering new favourites by trying something completely different, there's always more to explore with the Game Catalogue.
               </p>

               <div className="inline-flex items-center p-1 bg-black/30 rounded-full mb-8 sm:mb-0 backdrop-blur-sm">
                 <button className="bg-white text-black font-bold px-6 py-2 rounded-full text-sm shadow-sm">Now trending</button>
                 <button className="text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">What's new</button>
               </div>
             </div>

             <div className="w-full md:w-1/2 flex justify-center md:justify-end items-start pt-4">
               <div className="relative w-[90%] max-w-md">
                 <div className="absolute inset-0 bg-[#FFCC00] rounded-xl transform translate-x-4 -translate-y-4"></div>
                 <img src="/ghost-of-yotei.jpg" alt="Ghost of Yotei" className="relative w-full rounded-xl shadow-2xl object-cover object-top aspect-[4/3] sm:aspect-[16/9]" />
               </div>
             </div>
             
          </div>
        </div>
        
        {/* Carousel section */}
        <div className="relative z-10 px-4 py-8 sm:px-6 mx-auto w-full max-w-7xl">
          
          <div className="relative group">
            {/* Decorative Scroll Arrows */}
            <button className="hidden sm:flex absolute left-0 top-1/3 -translate-x-1/2 -translate-y-1/2 size-12 bg-white rounded-full items-center justify-center text-black z-20 shadow-xl hover:scale-105 transition-transform disabled:opacity-50">
              <ChevronLeft className="size-6" />
            </button>
            <button className="hidden sm:flex absolute right-0 top-1/3 translate-x-1/2 -translate-y-1/2 size-12 bg-white rounded-full items-center justify-center text-black z-20 shadow-xl hover:scale-105 transition-transform">
              <ChevronRight className="size-6" />
            </button>

            <div className="flex justify-between items-center mb-4 sm:hidden">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Swipe to explore &rarr;</span>
            </div>
            
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
              {[
                { title: "Hogwarts Legacy", genre: "Unique", desc: "Experience Hogwarts in the late 1800s in the immersive open-world action RPG.", img: "/marvels-spider-man-miles-morales.jpg" },
                { title: "Silent Hill 2", genre: "Horror", desc: "Experience psychological horror at its finest.", img: "/silent-hill-2.jpg" },
                { title: "RuneScape: Dragonwilds", genre: "Adventure", desc: "Explore a forgotten RuneScape continent where dragons have awoken.", img: "/horizon-zero-dawn-remastered.jpg" },
                { title: "Marvel's Spider-Man Remastered", genre: "Action", desc: "The worlds of Peter Parker and Spider-Man collide in this original story.", img: "/marvels-spider-man-2.jpg" },
              ].map((game, i) => (
                <div key={i} className="flex-none w-[220px] sm:w-[280px] bg-[#293047] rounded-2xl overflow-hidden snap-start group cursor-pointer border border-transparent hover:border-white/20 transition-all shadow-xl hover:shadow-2xl">
                  <div className="aspect-[4/5] sm:aspect-square overflow-hidden relative">
                    <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4 sm:p-5 h-full">
                    <p className="text-[#3b82f6] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">{game.genre}</p>
                    <h4 className="text-sm sm:text-base font-bold mb-2 text-white leading-tight">{game.title}</h4>
                    <p className="text-[11px] sm:text-xs text-gray-400 line-clamp-3 leading-relaxed">{game.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination dots (like iPad) */}
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-8 h-1 bg-white rounded-full"></div>
              <div className="w-2 h-1 bg-white/30 rounded-full"></div>
              <div className="w-2 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits at a Glance */}
      <section className="bg-gray-50 py-24 overflow-hidden relative">
        <div className="mx-auto max-w-7xl text-center mb-12 px-4 sm:px-6">
          <p className="text-[#0070cc] text-sm font-bold tracking-widest uppercase mb-4">PlayStation Plus at a glance</p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight max-w-3xl mx-auto uppercase">
            Benefits that enhance every way you play
          </h2>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: 'none' }}>
            {[
              { 
                title: "Get exclusive discounts, in-game content and more", 
                desc: "Access members-only PlayStation deals and offers, and claim exclusive content packs.", 
                btn: "Find exclusive content",
                img: "/ratchet-and-clank-rift-apart.jpg"
              },
              { 
                title: "Play hundreds of games", 
                desc: "Build your personal collection with our Monthly Games. Find more of the games you love.", 
                btn: "See all games",
                img: "/horizon-zero-dawn-remastered.jpg"
              },
              { 
                title: "Enjoy games online with friends", 
                desc: "Team up with or battle other players, showing the world your skills via online multiplayer.", 
                btn: "Explore multiplayer",
                img: "/marvels-spider-man-2.jpg"
              },
              { 
                title: "Explore the Classics Catalogue", 
                desc: "Rediscover a selection of classic games from previous PlayStation generations, ready to play.", 
                btn: "View classics",
                img: "/god-of-war-ragnarok.jpg"
              }
            ].map((benefit, i) => (
              <div key={i} className="flex-none w-[80vw] sm:w-[320px] lg:w-auto snap-center bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="h-44 sm:h-48 relative overflow-hidden bg-gray-900">
                  <img src={benefit.img} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-snug">{benefit.title}</h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-8 flex-1 leading-relaxed">{benefit.desc}</p>
                  <Button className="w-fit bg-[#0070cc] hover:bg-[#005fb3] text-white rounded-full px-6 py-5 font-bold text-sm shadow-md">
                    {benefit.btn}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="bg-[#eaeaed] relative overflow-hidden flex flex-col items-center w-full">
        
        {/* Top Dark Blue Angled Background */}
        <div 
          className="w-full bg-[#000f28] relative pt-12 pb-24 sm:pb-32 px-4 z-10"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
        >
          {/* Subtle gradient overlay for the blue background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00439c]/20 to-transparent pointer-events-none" />

          {/* Collage Container */}
          <div className="mx-auto max-w-md sm:max-w-xl relative h-[300px] sm:h-[400px]">
            {/* Main Left Image (Ghost) */}
            <div className="absolute left-[5%] sm:left-[10%] top-[10%] w-[45%] sm:w-[40%] z-20 hover:scale-105 transition-transform duration-500">
              <img 
                src="/ghost-of-yotei.jpg" 
                alt="Ghost" 
                className="w-full aspect-[3/4] object-cover rounded-md border border-white/20 shadow-2xl" 
              />
            </div>
            
            {/* Top Right Image 1 */}
            <div className="absolute left-[55%] sm:left-[55%] top-[5%] w-[25%] sm:w-[22%] z-10 hover:scale-105 transition-transform duration-500">
              <img 
                src="/marvels-spider-man-2.jpg" 
                alt="Spider-Man" 
                className="w-full aspect-square object-cover rounded-sm border border-white/20 shadow-xl" 
              />
            </div>

            {/* Middle Right Image 2 */}
            <div className="absolute left-[50%] sm:left-[48%] top-[35%] sm:top-[30%] w-[22%] sm:w-[18%] z-30 hover:scale-105 transition-transform duration-500">
              <img 
                src="/ratchet-and-clank-rift-apart.jpg" 
                alt="Game 2" 
                className="w-full aspect-square object-cover rounded-sm border border-white/20 shadow-2xl shadow-black/50" 
              />
            </div>

            {/* Bottom Right Image (God of War) */}
            <div className="absolute left-[65%] sm:left-[60%] top-[45%] sm:top-[40%] w-[30%] sm:w-[25%] z-20 hover:scale-105 transition-transform duration-500">
              <img 
                src="/god-of-war-ragnarok.jpg" 
                alt="God of War" 
                className="w-full aspect-[4/5] object-cover rounded-sm border border-white/20 shadow-xl" 
              />
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="w-full flex flex-col items-center text-center px-6 pt-4 pb-20 z-0 bg-[#eaeaed] relative">
          <p className="text-black text-sm font-bold tracking-widest uppercase mb-4 sm:mb-6">Take the quiz</p>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tighter uppercase leading-[0.95] max-w-2xl px-2">
            Which PlayStation Plus membership is right for you?
          </h2>
          
          <p className="text-gray-800 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl leading-relaxed px-4">
            Whether you're looking to join or upgrade, answer a few quick questions to find out exactly which PlayStation Plus membership will get you more from your PlayStation experience.
          </p>
          
          <Button 
            onClick={() => document.getElementById('subscription-tiers')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#0070cc] hover:bg-[#005fb3] text-white rounded-full px-12 py-6 font-bold text-lg w-full max-w-[300px] shadow-md transition-transform hover:-translate-y-1"
          >
            Let's go
          </Button>
        </div>
      </section>

    </main>
  );
}