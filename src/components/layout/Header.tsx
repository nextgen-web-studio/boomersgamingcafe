'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const desktopNav = [
  { name: 'Store', href: '/' },
  { name: 'Games', href: '/games' },
  { name: 'PS5', href: '/ps5' },
  { name: 'PS4', href: '/ps4' },
  { name: 'Latest', href: '/latest' },
  { name: 'Collections', href: '/collections' },
  { name: 'Deals', href: '/deals' },
  { name: 'Subscriptions', href: '/subscriptions' },
  { name: 'Browse', href: '/browse' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1920px] px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                NEXT<span className="text-primary">GEN</span>
              </span>
            </Link>

            <nav className="hidden xl:flex items-center gap-1">
              {desktopNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-white/5 ${
                    pathname === item.href ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/wishlist" className="p-2 text-gray-300 hover:text-white transition-colors">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Link>
            <Link href="/account" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex xl:hidden items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <button 
              className="p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-background border-b border-border absolute w-full top-16 left-0">
          <nav className="flex flex-col p-4 gap-2">
            {desktopNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href ? 'text-primary bg-primary/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <Link href="/wishlist" className="p-3 text-gray-300 hover:text-white flex items-center gap-3">
              <Heart className="h-5 w-5" /> Wishlist
            </Link>
            <Link href="/account" className="p-3 text-gray-300 hover:text-white flex items-center gap-3">
              <User className="h-5 w-5" /> Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
