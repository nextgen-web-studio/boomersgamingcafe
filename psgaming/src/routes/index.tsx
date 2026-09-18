import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

import { buttonVariants } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { games } from "@/lib/games";

// Define search params type for TanStack Router
export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { section?: string; q?: string } => {
    return {
      section: search.section as string,
      q: search.q as string,
    };
  },
  head: () => ({ meta: [
    { title: "PS Games Sales — PlayStation Games & Deals" },
    { name: "description", content: "Shop PlayStation 5 games, new releases, deals, and PlayStation Plus memberships." },
    { property: "og:title", content: "PS Games Sales — PlayStation Games & Deals" },
    { property: "og:description", content: "Shop PlayStation 5 games, new releases, deals, and PlayStation Plus memberships." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const heroGames = [
  {
    id: "god-of-war-ragnarok",
    title: "God of War Ragnarök",
    subtitle: "PlayStation Studios",
    description: "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.",
    image: "/god-of-war-ragnarok-wide.jpg",
    price: "₹3,999",
    oldPrice: "₹4,999",
    amount: 399900
  },
  {
    id: "marvels-spider-man-2",
    title: "Marvel's Spider-Man 2",
    subtitle: "PlayStation Studios",
    description: "Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask.",
    image: "/marvels-spider-man-2-wide.jpg",
    price: "₹3,999",
    oldPrice: "₹4,999",
    amount: 399900
  },
  {
    id: "grand-theft-auto-vi",
    title: "Grand Theft Auto VI",
    subtitle: "Rockstar Games",
    description: "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond.",
    image: "/grand-theft-auto-vi.jpg",
    price: "₹5,499",
    amount: 549900
  }
];

function Index() {
  const { section, q } = Route.useSearch();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckout = (game: typeof heroGames[0]) => {
    const rzp = new (window as any).Razorpay({ 
      key: "rzp_test_TccMP6YnZ6PZD9", 
      amount: game.amount, 
      currency: "INR", 
      name: game.title, 
      description: "Digital Game Purchase", 
      handler: function (response: any) { 
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id); 
      } 
    }); 
    rzp.open();
  };

  // Filter games based on section or search query
  let filteredGames = games;
  
  if (q) {
    filteredGames = games.filter(g => g.title.toLowerCase().includes(q.toLowerCase()) || g.genre.toLowerCase().includes(q.toLowerCase()));
  } else if (section === "new") {
    // Mock "new" logic by slicing some specific games or checking a date
    // We'll just reverse and pick top 10 for demonstration of "New"
    filteredGames = [...games].reverse().slice(0, 10);
  } else if (section === "deals") {
    // Filter games that have an oldPrice
    filteredGames = games.filter(g => !!g.oldPrice);
  }

  const activeHero = heroGames[currentSlide];

  return <main className="bg-gray-50 overflow-x-hidden">
    <section className="bg-gray-900 text-white relative w-full overflow-hidden">
      <div className="relative w-full h-[70vh] min-h-[500px] sm:h-[80vh] sm:min-h-[600px] overflow-hidden group">
        
        {/* Images */}
        {heroGames.map((game, index) => (
          <img 
            key={game.id}
            src={game.image} 
            alt={game.title} 
            className={`absolute inset-0 size-full object-cover object-top sm:object-center transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 -z-10'}`} 
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Improved Layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-transparent z-10 sm:hidden" />
        
        {/* Controls */}
        <button 
          onClick={() => setCurrentSlide(prev => (prev === 0 ? heroGames.length - 1 : prev - 1))}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:text-white hover:scale-110 backdrop-blur-sm hidden sm:block"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => (prev + 1) % heroGames.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:text-white hover:scale-110 backdrop-blur-sm hidden sm:block"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl flex h-full flex-col justify-end p-5 pb-10 sm:p-10 sm:pb-16 transition-all duration-500">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white text-black text-[10px] sm:text-xs font-bold px-2 py-1 rounded-sm tracking-wider shadow-md">PS5</span>
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-blue-400 uppercase drop-shadow-md">{activeHero.subtitle}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-white drop-shadow-lg mb-3">
              {activeHero.title}
            </h1>
            
            <p className="max-w-md text-base sm:text-lg leading-relaxed text-gray-200 drop-shadow-md mb-6 font-medium">
              {activeHero.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/games/$slug"
                params={{ slug: activeHero.id }}
                className="bg-white hover:bg-gray-100 text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 font-bold flex items-center transition-all hover:scale-105 shadow-xl text-sm sm:text-base h-12 sm:h-14"
              >
                Explore game
              </Link>
            </div>
          </div>
          
          {/* Pagination dots for mobile */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 sm:hidden">
            {heroGames.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setCurrentSlide(i)}
                 className={`size-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-4' : 'bg-white/40'}`}
                 aria-label={`Go to slide ${i + 1}`}
               />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Top Games</h2>
          <p className="mt-1 text-sm text-gray-500 font-medium">Explore the best games on PS5.</p>
        </div>
        <div className="flex gap-2 pb-1 overflow-x-auto hide-scrollbar sm:pb-0">
          <Link to="/" search={{}} className={`rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${!section && !q ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900"}`}>
            All Games
          </Link>
          <Link to="/" search={{ section: "new" }} className={`rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${section === "new" ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900"}`}>
            New Releases
          </Link>
          <Link to="/" search={{ section: "deals" }} className={`rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${section === "deals" ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900"}`}>
            Deals
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameCard key={game.slug} game={game} />)
        ) : (
          <div className="col-span-full mt-12 text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-lg font-medium">No games found matching your criteria.</p>
            <Button variant="outline" className="mt-4 rounded-full" onClick={() => window.history.back()}>Go back</Button>
          </div>
        )}
      </div>
    </section>

    {/* Promotional Membership Section */}
    <section className="bg-gray-900 px-4 py-16 text-white sm:px-6 sm:py-24 relative overflow-hidden my-8 sm:my-16 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/20 to-purple-900/30 mix-blend-screen pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
             <span className="grid size-7 shrink-0 place-items-center rounded-md bg-blue-500 text-[10px] font-black text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/20">NG+</span>
             <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300 drop-shadow-sm">NextGen Membership</p>
          </div>
          <h2 className="text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 text-white leading-tight">Elevate Your Play.</h2>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl font-medium mb-8 md:mb-0">
            Join NextGen Plus for exclusive discounts, an ever-evolving game catalogue, and seamless multiplayer experiences on PS5.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <Link to="/plus" className="inline-flex w-full md:w-auto h-14 md:h-16 items-center justify-center rounded-full bg-white px-8 text-base md:text-lg font-bold text-blue-900 transition-all hover:bg-blue-50 hover:scale-105 shadow-xl shadow-white/10 text-center">
            Explore NextGen Plus <ArrowRight className="ml-3 size-5" />
          </Link>
        </div>
      </div>
    </section>
  </main>;
}
