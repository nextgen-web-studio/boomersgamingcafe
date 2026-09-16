import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/hero-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-20" onError={(e) => e.target.style.display = 'none'} />
        <div className="absolute inset-0 bg-gradient-to-t from-bgc-dark via-bgc-dark/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-bgc-yellow font-mono text-sm mb-4 tracking-widest uppercase"
        >
          Coimbatore • Pune • Est. 2018
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-6"
        >
          ENTER THE<br/>ARENA.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          High-spec battlestations, a pulse you can feel, and a community that plays to win. This is gaming, switched all the way on.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <a href="#book" className="inline-block bg-bgc-yellow text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-white transition-colors">
            BOOK NOW ?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
