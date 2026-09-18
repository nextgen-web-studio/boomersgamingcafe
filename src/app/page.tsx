import Image from 'next/image';
import Link from 'next/link';
import { GameCard } from '@/components/game/GameCard';
import { mockGames } from '@/lib/mock-data';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const featuredGame = mockGames[0]; // Just use first for now

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredGame.heroImage!}
            alt={featuredGame.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1920px] flex-col justify-center px-4 md:px-8">
          <div className="max-w-2xl">
            {featuredGame.isPreorder && (
              <span className="mb-4 inline-block rounded bg-purple-600 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
                Pre-Order Now
              </span>
            )}
            <h1 className="mb-4 text-5xl font-black tracking-tight text-white md:text-7xl">
              {featuredGame.title}
            </h1>
            <p className="mb-8 text-lg text-gray-300 line-clamp-3">
              {featuredGame.shortDescription}
            </p>
            <div className="mb-8 flex items-center gap-4">
              <span className="rounded-sm bg-white/20 backdrop-blur-md px-2 py-1 text-xs font-bold text-white">
                {featuredGame.platforms.join(' / ')}
              </span>
              <span className="text-sm font-semibold text-gray-300">{featuredGame.genre}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary/80 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                <ShoppingCart className="h-5 w-5" />
                ₹{featuredGame.price} - BUY NOW
              </button>
              <Link href={`/games/${featuredGame.slug}`} className="rounded-full bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/20 backdrop-blur-md">
                VIEW DETAILS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Trending Rows */}
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 py-12 flex flex-col gap-16">
        
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <Link href="/latest" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {mockGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Top Deals</h2>
            <Link href="/deals" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {mockGames.slice().reverse().map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
