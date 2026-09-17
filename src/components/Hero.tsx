"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";

// Temporary placeholder data until we connect to Supabase
const HERO_GAMES = [
  {
    id: "1",
    title: "Grand Theft Auto VI",
    slug: "gta-6",
    description: "Welcome to Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.",
    platform: "PS5",
    price: "Rs 15,499",
    rentPrice: "Rs 1599 / 7 Days",
    image: "/images/gta-vi.jpg", // Local reliable image
  },
  {
    id: "2",
    title: "Marvel's Wolverine",
    slug: "wolverine",
    description: "A standalone game directed by Brian Horton and Cameron Christian, promising an emotional narrative and cutting-edge gameplay.",
    platform: "PS5",
    price: "Rs 14,999",
    rentPrice: "Rs 1499 / 7 Days",
    image: "/images/wolverine.jpg", 
  },
  {
    id: "3",
    title: "Ghost of Yōtei",
    slug: "ghost-of-yotei",
    description: "A new Ghost, a new time. Journey beyond the edge of Japan in this highly anticipated sequel.",
    platform: "PS5",
    price: "Rs 14,999",
    rentPrice: "Rs 1499 / 7 Days",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/library_hero.jpg",
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_GAMES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_GAMES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_GAMES.length) % HERO_GAMES.length);

  return (
    <div className="relative h-[65vh] min-h-[450px] md:h-[80vh] md:min-h-[600px] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${HERO_GAMES[currentIndex].image}')` }}
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 container mx-auto px-4 md:px-6 flex flex-col justify-end md:justify-center pb-20 md:pb-0">
        <div className="max-w-2xl z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-3 inline-flex items-center rounded-sm bg-white/20 backdrop-blur-md px-3 py-1 text-xs md:text-sm font-semibold text-white">
                {HERO_GAMES[currentIndex].platform}
              </div>
              <h1 className="mb-3 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg leading-tight">
                {HERO_GAMES[currentIndex].title}
              </h1>
              <p className="mb-6 text-sm md:text-lg text-white/80 line-clamp-2 md:line-clamp-3 max-w-lg">
                {HERO_GAMES[currentIndex].description}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <Link href={`/games/${HERO_GAMES[currentIndex].slug}`}>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 text-sm md:text-base px-6 md:px-8 flex-1 sm:flex-none font-bold">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
        <div className="flex gap-2 mr-4">
          {HERO_GAMES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <button 
          onClick={prevSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
