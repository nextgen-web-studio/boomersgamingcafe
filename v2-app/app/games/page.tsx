import GameCard from '@/components/GameCard';
import { mockGames } from '@/lib/mockData';

export default function GamesPage() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">All Games</h1>
          <p className="text-white/60 text-sm">Discover the best digital games for your console.</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-surface border border-border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary">
            <option>All Platforms</option>
            <option>PS5</option>
            <option>PS4</option>
          </select>
          <select className="bg-surface border border-border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary">
            <option>Sort by: Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {mockGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
