"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { use } from "react";
import { DEMO_GAMES_DETAIL } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";

export default function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  // Fetch game dynamically from mock database (fallback to GoW if not found)
  const game = DEMO_GAMES_DETAIL[resolvedParams.slug as keyof typeof DEMO_GAMES_DETAIL] || DEMO_GAMES_DETAIL["god-of-war-ragnarok"]; 

  const handleBuy = () => {
    const numericPrice = parseInt(game.price.replace(/[^0-9]/g, ''), 10);
    addToCart({
      gameId: game.slug,
      title: game.title,
      platform: game.platform,
      coverImage: game.coverImage,
      purchaseType: "permanent",
      price: numericPrice
    });
  };

  const handleRent = () => {
    if (!game.rentPrice) return;
    const numericRent = parseInt(game.rentPrice.replace(/[^0-9]/g, ''), 10);
    addToCart({
      gameId: game.slug,
      title: game.title,
      platform: game.platform,
      coverImage: game.coverImage,
      purchaseType: "rental",
      price: numericRent
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-20">
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex gap-3">
        <Button onClick={handleBuy} className="flex-1 bg-white text-black hover:bg-white/90 font-bold text-sm">
          Buy {game.price}
        </Button>
        {game.rentPrice && (
          <Button onClick={handleRent} variant="secondary" className="flex-1 bg-white/10 text-white border border-white/20 text-sm">
            Rent {game.rentPrice}
          </Button>
        )}
      </div>

      {/* Hero Header Section */}
      <div className="relative h-[45vh] md:h-[60vh] min-h-[300px] md:min-h-[500px] w-full bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url('${game.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute inset-0 container mx-auto px-4 md:px-6 flex flex-col justify-end pb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-white/60 hover:text-white mb-6 w-fit transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Store
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="w-48 hidden md:block shrink-0 overflow-hidden rounded-lg shadow-2xl border border-white/10">
              <img src={game.coverImage} alt={game.title} className="w-full h-auto" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-white/70">
                <span className="rounded bg-white/10 px-2 py-1 backdrop-blur-md">{game.platform}</span>
                <span className="flex items-center"><Star className="mr-1 h-4 w-4 fill-primary text-primary" /> {game.rating}</span>
                <span>{game.releaseDate}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                {game.title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {game.developer} • {game.publisher}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Description & Details */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">About the Game</h2>
              <p className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">
                {game.description}
              </p>
            </section>
            
            <section className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
              <div>
                <h3 className="text-sm font-semibold text-white/50 mb-1">Platform</h3>
                <p className="font-medium text-white">{game.platform}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/50 mb-1">Genre</h3>
                <p className="font-medium text-white">{game.genre}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/50 mb-1">Publisher</h3>
                <p className="font-medium text-white">{game.publisher}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/50 mb-1">Age Rating</h3>
                <p className="font-medium text-white">{game.ageRating}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Features</h2>
              <ul className="space-y-2">
                {game.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/70">
                    <span className="text-primary mt-1">•</span> {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Purchase Sticky Box */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-xl border border-white/10 bg-card p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Choose Edition</h2>
              
              {/* Permanent Purchase Option */}
              <div onClick={handleBuy} className="rounded-lg border border-primary bg-primary/5 p-4 mb-4 cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white">Standard Edition</span>
                  <span className="text-xl font-bold text-white">{game.price}</span>
                </div>
                <p className="text-sm text-white/60 mb-4">Permanent Account License</p>
                <Button className="w-full mb-2 bg-white text-black hover:bg-white/90 font-bold">
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
              </div>

              {/* Rental Option - only show if rentPrice exists */}
              {game.rentPrice && (
              <div onClick={handleRent} className="rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white">Rent Game</span>
                  <span className="text-xl font-bold text-white">{game.rentPrice}</span>
                </div>
                <p className="text-sm text-white/60 mb-4">7 Days Access</p>
                <Button variant="secondary" className="w-full mb-2">
                  Rent Now
                </Button>
                <Button variant="ghost" className="w-full gap-2 text-white/60 hover:text-white">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
              </div>
              )}

              {/* Action Links */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                <button className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
                  <Heart className="h-4 w-4" /> Add to Wishlist
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
