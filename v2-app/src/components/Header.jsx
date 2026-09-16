import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/images/logo.png" alt="Boomer's Logo" className="w-10 h-10 object-contain rounded-full bg-bgc-yellow p-0.5" />
        <span className="font-bold text-lg hidden md:block tracking-tight">BOOMERS Gaming Cafe</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/70">
        <a href="#games" className="hover:text-white transition-colors">GAMES</a>
        <a href="#locations" className="hover:text-white transition-colors">LOCATIONS</a>
        <a href="#book" className="hover:text-white transition-colors">BOOK NOW</a>
      </nav>

      <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-bgc-dark/95 backdrop-blur-xl z-50 flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button className="text-white" onClick={() => setIsOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-12 text-3xl font-bold">
              <a href="#games" onClick={() => setIsOpen(false)}>Games</a>
              <a href="#locations" onClick={() => setIsOpen(false)}>Locations</a>
              <a href="#book" onClick={() => setIsOpen(false)} className="text-bgc-lime">Book Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
