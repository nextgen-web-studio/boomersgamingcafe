"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "./ui/Button";

interface GameCardProps {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  platform: string;
  price: string;
  rentPrice?: string;
  originalPrice?: string;
}

export function GameCard({
  id,
  title,
  slug,
  coverImage,
  platform,
  price,
  rentPrice,
  originalPrice,
}: GameCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50 hover:z-10 border border-white/5">
      {/* Cover Image */}
      <Link href={`/games/${slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {/* Placeholder gradient for image loading state */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent to-background opacity-50" />
        <img
          src={coverImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Quick Actions (Show on Hover) */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button 
            className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors shadow-lg ${isWishlisted ? 'bg-red-500 text-white' : 'bg-black/60 text-white hover:bg-white hover:text-black'}`}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Platform Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
            {platform}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-3 md:p-4">
        <Link href={`/games/${slug}`}>
          <h3 className="line-clamp-2 text-base md:text-lg font-bold leading-tight text-white transition-colors hover:text-primary min-h-[2.5rem]">
            {title}
          </h3>
        </Link>
        
        <div className="mt-3 md:mt-4 flex flex-col gap-2 md:gap-3">
          {/* Pricing */}
          <div className="flex flex-col gap-0.5">
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
            <span className="text-base md:text-lg font-semibold text-white">{price}</span>
            {rentPrice && (
              <span className="text-xs md:text-sm text-white/60">Rent: {rentPrice}</span>
            )}
          </div>

          {/* Buy Now / View Details */}
          <Link href={`/games/${slug}`} className="w-full mt-1">
            <Button className="w-full gap-2 transition-transform active:scale-95 bg-white text-black hover:bg-white/90 text-sm h-9 md:h-10">
              <span className="truncate font-bold">Buy Now</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
