import { createFileRoute, notFound } from "@tanstack/react-router";
import { Gamepad2, Heart, Star, StarHalf, Globe, User, Settings2, Lightbulb, ChevronRight, ChevronLeft, MonitorPlay } from "lucide-react";
import { useState, useRef } from "react";

import { GameCard } from "@/components/game-card";
import { games, getGame } from "@/lib/games";
import { addToCart, useCart } from "@/lib/cart";

function MediaCarousel({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Find the width of one card (using the first child)
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const scrollAmount = firstChild ? firstChild.clientWidth + 16 : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full mt-12 mb-8 group overflow-hidden">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-4 sm:px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scroll::-webkit-scrollbar { display: none; }
        `}} />
        {images.map((img, i) => (
          <div key={i} className="flex-none w-[78vw] sm:w-[60vw] md:w-[500px] snap-center aspect-video relative rounded-lg overflow-hidden bg-[#1f1f1f] border border-white/10 shrink-0 hide-scroll">
            <img src={img} className="w-full h-full object-cover" alt={`Screenshot ${i + 1}`} />
          </div>
        ))}
      </div>
      
      {activeIndex > 0 && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 sm:left-6 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors z-10 opacity-90"
        >
          <ChevronLeft className="size-6 -ml-0.5" />
        </button>
      )}
      {activeIndex < images.length - 1 && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 sm:right-6 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors z-10 opacity-90"
        >
          <ChevronRight className="size-6 ml-0.5" />
        </button>
      )}
      
      <div className="flex justify-center gap-1.5 mt-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-[2px] rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-white' : 'w-6 bg-[#444]'}`}
          />
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => { const game = getGame(params.slug); if (!game) throw notFound(); return game; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Game"} - PS Games Sales` },
    { name: "description", content: loaderData?.description ?? "PlayStation game details." },
  ]}), component: GamePage,
});

function GamePage() {
  const game = Route.useLoaderData();
  const trailer = game.trailer ?? "https://www.youtube.com/embed/uvZZvTRFbTs";
  const cartItems = useCart();
  const inCart = cartItems.some(i => i.slug === game.slug);
  
  const handleAddToCart = () => {
    addToCart({
      slug: game.slug,
      title: game.title,
      price: game.price,
      image: game.image,
    });
  };

  return <main className="bg-black min-h-screen pb-0">
    {/* Hero Section */}
    <section className="relative w-full bg-[#111] text-white">
      {/* Background Image Container */}
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:absolute lg:inset-0 lg:h-full lg:w-full">
        <img 
          src={game.image.replace('.jpg', '-wide.jpg')} 
          onError={(e) => (e.currentTarget.src = game.image)} 
          alt={game.title} 
          className="w-full h-full object-cover object-top" 
        />
        {/* Desktop Gradient Overlay (Hidden on Mobile) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/90 to-transparent" />
      </div>
      
      {/* Content Container (Below image on mobile, Overlaid on desktop) */}
      <div className="relative z-10 mx-auto max-w-7xl lg:h-[70vh] lg:min-h-[600px] flex flex-col justify-end lg:justify-center">
        <div className="bg-[#1f1f1f] lg:bg-transparent px-4 py-8 sm:px-6 md:p-8 lg:p-0 max-w-xl lg:mt-12 w-full lg:w-1/2 rounded-t-3xl lg:rounded-none -mt-6 lg:mt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:shadow-none">
          
          <h1 className="text-[32px] sm:text-5xl font-light mb-3 tracking-tight text-white leading-[1.1]">{game.title}</h1>
          <p className="text-[13px] font-bold text-gray-200 mb-4 tracking-wide">Sony Interactive Entertainment</p>
          
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="border border-white/40 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-sm">PS5</span>
            <span className="border border-white/40 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-sm uppercase">STANDARD EDITION</span>
            <span className="border border-white/40 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-sm uppercase">PS5 PRO ENHANCED</span>
          </div>

          <div className="flex items-center gap-1.5 mb-8">
            <span className="text-sm font-medium">4.79</span>
            <div className="flex items-center text-white">
              <Star className="size-3.5 fill-white" />
              <Star className="size-3.5 fill-white" />
              <Star className="size-3.5 fill-white" />
              <Star className="size-3.5 fill-white" />
              <StarHalf className="size-3.5 fill-white" />
            </div>
            <span className="text-sm text-gray-300 ml-1">32k ratings</span>
          </div>

          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-xl sm:text-2xl font-normal">{game.price}</span>
            {game.oldPrice && <span className="text-gray-400 text-sm line-through">{game.oldPrice}</span>}
          </div>

          <div className="flex items-center gap-3 w-full">
            <button 
              className={`flex-1 rounded-full py-3 sm:py-3.5 font-bold flex justify-center items-center transition-colors text-[15px] sm:text-lg ${inCart ? 'bg-[#333] text-gray-300 cursor-default' : 'bg-[#d1361f] hover:bg-[#b0301d] text-white'}`}
              onClick={handleAddToCart}
              disabled={inCart}
            >
              {inCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button className="flex-shrink-0 size-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Heart className="size-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Features / Game Overview Section */}
    <section className="bg-black text-white py-12 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] gap-12 sm:gap-20">
        
        {/* Features List (Left) */}
        <div className="order-1 lg:order-none">
          {/* IARC Badge */}
          <div className="flex gap-4 items-center border-b border-[#333] pb-6 mb-6">
            <div className="bg-white text-black font-black text-xl w-12 h-12 flex flex-col items-center justify-center border-2 border-black rounded-sm shrink-0">
              <span className="text-[8px] leading-none mb-0.5">IARC</span>
              <span>18+</span>
            </div>
            <div className="text-[13px] font-medium leading-tight">
              <p>Extreme Violence, Strong Language</p>
              <p className="text-gray-400 mt-1 font-normal">In-Game Purchases</p>
            </div>
          </div>
          
          <div className="space-y-5 text-[15px] font-medium text-gray-100">
            <div className="flex items-center gap-4">
              <Globe className="size-6 shrink-0 text-white" />
              <span>Offline play enabled</span>
            </div>
            <div className="flex items-center gap-4">
              <User className="size-6 shrink-0 text-white" />
              <span>1 player</span>
            </div>
            <div className="flex items-center gap-4">
              <Gamepad2 className="size-6 shrink-0 text-white" />
              <span>Remote Play supported</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-base font-bold mb-4">PS5 Version</h3>
            <div className="space-y-5 text-[15px] font-medium text-gray-100">
              <div className="flex items-start gap-4">
                <Settings2 className="size-6 shrink-0 mt-0.5 text-white" />
                <span>Vibration function and trigger effect supported (DualSense wireless controller)</span>
              </div>
              <div className="flex items-center gap-4">
                <MonitorPlay className="size-6 shrink-0 text-white" />
                <span>PS5 Pro Enhanced</span>
              </div>
              <div className="flex items-center gap-4">
                <Lightbulb className="size-6 shrink-0 text-white" />
                <span>Game Help supported</span>
              </div>
            </div>
            
            <button className="text-[#0070cc] font-medium mt-6 flex items-center gap-1 hover:underline text-[15px]">
              View All <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Description Text (Right on Desktop, Below on Mobile) */}
        <div className="order-3 lg:order-2 text-gray-200">
          <h2 className="text-3xl font-light mb-6 tracking-tight text-white lg:text-center text-left">Editions:</h2>
          <h2 className="text-3xl font-light mb-6 tracking-tight text-white mt-12">Game and Legal Info</h2>
          <p className="text-[15px] sm:text-base leading-relaxed mb-6">
            {game.description} Built to make every battle, journey and discovery feel immediate and unforgettable.
          </p>
        </div>

        {/* Media Carousel (Mobile: Middle, Desktop: Spans full width below) */}
        <div className="order-2 lg:order-3 lg:col-span-2 -mx-4 sm:mx-0">
          <MediaCarousel images={[
            game.image.replace('.jpg', '-wide.jpg'),
            game.image,
            "/marvels-spider-man-2.jpg",
            "/ghost-of-tsushima-hq.jpg",
            "/god-of-war-ragnarok.jpg",
            "/ratchet-and-clank-rift-apart.jpg"
          ]} />
        </div>
      </div>
    </section>

    {/* Trailer */}
    <section className="bg-black text-white px-4 py-8 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-5xl font-light mb-8 tracking-tight">Official trailer</h2>
        <div className="aspect-video w-full mx-auto overflow-hidden rounded-lg bg-[#111] shadow-2xl border border-white/10">
          <iframe 
            src={trailer} 
            title={`${game.title} official trailer`} 
            className="size-full" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </div>
      </div>
    </section>

    {/* You may also like */}
    <section className="bg-black text-white px-4 py-12 sm:px-6 sm:py-24 border-t border-[#333]">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl sm:text-4xl font-light mb-8 tracking-tight">You may also like</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-5">
          {games.filter(g => g.slug !== game.slug).slice(0, 5).map(g => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </div>
    </section>
  </main>;
}
