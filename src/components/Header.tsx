"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, Menu, Shield, X, Home, Gamepad2, MonitorSmartphone, Sparkles, Crown, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      { name: "Home", href: "/", icon: Home },
      { name: "Games", href: "/games", icon: Gamepad2 },
    ]
  },
  {
    label: "PLATFORM",
    items: [
      { name: "PS5", href: "/ps5", icon: MonitorSmartphone },
      { name: "PS4", href: "/ps4", icon: MonitorSmartphone },
    ]
  },
  {
    label: "DISCOVER",
    items: [
      { name: "New Releases", href: "/new-releases", icon: Sparkles },
      { name: "PlayStation Plus", href: "/subscription", icon: Crown },
      { name: "Deals", href: "/deals", icon: Tag },
    ]
  }
];

// Flat array for desktop nav to avoid changing desktop layout
const DESKTOP_LINKS = NAV_GROUPS.flatMap(g => g.items);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
            {DESKTOP_LINKS.map((link) => (
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

      {/* Enhanced Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay with fade/blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            />
            
            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%", boxShadow: "-20px 0 50px rgba(0,0,0,0)" }}
              animate={{ x: 0, boxShadow: "-20px 0 50px rgba(0,0,0,0.5)" }}
              exit={{ x: "100%", boxShadow: "-20px 0 50px rgba(0,0,0,0)" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-[#0a0a0a] border-l border-white/5 z-50 lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                    N
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white">NextGen</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center h-10 w-10 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Content */}
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="space-y-2">
                    <h3 className="px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                      {group.label}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        const isPlus = link.name === 'PlayStation Plus';
                        
                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group
                              ${isActive 
                                ? 'bg-primary/10 border border-primary/20 text-primary shadow-[inset_0_0_20px_rgba(var(--primary),0.05)]' 
                                : isPlus 
                                  ? 'bg-gradient-to-r from-yellow-500/5 to-transparent border border-yellow-500/10 text-yellow-500/90 hover:text-yellow-400 hover:border-yellow-500/30'
                                  : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                              }
                            `}
                          >
                            <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-primary' : isPlus ? 'text-yellow-500' : 'text-white/50 group-hover:text-white'}`} />
                            <span className="font-medium">{link.name}</span>
                            {link.name === 'Deals' && (
                              <span className="ml-auto text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">HOT</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Admin Section */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <h3 className="px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Administration
                  </h3>
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                  >
                    <Shield className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 text-white/40 group-hover:text-white" />
                    <span className="font-medium">Admin Panel</span>
                  </Link>
                </div>
              </nav>

              {/* Account Area Sticky Bottom */}
              <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-sm">My Account</span>
                    <span className="text-xs text-white/50">View profile & orders</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
