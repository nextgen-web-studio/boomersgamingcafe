import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between" style={{ backgroundColor: 'rgba(7, 8, 10, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-3">
        <img src="/images/logo.png" alt="Logo" className="w-9 h-9 object-contain rounded-full bg-bgc-yellow p-0.5 shadow-[0_0_10px_rgba(239,189,78,0.5)]" />
        <span className="font-display font-bold text-lg hidden md:block tracking-tight text-white">BOOMERS <span className="font-sans font-medium text-white/80 text-sm">Gaming Cafe</span></span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold text-white uppercase tracking-widest">
        <a href="#games" className="hover:text-bgc-lime transition-colors">Games</a>
        <a href="#locations" className="hover:text-bgc-lime transition-colors">Locations</a>
        <a href="#tournaments" className="hover:text-bgc-lime transition-colors">Tournaments</a>
      </nav>

      <div className="flex items-center gap-4">
        <a href="#book" className="hidden md:inline-block bg-bgc-yellow text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded hover:bg-white transition-all shadow-[0_4px_14px_rgba(239,189,78,0.3)]">Book Now</a>
        <button className="md:hidden text-white bg-white/5 p-2 rounded-lg" onClick={() => setIsOpen(true)}><Menu size={24} /></button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-[#07080a] z-50 flex flex-col p-8">
            <div className="flex justify-end"><button className="text-white bg-white/10 p-2 rounded-full" onClick={() => setIsOpen(false)}><X size={28} /></button></div>
            <div className="flex flex-col gap-6 mt-12 text-3xl font-display font-bold">
              <a href="#games" onClick={() => setIsOpen(false)} className="border-b border-white/10 pb-4">Games</a>
              <a href="#locations" onClick={() => setIsOpen(false)} className="border-b border-white/10 pb-4">Locations</a>
              <a href="#book" onClick={() => setIsOpen(false)} className="text-bgc-lime">Book Now ?</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
