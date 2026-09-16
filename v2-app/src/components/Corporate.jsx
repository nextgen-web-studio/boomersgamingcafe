import React from 'react';
import { motion } from 'framer-motion';

export default function Corporate() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-5xl font-bold mb-6 text-bgc-yellow">Corporate & Events</h1>
        <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">Host your next team-building event, birthday party, or corporate tournament at Boomer's.</p>
      </motion.div>
      
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6">Request Event Booking</h2>
        <form className="space-y-4 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Company / Group Name" className="p-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-bgc-lime" />
            <input type="number" placeholder="Estimated Guests" className="p-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-bgc-lime" />
          </div>
          <input type="date" className="p-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-bgc-lime w-full" />
          <textarea placeholder="Tell us about your event requirements..." rows="4" className="p-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-bgc-lime w-full"></textarea>
          <button type="button" className="py-3 px-6 bg-bgc-lime text-black font-bold rounded-lg hover:bg-white self-start">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
