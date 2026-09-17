"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Shield, X, Home, Gamepad2, Star, Tag, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "PS5", href: "/ps5", icon: Gamepad2 },
  { name: "PS4", href: "/ps4", icon: Gamepad2 },
  { name: "New Releases", href: "/new-releases", icon: Star },
  { name: "PlayStation Plus", href: "/subscription", icon: Zap },
  { name: "Deals", href: "/deals", icon: Tag },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
              N
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NextGen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white ${link.name === 'PlayStation Plus' ? 'text-yellow-500 font-bold hover:text-yellow-400' : 'text-white/70'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/search" className="text-white/70 hover:text-white transition-colors" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative text-white/70 hover:text-white transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {items.length}
                </span>
              )}
            </Link>
            <Link href="/account" className="hidden md:block text-white/70 hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/admin" className="hidden md:block text-white/70 hover:text-white transition-colors" title="Admin Dashboard">
              <Shield className="h-5 w-5" />
            </Link>
            <button
              className="lg:hidden text-white/70 hover:text-white transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#111111] border-l border-white/10 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex justify-end p-4 border-b border-white/10">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col p-4 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-4 rounded-xl text-lg font-medium transition-colors flex items-center gap-3 ${
                      link.name === 'PlayStation Plus'
                        ? 'text-yellow-400 font-bold bg-yellow-500/10 border border-yellow-500/20 mt-2 mb-2'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="border-t border-white/10 mt-4 pt-4 space-y-1">
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    My Account
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Shield className="h-5 w-5" />
                    Admin Panel
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
