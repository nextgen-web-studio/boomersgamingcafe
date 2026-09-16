import { Hero } from "@/components/Hero";
import { GameCard } from "@/components/GameCard";
import { DEMO_GAMES_DETAIL } from "@/lib/mockData";

export default function Home() {
  const allGames = Object.values(DEMO_GAMES_DETAIL);
  const topGames = allGames.filter(g => g.tags?.includes("top"));
  const dealsGames = allGames.filter(g => g.tags?.includes("deals"));
  const upcomingGames = allGames.filter(g => g.tags?.includes("upcoming"));

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-background">
      <Hero />
      
      {/* Top Games */}
      <section className="container mx-auto px-4 pt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Top Games</h2>
          <a href="/games" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            View All →
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {topGames.map((game) => (
            <GameCard key={game.slug} id={game.slug} {...game} />
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Hot Deals</h2>
          <a href="/deals" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            View All →
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {dealsGames.map((game) => (
            <GameCard key={game.slug} id={game.slug} {...game} />
          ))}
        </div>
      </section>
      
      {/* Upcoming Games */}
      <section className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Upcoming Games</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {upcomingGames.map((game) => (
            <GameCard key={game.slug} id={game.slug} {...game} />
          ))}
        </div>
      </section>
    </div>
  );
}
