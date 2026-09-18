'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';

export interface GameCardProps {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  platforms: string[];
  price: number;
  discountPrice?: number;
  rentPrice?: number;
  isNew?: boolean;
  isPreorder?: boolean;
  isIncludedInSubscription?: boolean;
}

export function GameCard({
  id,
  slug,
  title,
  coverImage,
  platforms,
  price,
  discountPrice,
  rentPrice,
  isNew,
  isPreorder,
  isIncludedInSubscription,
}: GameCardProps) {
  const currentPrice = discountPrice || price;

  return (
    <div className="group relative flex flex-col gap-3 rounded-lg bg-card transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
      <Link href={`/games/${slug}`} className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="rounded bg-blue-600 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
              NEW
            </span>
          )}
          {isPreorder && (
            <span className="rounded bg-purple-600 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
              PRE-ORDER
            </span>
          )}
          {isIncludedInSubscription && (
            <span className="rounded bg-yellow-500 px-2 py-0.5 text-xs font-bold text-black shadow-sm">
              INCLUDED
            </span>
          )}
        </div>
        
        {/* Platform Tags */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {platforms.map((p) => (
            <span key={p} className="rounded-sm bg-black/70 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-bold text-white">
              {p}
            </span>
          ))}
        </div>

        {/* Quick Actions (Hover) */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 xl:flex hidden">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/80 transition-colors shadow-lg">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors shadow-lg">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </Link>

      <div className="flex flex-col gap-1 px-1">
        <Link href={`/games/${slug}`} className="line-clamp-1 text-base font-semibold text-white hover:text-primary transition-colors">
          {title}
        </Link>
        <div className="flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-sm font-bold text-white">₹{discountPrice}</span>
              <span className="text-xs text-muted-foreground line-through">₹{price}</span>
            </>
          ) : (
            <span className="text-sm font-bold text-white">₹{price}</span>
          )}
        </div>
        {rentPrice && (
          <div className="text-xs font-medium text-primary">
            Rent from ₹{rentPrice}
          </div>
        )}
      </div>
    </div>
  );
}
