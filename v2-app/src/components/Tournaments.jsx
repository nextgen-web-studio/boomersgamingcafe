import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Tournaments() {
  const [tournament, setTournament] = useState({
    name: 'Valorant Champions Clash',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: 'UPCOMING'
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">Live Events</h2>
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6 md:p-10 border-bgc-lime/30">
        <div className="inline-block px-3 py-1 bg-bgc-lime/20 text-bgc-lime text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
          {tournament.status}
        </div>
        <h3 className="text-3xl font-bold mb-2">{tournament.name}</h3>
        <p className="text-white/60 mb-6">Starting in 2 Days • Pune Arena</p>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-bgc-lime text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">Register Team</button>
          <button className="flex-1 border border-white/20 font-bold py-3 rounded-lg hover:bg-white/10 transition-colors">Watch Stream</button>
        </div>
      </motion.div>
    </div>
  );
}
