import Hero from '@/components/Hero';
import GameCard from '@/components/GameCard';
import { mockGames } from '@/lib/mockData';
import Link from 'next/link';

export default function Home() {
  const hotGames = mockGames.filter(g => g.isHot);
  const newGames = mockGames.filter(g => g.isNew);

  return (
    <div>
      <Hero />
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl font-bold">Trending Now</h2>
          <Link href="/games" className="text-sm font-medium text-white/60 hover:text-white transition">View All ?</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {hotGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-border">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl font-bold">New Releases</h2>
          <Link href="/new-releases" className="text-sm font-medium text-white/60 hover:text-white transition">View All ?</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {newGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}
