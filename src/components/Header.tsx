"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, Menu, Shield, X, Home, Gamepad2, MonitorSmartphone, Sparkles, Crown, Tag } from "lucide-react";
import { useState, useEffect } from "react";
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
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay with fade/blur */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          />
          
          {/* Side Drawer - Static (No Animation) & Smaller */}
          <div className="fixed top-0 right-0 bottom-0 w-[260px] bg-[#0a0a0a] border-l border-white/5 z-50 lg:hidden flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 bg-white/[0.02]">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/20">
                  N
                </div>
                <span className="text-lg font-bold tracking-tight text-white">NextGen</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center h-8 w-8 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation Content */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-hide">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="space-y-1">
                  <h3 className="px-2 mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                    {group.label}
                  </h3>
                  <div className="space-y-0.5">
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
                            flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                            ${isActive 
                              ? 'bg-primary/10 border border-primary/20 text-primary shadow-[inset_0_0_20px_rgba(var(--primary),0.05)]' 
                              : isPlus 
                                ? 'bg-gradient-to-r from-yellow-500/5 to-transparent border border-yellow-500/10 text-yellow-500/90 hover:text-yellow-400 hover:border-yellow-500/30'
                                : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                            }
                          `}
                        >
                          <Icon className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-primary' : isPlus ? 'text-yellow-500' : 'text-white/50 group-hover:text-white'}`} />
                          <span className="font-medium text-[13px]">{link.name}</span>
                          {link.name === 'Deals' && (
                            <span className="ml-auto text-[9px] font-bold bg-primary text-white px-1.5 py-[1px] rounded-full">HOT</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Admin Section */}
              <div className="space-y-1 pt-3 border-t border-white/5">
                <h3 className="px-2 mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                  Administration
                </h3>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                >
                  <Shield className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 text-white/40 group-hover:text-white" />
                  <span className="font-medium text-[13px]">Admin Panel</span>
                </Link>
              </div>
            </nav>

            {/* Account Area Sticky Bottom */}
            <div className="p-3 border-t border-white/5 bg-white/[0.01]">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-[13px]">My Account</span>
                  <span className="text-[11px] text-white/50">View profile & orders</span>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
