"use client";
import { GameCard } from "@/components/GameCard";
import { DEMO_GAMES_DETAIL } from "@/lib/mockData";

export default function Page() {
  const allGames = Object.values(DEMO_GAMES_DETAIL);
  // We'll filter differently per page in real app, for now just show all relevant ones
  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Hot Deals</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {allGames.map((game) => (
            <GameCard key={game.slug} id={game.slug} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}
