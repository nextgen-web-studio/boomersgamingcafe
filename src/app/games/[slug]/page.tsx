import { mockGames } from '@/lib/mock-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ShoppingCart, Heart, Clock, Gamepad2, Info } from 'lucide-react';
import Link from 'next/link';

export default async function GameDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = mockGames.find(g => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={game.heroImage || game.coverImage}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1920px] flex-col justify-end px-4 pb-12 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            {/* Cover Image for Desktop */}
            <div className="hidden md:block relative h-72 w-48 shrink-0 overflow-hidden rounded-xl border-2 border-white/10 shadow-2xl">
              <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
            </div>

            <div className="flex-grow">
              <div className="mb-4 flex items-center gap-2">
                {game.platforms.map(p => (
                  <span key={p} className="rounded bg-white/20 backdrop-blur-md px-2 py-0.5 text-xs font-bold text-white">
                    {p}
                  </span>
                ))}
              </div>
              <h1 className="mb-2 text-4xl font-black text-white md:text-6xl tracking-tight">
                {game.title}
              </h1>
              <p className="mb-6 text-lg text-gray-300">
                {game.developer} • {game.genre}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/cart" className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary/80 hover:scale-105 shadow-lg shadow-primary/20">
                  <ShoppingCart className="h-5 w-5" />
                  ₹{game.discountPrice || game.price} - BUY NOW
                </Link>
                
                {game.rentPrice && (
                  <Link href="/cart" className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/20">
                    <Clock className="h-5 w-5" />
                    RENT FROM ₹{game.rentPrice}
                  </Link>
                )}

                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column (About & Media) */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">About this game</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {game.fullDescription || game.shortDescription}
            </p>
          </section>

          {/* Media Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Media</h2>
            <div className="flex flex-col gap-4">
              {/* Trailer */}
              {game.trailerUrl && (
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={game.trailerUrl} 
                    title="Game Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="border-0"
                  />
                </div>
              )}
              
              {/* Screenshots Gallery */}
              {game.screenshots && game.screenshots.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {game.screenshots.map((shot, idx) => (
                    <div key={idx} className={`relative aspect-video rounded-xl overflow-hidden border border-white/10 ${idx === 0 && game.screenshots!.length === 1 ? 'col-span-2' : ''}`}>
                      <Image src={shot} alt="Screenshot" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Right Column (Info) */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl bg-card border border-border p-6 flex flex-col gap-4">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Game Information
            </h3>
            
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="text-muted-foreground">Release Date:</div>
              <div className="text-white font-medium text-right">{game.releaseDate}</div>
              
              <div className="text-muted-foreground">Developer:</div>
              <div className="text-white font-medium text-right">{game.developer}</div>
              
              <div className="text-muted-foreground">Publisher:</div>
              <div className="text-white font-medium text-right">{game.publisher}</div>
              
              <div className="text-muted-foreground">Genre:</div>
              <div className="text-white font-medium text-right">{game.genre}</div>
              
              <div className="text-muted-foreground">Rating:</div>
              <div className="text-white font-bold text-right">{game.rating}</div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2 text-sm text-gray-300">
              {game.features?.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4 text-primary" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
