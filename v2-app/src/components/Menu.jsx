import React from 'react';
import { motion } from 'framer-motion';

export default function Menu() {
  const categories = [
    { name: 'Energy Drinks', items: ['Monster Energy', 'Red Bull', 'Gatorade'] },
    { name: 'Snacks', items: ['Loaded Nachos', 'French Fries', 'Chicken Popcorn'] },
    { name: 'Meals', items: ['Classic Burger', 'Club Sandwich', 'Margherita Pizza'] }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12 text-center text-bgc-yellow">Power-Up Station</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4 text-bgc-lime">{cat.name}</h2>
            <ul className="space-y-4">
              {cat.items.map(item => (
                <li key={item} className="flex justify-between border-b border-white/10 pb-2">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
