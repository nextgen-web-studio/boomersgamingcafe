'use client';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-display text-xl font-bold tracking-tight">
            NEXT<span className="text-primary">GEN</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/70">
            <Link href="/games" className="hover:text-white transition">Games</Link>
            <Link href="/ps5" className="hover:text-white transition">PS5</Link>
            <Link href="/ps4" className="hover:text-white transition">PS4</Link>
            <Link href="/new-releases" className="hover:text-white transition">New Releases</Link>
            <Link href="/deals" className="text-accent hover:text-white transition">Deals</Link>
          </nav>
        </div>
        <div className="flex items-center gap-5 text-white/70">
          <button className="hover:text-white transition"><Search size={20} /></button>
          <button className="hover:text-white transition relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <button className="hover:text-white transition hidden md:block"><User size={20} /></button>
          <button className="hover:text-white transition lg:hidden"><Menu size={20} /></button>
        </div>
      </div>
    </header>
  );
}
