import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 overflow-hidden text-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/boomers_pc_lounge.jpg')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a] via-transparent to-[#07080a]/80"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center justify-center gap-3 text-bgc-yellow font-mono text-[11px] mb-6 tracking-[0.2em] uppercase font-bold">
          <span className="h-[1px] w-8 bg-bgc-yellow/50"></span>
          Coimbatore <span className="text-white/30">•</span> Pune <span className="text-white/30">•</span> Est. 2018
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="font-display text-[4.5rem] md:text-[8rem] font-bold tracking-[-0.04em] leading-[0.85] text-white uppercase drop-shadow-2xl">
          ENTER THE<br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>ARENA.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[15px] md:text-lg text-white/70 max-w-2xl mx-auto mt-8 mb-10 leading-[1.6]">
          High-spec battlestations, a pulse you can feel, and a community that plays to win. This is gaming, switched all the way on.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a href="#book" className="w-full md:w-auto bg-bgc-yellow text-black font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(239,189,78,0.2)]">
            BOOK NOW ?
          </a>
          <a href="#locations" className="w-full md:w-auto bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
            EXPLORE ARENA ?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
