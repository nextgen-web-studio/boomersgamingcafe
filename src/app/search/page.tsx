"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { DEMO_GAMES_DETAIL } from "@/lib/mockData";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  
  // Convert our mock data object into an array for easy filtering
  const gamesArray = Object.values(DEMO_GAMES_DETAIL);
  
  const filteredGames = gamesArray.filter(game => 
    game.title.toLowerCase().includes(query.toLowerCase()) || 
    game.genre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Search Games</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-white/40" />
          </div>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search games, genres, platforms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        {query && (
          <h2 className="text-xl font-medium text-white/60 mb-6">
            Found {filteredGames.length} results for "{query}"
          </h2>
        )}

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.slug}
                id={game.slug}
                title={game.title}
                slug={game.slug}
                coverImage={game.coverImage}
                platform={game.platform}
                price={game.price}
                rentPrice={game.rentPrice}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchIcon className="h-16 w-16 text-white/20 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">No games found</h3>
            <p className="text-white/60">Try searching for a different title or genre.</p>
          </div>
        )}
      </div>
    </div>
  );
}
