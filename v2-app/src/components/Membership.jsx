import React from 'react';
import { motion } from 'framer-motion';

export default function Membership() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-5xl font-bold mb-6 text-bgc-yellow">VIP Membership</h1>
      <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">Join the elite. Get priority booking, discounted hourly rates, and exclusive tournament access.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 border-white/20">
          <h2 className="text-3xl font-bold mb-2">Pro Tier</h2>
          <p className="text-4xl font-bold text-bgc-lime mb-6">?1499<span className="text-lg text-white/50 font-normal">/mo</span></p>
          <ul className="text-left space-y-3 mb-8">
            <li>? 10% off all bookings</li>
            <li>? Free energy drink per visit</li>
            <li>? Standard Tournament Entry</li>
          </ul>
          <button className="w-full py-3 bg-white/10 rounded-lg font-bold hover:bg-white/20">Join Pro</button>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card p-8 border-bgc-yellow/50 relative overflow-hidden">
          <div className="absolute top-4 right-[-35px] bg-bgc-yellow text-black text-xs font-bold px-10 py-1 rotate-45">POPULAR</div>
          <h2 className="text-3xl font-bold mb-2">Elite Tier</h2>
          <p className="text-4xl font-bold text-bgc-yellow mb-6">?2999<span className="text-lg text-white/50 font-normal">/mo</span></p>
          <ul className="text-left space-y-3 mb-8">
            <li>? 25% off all bookings</li>
            <li>? VIP Lounge Access</li>
            <li>? Free Tournament Entry</li>
          </ul>
          <button className="w-full py-3 bg-bgc-yellow text-black rounded-lg font-bold hover:bg-white">Join Elite</button>
        </motion.div>
      </div>
    </div>
  );
}
