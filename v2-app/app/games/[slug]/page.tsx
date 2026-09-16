import { mockGames } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { ShoppingCart, Heart, Clock } from 'lucide-react';

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = mockGames.find(g => g.slug === params.slug);
  if (!game) return notFound();

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
        <img src={game.heroImage} alt={game.title} className="w-full h-full object-cover opacity-60" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-32 flex flex-col md:flex-row gap-10">
        
        <div className="w-full md:w-[300px] shrink-0">
          <img src={game.coverImage} alt={game.title} className="w-full aspect-[3/4] object-cover rounded-xl shadow-2xl border border-border mb-6" />
          <div className="flex gap-2">
            {game.platforms.map(p => (
              <span key={p} className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm font-bold">{p}</span>
            ))}
          </div>
        </div>

        <div className="flex-1 pt-4">
          <div className="text-primary font-bold text-sm tracking-wider uppercase mb-2">{game.developer}</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">{game.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/60 mb-10 border-b border-border pb-6">
            <span>{game.releaseDate}</span>
            <span>•</span>
            <span>{game.genres.join(', ')}</span>
            <span>•</span>
            <span>? {game.rating} / 5.0</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            
            <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition" />
              <div className="text-sm text-white/60 mb-2">Permanent Purchase</div>
              <div className="text-3xl font-bold mb-6">?{game.salePrice || game.originalPrice}</div>
              <button className="w-full py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Buy Now
              </button>
            </div>

            {game.rentEnabled && (
              <div className="glass-panel p-6 rounded-xl border-accent/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition" />
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-white/60">Digital Rental</div>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-bold rounded">Popular</span>
                </div>
                <div className="text-3xl font-bold mb-6 text-accent">?{game.rentPrice} <span className="text-sm text-white/50 font-normal">/ {game.rentDurationDays} Days</span></div>
                <button className="w-full py-3.5 bg-accent text-black font-bold rounded-lg hover:bg-white transition flex items-center justify-center gap-2">
                  <Clock size={18} /> Rent Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
