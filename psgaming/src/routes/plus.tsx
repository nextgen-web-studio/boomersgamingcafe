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
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between text-sm w-full">
        <div className="flex items-center gap-2 font-black tracking-tight shrink-0">
          <span className="grid size-6 sm:size-7 shrink-0 place-items-center rounded bg-blue-600 text-[10px] sm:text-xs text-white shadow-sm">NG+</span>
          <span className="truncate text-base sm:text-lg text-gray-900 font-black tracking-tighter">NextGen Plus</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 mx-4">
          <a href="#" className="text-black bg-gray-100 px-3 py-1 rounded-full">Overview</a>
          <a href="#" className="hover:text-black transition-colors">What's new on NextGen Plus</a>
          <a href="#" className="hover:text-black transition-colors">All games A-Z</a>
        </div>
        <Button className="bg-[#cd3d26] hover:bg-[#b0301d] text-white rounded-full px-4 sm:px-5 font-bold h-8 text-xs shrink-0 ml-auto">
          Join NextGen Plus
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-[#000f28] text-white flex flex-col justify-center border-b-[8px] border-[#FFCC00]">
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-lg bg-blue-500 text-sm sm:text-base font-black text-white shadow-lg shadow-blue-500/20 ring-2 ring-white/10">NG+</span>
              <span className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-blue-200 drop-shadow-sm">NextGen Plus</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-4 sm:mb-6 tracking-tight">
              Get more of what you love with NextGen Plus
            </h1>
            
            <p className="text-sm sm:text-lg text-gray-300 mb-8 sm:mb-10 leading-relaxed font-medium">
              Discover new games to play every month, jump into online multiplayer with friends and get exclusive discounts — all benefits designed to bring you more of the things you love, every time you play.
            </p>
            
            <Button className="bg-[#cd3d26] hover:bg-[#b0301d] text-white rounded-full px-8 py-6 font-bold text-lg shadow-lg">
              Join now
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Table */}
      <section className="bg-gray-50 py-16 sm:py-24 relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center mb-10 px-4">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Choose Your Plan</h2>
            <p className="mt-3 text-gray-500 font-medium">Find the perfect NextGen Plus tier for your play style.</p>
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: 'none' }}>
            
            {/* Deluxe Tier */}
            <div className="flex-none w-[85vw] sm:w-[380px] lg:w-auto snap-center flex flex-col bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gray-900"></div>
              <div className="bg-gray-900/5 p-6 sm:p-8 border-b border-gray-100">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Deluxe</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">The ultimate NextGen experience</p>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col text-sm text-gray-700">
                <ul className="space-y-4 mb-8 flex-1">
                  {["Game Trials", "Classics Catalogue", "Game Catalogue", "Ubisoft+ Classics", "Monthly Games", "Online Multiplayer", "Exclusive Discounts", "Cloud Storage"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 font-semibold text-gray-800">
                      <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Check className="size-3 text-blue-600 stroke-[4]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 bg-gray-50/80 p-1.5 rounded-2xl mb-8">
                  {[
                    { id: "12", label: "12 Months", price: "Rs 7,599 / yr", subtitle: "Save 30%" },
                    { id: "3", label: "3 Months", price: "Rs 2,299 / qtr" },
                    { id: "1", label: "1 Month", price: "Rs 849 / mo" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setDeluxePlan(plan.id)}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all ${deluxePlan === plan.id ? 'bg-white shadow-sm ring-1 ring-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`size-4 sm:size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${deluxePlan === plan.id ? 'border-blue-600' : 'border-gray-300'}`}>
                           {deluxePlan === plan.id && <div className="size-2 sm:size-2.5 rounded-full bg-blue-600" />}
                        </div>
                        <div>
                          <p className={`font-bold ${deluxePlan === plan.id ? 'text-gray-900' : 'text-gray-600'}`}>{plan.label}</p>
                          {plan.subtitle && <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">{plan.subtitle}</p>}
                        </div>
                      </div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">{plan.price}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-gray-900 text-white hover:bg-black shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Subscribe to Deluxe
                </Button>
              </div>
            </div>

            {/* Extra Tier */}
            <div className="flex-none w-[85vw] sm:w-[380px] lg:w-auto snap-center flex flex-col bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden transform lg:-translate-y-4 relative ring-1 ring-blue-100">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-500"></div>
              <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider">Most Popular</div>
              <div className="bg-blue-50/50 p-6 sm:p-8 border-b border-blue-50">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Extra</h3>
                <p className="text-sm font-medium text-blue-600/80 mt-1">Discover hundreds of games</p>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col text-sm text-gray-700">
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
                    <li key={i} className={`flex items-center gap-3 font-semibold ${feat.disabled ? 'text-gray-300' : 'text-gray-800'}`}>
                      {feat.disabled ? (
                        <div className="size-5 rounded-full bg-gray-100 shrink-0" />
                      ) : (
                        <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Check className="size-3 text-blue-600 stroke-[4]" />
                        </div>
                      )}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 bg-gray-50/80 p-1.5 rounded-2xl mb-8">
                  {[
                    { id: "12", label: "12 Months", price: "Rs 6,699 / yr", subtitle: "Save 25%" },
                    { id: "3", label: "3 Months", price: "Rs 1,999 / qtr" },
                    { id: "1", label: "1 Month", price: "Rs 749 / mo" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setExtraPlan(plan.id)}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all ${extraPlan === plan.id ? 'bg-white shadow-sm ring-1 ring-blue-200' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`size-4 sm:size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${extraPlan === plan.id ? 'border-blue-600' : 'border-gray-300'}`}>
                           {extraPlan === plan.id && <div className="size-2 sm:size-2.5 rounded-full bg-blue-600" />}
                        </div>
                        <div>
                          <p className={`font-bold ${extraPlan === plan.id ? 'text-gray-900' : 'text-gray-600'}`}>{plan.label}</p>
                          {plan.subtitle && <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">{plan.subtitle}</p>}
                        </div>
                      </div>
                      <p className={`font-bold text-xs sm:text-sm ${extraPlan === plan.id ? 'text-blue-700' : 'text-gray-900'}`}>{plan.price}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5">
                  Subscribe to Extra
                </Button>
              </div>
            </div>

            {/* Essential Tier */}
            <div className="flex-none w-[85vw] sm:w-[380px] lg:w-auto snap-center flex flex-col bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gray-300"></div>
              <div className="bg-gray-50/50 p-6 sm:p-8 border-b border-gray-100">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Essential</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Core multiplayer & monthly games</p>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col text-sm text-gray-700">
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
                    <li key={i} className={`flex items-center gap-3 font-semibold ${feat.disabled ? 'text-gray-300' : 'text-gray-800'}`}>
                      {feat.disabled ? (
                        <div className="size-5 rounded-full bg-gray-100 shrink-0" />
                      ) : (
                        <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Check className="size-3 text-blue-600 stroke-[4]" />
                        </div>
                      )}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 bg-gray-50/80 p-1.5 rounded-2xl mb-8">
                  {[
                    { id: "12", label: "12 Months", price: "Rs 3,949 / yr", subtitle: "Save 34%" },
                    { id: "3", label: "3 Months", price: "Rs 1,199 / qtr" },
                    { id: "1", label: "1 Month", price: "Rs 499 / mo" }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setEssentialPlan(plan.id)}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all ${essentialPlan === plan.id ? 'bg-white shadow-sm ring-1 ring-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`size-4 sm:size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${essentialPlan === plan.id ? 'border-blue-600' : 'border-gray-300'}`}>
                           {essentialPlan === plan.id && <div className="size-2 sm:size-2.5 rounded-full bg-blue-600" />}
                        </div>
                        <div>
                          <p className={`font-bold ${essentialPlan === plan.id ? 'text-gray-900' : 'text-gray-600'}`}>{plan.label}</p>
                          {plan.subtitle && <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">{plan.subtitle}</p>}
                        </div>
                      </div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">{plan.price}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full py-6 rounded-full font-bold text-base bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm transition-all">
                  Subscribe to Essential
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Game Catalog Preview (Discover the Game Catalogue) */}
      <section className="bg-[#1f2233] text-white">
        
        {/* Top blue block */}
        <div className="bg-gradient-to-br from-[#00439c] via-[#003fb0] to-[#002277] w-full px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight w-full md:w-1/2">
               Discover the<br/>Game Catalogue
             </h2>
             <div className="w-full md:w-1/2 flex justify-center md:justify-end">
               <div className="relative">
                 <div className="absolute inset-2 bg-[#FFCC00] rounded-xl transform translate-x-3 translate-y-3"></div>
                 <img src="/ghost-of-yotei.jpg" alt="Ghost of Yotei" className="relative w-full max-w-md rounded-xl shadow-2xl object-cover aspect-[16/9] sm:aspect-auto" />
               </div>
             </div>
          </div>
        </div>
        
        {/* Carousel section */}
        <div className="px-4 py-8 sm:py-12 sm:px-6 mx-auto w-full max-w-7xl">
          <p className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-8 max-w-2xl font-medium">
            With NextGen Plus Extra or Deluxe you get access to more games from a huge on-demand library. Whether it's your go-to franchises and genres, games you always wanted to play or discovering new favourites by trying something completely different, there's always more to explore with the Game Catalogue.
          </p>
          
          <div className="flex items-center gap-6 mb-6">
            <button className="bg-white text-black font-bold px-5 py-2 rounded-full text-sm">Now trending</button>
            <button className="text-gray-400 font-bold text-sm hover:text-white transition-colors">What's new</button>
          </div>
          
          <div className="flex justify-between items-center mb-4 sm:hidden">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Swipe to explore &rarr;</span>
          </div>
          
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {[
              { title: "Hogwarts Legacy", genre: "Unique", desc: "Experience Hogwarts in the late 1800s in the immersive open-world action RPG.", img: "/marvels-spider-man-miles-morales.jpg" },
              { title: "Silent Hill 2", genre: "Horror", desc: "Experience psychological horror at its finest.", img: "/silent-hill-2.jpg" },
              { title: "RuneScape: Dragonwilds", genre: "Adventure", desc: "Explore a forgotten RuneScape continent.", img: "/horizon-zero-dawn-remastered.jpg" },
              { title: "Marvel's Spider-Man", genre: "Action", desc: "The worlds of Peter Parker and Spider-Man collide.", img: "/marvels-spider-man-2.jpg" },
            ].map((game, i) => (
              <div key={i} className="flex-none w-[200px] sm:w-[280px] bg-[#293047] rounded-2xl overflow-hidden snap-start group cursor-pointer border border-white/5 hover:border-white/20 transition-colors shadow-xl">
                <div className="aspect-square overflow-hidden">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[#3b82f6] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">{game.genre}</p>
                  <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-white">{game.title}</h4>
                  <p className="text-[11px] sm:text-xs text-gray-300 line-clamp-3">{game.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits at a Glance */}
      <section className="bg-gray-50 py-24 overflow-hidden relative">
        <div className="mx-auto max-w-7xl text-center mb-12 px-4 sm:px-6">
          <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">NextGen Plus at a glance</p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight max-w-3xl mx-auto uppercase">
            Benefits that enhance every way you play
          </h2>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: 'none' }}>
            {[
              { title: "Get exclusive discounts, in-game content and more", desc: "Access members-only NextGen deals and offers, and claim exclusive content packs.", btn: "Find exclusive content", img: "/marvels-spider-man-miles-morales.jpg" },
              { title: "Play hundreds of games", desc: "Build your personal collection with our Monthly Games. Find more of the games you love.", btn: "See all games", img: "/horizon-zero-dawn-remastered.jpg" },
              { title: "Enjoy games online with friends", desc: "Team up with or battle other players, showing the world your skills via online multiplayer.", btn: "Explore multiplayer", img: "/marvels-spider-man-2.jpg" },
              { title: "Cloud Storage and More", desc: "Keep your saves safe in the cloud and access them on any console, anywhere.", btn: "Learn more", img: "/silent-hill-2.jpg" }
            ].map((benefit, i) => (
              <div key={i} className="flex-none w-[80vw] sm:w-[350px] lg:w-auto snap-center bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-44 sm:h-52 relative overflow-hidden bg-gray-900">
                  <img src={benefit.img} className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105" alt={benefit.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent mix-blend-multiply" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1 bg-white">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">{benefit.title}</h4>
                  <p className="text-sm sm:text-base text-gray-500 mb-8 flex-1 leading-relaxed font-medium">{benefit.desc}</p>
                  <Button className="w-full sm:w-fit bg-gray-100 hover:bg-blue-600 text-gray-900 hover:text-white rounded-full px-6 py-6 sm:py-5 font-bold text-sm transition-colors shadow-sm">
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
              Which NextGen Plus membership is right for you?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Whether you're looking to join or upgrade, answer a few quick questions to find out exactly which NextGen Plus membership will get you more from your PlayStation experience.
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
