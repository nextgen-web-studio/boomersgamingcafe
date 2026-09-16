import React from 'react';
import { motion } from 'framer-motion';

export default function Admin() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 border-l-4 border-bgc-lime">
          <p className="text-sm text-white/60 mb-1">Today's Bookings</p>
          <p className="text-3xl font-bold">42</p>
        </div>
        <div className="glass-card p-6 border-l-4 border-bgc-yellow">
          <p className="text-sm text-white/60 mb-1">Active Users</p>
          <p className="text-3xl font-bold">18</p>
        </div>
        <div className="glass-card p-6 border-l-4 border-purple-500">
          <p className="text-sm text-white/60 mb-1">Revenue</p>
          <p className="text-3xl font-bold">?12,450</p>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/60 text-sm">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Station</th>
                <th className="pb-3 pr-4">Time</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-mono text-xs">#BK-9842</td>
                <td className="py-3 pr-4">Rahul S.</td>
                <td className="py-3 pr-4">PC-12 (Pune)</td>
                <td className="py-3 pr-4">Today, 7:00 PM</td>
                <td className="py-3 pr-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Confirmed</span></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-mono text-xs">#BK-9843</td>
                <td className="py-3 pr-4">Vikram M.</td>
                <td className="py-3 pr-4">Sim-02 (CBE)</td>
                <td className="py-3 pr-4">Today, 8:30 PM</td>
                <td className="py-3 pr-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
