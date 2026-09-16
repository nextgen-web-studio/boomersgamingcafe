'use client';
import { Game } from '@/types';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function GameCard({ game }: { game: Game }) {
  return (
    <div className="group relative flex flex-col bg-surface/50 rounded-xl overflow-hidden border border-border hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
      <Link href={/games/\} className="relative aspect-[3/4] overflow-hidden bg-black block">
        <img src={game.coverImage} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <button className="w-full py-2 bg-primary text-white font-bold rounded hover:bg-white hover:text-black transition text-sm">Quick View</button>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {game.platforms.map(p => (
            <span key={p} className="px-2 py-0.5 bg-black/70 backdrop-blur text-white text-[10px] font-bold rounded-sm border border-white/10 uppercase">{p}</span>
          ))}
        </div>
        <button className="absolute top-3 right-3 p-1.5 bg-black/50 backdrop-blur rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">
          <Heart size={16} />
        </button>
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-white/50 mb-1">{game.genres.join(', ')}</div>
        <Link href={/games/\}>
          <h3 className="font-bold text-white hover:text-primary transition line-clamp-1">{game.title}</h3>
        </Link>
        <div className="mt-auto pt-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Buy</span>
            <div className="flex items-center gap-2">
              {game.salePrice && <span className="text-xs text-white/40 line-through">?{game.originalPrice}</span>}
              <span className="font-bold">?{game.salePrice || game.originalPrice}</span>
            </div>
          </div>
          {game.rentEnabled && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Rent ({game.rentDurationDays}D)</span>
              <span className="font-bold text-accent">?{game.rentPrice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
