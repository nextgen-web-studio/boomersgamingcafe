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

  return <main>
    <section className="bg-ink text-ink-foreground relative w-full">
      <div className="relative w-full h-[60vh] min-h-[400px] sm:h-[80vh] sm:min-h-[600px] overflow-hidden group">
        
        {/* Images */}
        {heroGames.map((game, index) => (
          <img 
            key={game.id}
            src={game.image} 
            alt={game.title} 
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`} 
          />
        ))}

        <div className="absolute inset-0 bg-hero-shade z-10" />
        
        {/* Controls */}
        <button 
          onClick={() => setCurrentSlide(prev => (prev === 0 ? heroGames.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => (prev + 1) % heroGames.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl flex h-full flex-col justify-end p-6 pb-12 sm:p-10 sm:pb-16 transition-all duration-500">
          <div className="max-w-xl">
            <div className="bg-white text-black text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 inline-block rounded-sm mb-2 sm:mb-3">PS5</div>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl text-white">{activeHero.title}</h1>
            <p className="mt-3 sm:mt-4 max-w-md text-sm leading-6 text-gray-300 sm:text-base">{activeHero.description}</p>
            <div className="mt-5 sm:mt-6 flex items-center gap-4">
              <button 
                className="bg-[#00439c] hover:bg-[#00367a] text-white rounded-full px-5 sm:px-6 py-2 sm:py-3 font-bold flex items-center transition-colors text-sm sm:text-base"
                onClick={() => handleCheckout(activeHero)}
              >
                Add to cart &middot; {activeHero.price}
              </button>
              {activeHero.oldPrice && (
                <span className="text-sm text-gray-400 line-through">{activeHero.oldPrice}</span>
              )}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 right-10 z-20 flex gap-2">
          {heroGames.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="bg-canvas px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {q ? `Search results for "${q}"` : section === "new" ? "New Releases" : section === "deals" ? "Top Deals" : "Popular games"}
            </h2>
            {!q && (
              <p className="mt-1 text-sm text-muted-foreground">The biggest worlds and freshest adventures on PlayStation</p>
            )}
          </div>
          <span className="shrink-0 text-xs font-semibold text-primary">{filteredGames.length} games</span>
        </div>
        
        {filteredGames.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {filteredGames.map((game) => <GameCard key={game.slug} game={game} />)}
          </div>
        ) : (
          <div className="mt-12 text-center text-muted-foreground">
            <p>No games found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>

    <section className="bg-ink px-4 py-14 text-ink-foreground sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase text-primary">PlayStation Plus</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Play more. Discover more.</h2>
        <p className="mt-4 max-w-2xl text-ink-muted">Get monthly games, online multiplayer, exclusive discounts, and a huge catalog of PlayStation favorites.</p>
        <Link to="/plus" className={buttonVariants({ className: "mt-7" })}>
          Explore memberships <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  </main>;
}


