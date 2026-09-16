import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({ branch: '', zone: '', station: '', time: '' });

  const handleBranchChange = (branch) => {
    setBooking({ branch, zone: '', station: '', time: '' });
  };

  const handleZoneChange = (zone) => {
    setBooking(prev => ({ ...prev, zone, station: '', time: '' }));
  };

  const steps = [
    { title: 'Branch', key: 'branch' },
    { title: 'Zone', key: 'zone' },
    { title: 'Station', key: 'station' },
    { title: 'Summary', key: 'summary' }
  ];

  return (
    <div className="glass-card p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Reserve Your Station</h2>
      
      <div className="flex justify-between mb-8 overflow-x-auto pb-4 gap-4">
        {steps.map((s, i) => (
          <div key={s.key} className={"flex-1 text-center min-w-[80px] pb-2 border-b-2 transition-colors " + (step >= i ? 'border-bgc-lime text-white' : 'border-white/10 text-white/40')}>
            <p className="text-xs font-mono mb-1">0{i + 1}</p>
            <p className="font-bold text-sm">{s.title}</p>
          </div>
        ))}
      </div>

      <div className="min-h-[300px]">
        {step === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => handleBranchChange('coimbatore')} className={"p-6 rounded-xl border-2 transition-all " + (booking.branch === 'coimbatore' ? 'border-bgc-lime bg-bgc-lime/10' : 'border-white/10 hover:border-white/30')}>Coimbatore</button>
            <button onClick={() => handleBranchChange('pune')} className={"p-6 rounded-xl border-2 transition-all " + (booking.branch === 'pune' ? 'border-bgc-lime bg-bgc-lime/10' : 'border-white/10 hover:border-white/30')}>Pune</button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['PC Arena', 'Sim Racing', 'Console Lounge'].map(zone => (
              <button key={zone} onClick={() => handleZoneChange(zone)} className={"p-6 rounded-xl border-2 transition-all " + (booking.zone === zone ? 'border-bgc-lime bg-bgc-lime/10' : 'border-white/10 hover:border-white/30')}>{zone}</button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-12">
            <p className="text-white/60 mb-4">Select Station & Time coming soon to v2...</p>
            <button onClick={() => setBooking(prev => ({...prev, station: 'PC-01', time: '19:00'}))} className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20">Auto-Pick Station 01 @ 7 PM</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 bg-white/5 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-bgc-lime">Booking Summary</h3>
            <p><strong>Branch:</strong> <span className="capitalize">{booking.branch}</span></p>
            <p><strong>Zone:</strong> {booking.zone}</p>
            <p><strong>Station:</strong> {booking.station}</p>
            <p><strong>Time:</strong> {booking.time}</p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="px-6 py-3 rounded-lg font-bold disabled:opacity-30 hover:bg-white/10">
          BACK
        </button>
        <button 
          onClick={() => setStep(s => Math.min(3, s + 1))} 
          disabled={(step === 0 && !booking.branch) || (step === 1 && !booking.zone) || (step === 2 && !booking.station) || step === 3}
          className="px-6 py-3 bg-bgc-yellow text-black rounded-lg font-bold disabled:opacity-30 hover:bg-white"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
