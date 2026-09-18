import { createFileRoute, notFound } from "@tanstack/react-router";
import { Gamepad2, HardDrive, MonitorPlay, UsersRound } from "lucide-react";

import { GameCard } from "@/components/game-card";
import { games, getGame } from "@/lib/games";
import { addToCart, useCart } from "@/lib/cart";

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

  return <main className="bg-white min-h-screen pb-0">
    {/* Hero Section */}
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-black text-white">
      <img src={game.image.replace('.jpg', '-wide.jpg')} onError={(e) => (e.currentTarget.src = game.image)} alt={game.title} className="absolute inset-0 size-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl h-full flex flex-col justify-center px-4 sm:px-6">
        <div className="max-w-xl mt-12">
          <div className="bg-white text-black text-[10px] sm:text-xs font-bold px-2 py-1 inline-block rounded-sm mb-4">PS5</div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-4 tracking-tight">{game.title}</h1>
          <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">
            {game.description}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button 
              className={`rounded-full px-6 py-3 sm:px-8 sm:py-3.5 font-bold flex items-center transition-colors text-base sm:text-lg shadow-lg ${inCart ? 'bg-green-600 text-white cursor-default' : 'bg-[#00439c] hover:bg-[#00367a] text-white'}`}
              onClick={handleAddToCart}
              disabled={inCart}
            >
              {inCart ? 'Added to cart' : 'Add to cart'} &middot; {game.price}
            </button>
            {game.oldPrice && (
              <span className="text-gray-400 font-medium line-through">{game.oldPrice}</span>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Game Overview Section */}
    <section className="bg-[#f3f4f6] px-4 py-12 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.5fr_1fr] gap-12 sm:gap-16">
        <div>
          <p className="text-[#00439c] text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4">Game Overview</p>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight">A new generation of adventure</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-10">
            {game.description} Built to make every battle, journey and discovery feel immediate and unforgettable.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <Gamepad2 className="text-[#00439c] size-5 sm:size-6 mb-3 sm:mb-4" />
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase font-semibold mb-1">Genre</p>
              <p className="font-bold text-gray-900 text-sm sm:text-base">{game.genre}</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <UsersRound className="text-[#00439c] size-5 sm:size-6 mb-3 sm:mb-4" />
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase font-semibold mb-1">Players</p>
              <p className="font-bold text-gray-900 text-sm sm:text-base">1 player</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <HardDrive className="text-[#00439c] size-5 sm:size-6 mb-3 sm:mb-4" />
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase font-semibold mb-1">Storage</p>
              <p className="font-bold text-gray-900 text-sm sm:text-base">75 GB minimum</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <MonitorPlay className="text-[#00439c] size-5 sm:size-6 mb-3 sm:mb-4" />
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase font-semibold mb-1">Display</p>
              <p className="font-bold text-gray-900 text-sm sm:text-base">4K / HDR / 60fps</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Trailer */}
    <section className="bg-black text-white px-4 py-12 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-5xl font-black mb-8 sm:mb-12 tracking-tight">Official trailer</h2>
        <div className="aspect-video w-full mx-auto overflow-hidden rounded-2xl bg-[#111] shadow-2xl border border-white/10">
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
    <section className="bg-[#111] text-white px-4 py-12 sm:px-6 sm:py-24 border-t border-[#222]">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-10">You may also like</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-5">
          {games.filter(g => g.slug !== game.slug).slice(0, 5).map(g => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </div>
    </section>
  </main>;
}
