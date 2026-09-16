"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "./ui/Button";

// Temporary placeholder data until we connect to Supabase
const HERO_GAMES = [
  {
    id: "1",
    title: "Cyberpunk 2077: Phantom Liberty",
    description: "Return as cyber-enhanced mercenary V and embark on a high-stakes mission of espionage and intrigue to save the NUS President.",
    platform: "PS5",
    price: "₹2,999",
    rentPrice: "₹499 / 7 Days",
    image: "/images/cyberpunk-hero.jpg", 
  },
  {
    id: "2",
    title: "Ghost of Tsushima Director's Cut",
    description: "Uncover the hidden wonders of Tsushima in this open-world action adventure.",
    platform: "PS5",
    price: "₹3,999",
    rentPrice: "₹399 / 7 Days",
    image: "/images/ghost-hero.jpg",
  },
  {
    id: "3",
    title: "God of War Ragnarök",
    description: "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.",
    platform: "PS5 • PS4",
    price: "₹3,999",
    rentPrice: "₹399 / 7 Days",
    image: "/images/gow-hero.jpg",
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
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black">
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
      <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-2xl z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4 inline-flex items-center rounded-sm bg-white/20 backdrop-blur-md px-3 py-1 text-sm font-semibold text-white">
                {HERO_GAMES[currentIndex].platform}
              </div>
              <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                {HERO_GAMES[currentIndex].title}
              </h1>
              <p className="mb-8 text-lg text-white/80 line-clamp-3">
                {HERO_GAMES[currentIndex].description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Buy {HERO_GAMES[currentIndex].price}
                </Button>
                <Button size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20">
                  Rent {HERO_GAMES[currentIndex].rentPrice}
                </Button>
                <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
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
