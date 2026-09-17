"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const allowedPaths = ["/", "/subscription", "/cart"];
  
  // Only show footer on specific pages
  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="w-full bg-[#020617] border-t border-white/10 pt-20 pb-12 text-blue-200/50">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          
          <div className="col-span-2 md:col-span-1 mb-2 md:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-black text-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all">
                N
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">NextGen Store</span>
            </Link>
            <p className="text-sm pr-4 font-medium leading-relaxed">
              Your ultimate destination for the latest games, memberships and gaming experiences.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/games" className="hover:text-blue-400 transition-colors">Games</Link></li>
              <li><Link href="/ps5" className="hover:text-blue-400 transition-colors">PS5</Link></li>
              <li><Link href="/ps4" className="hover:text-blue-400 transition-colors">PS4</Link></li>
              <li><Link href="/subscription" className="hover:text-blue-400 transition-colors">Membership</Link></li>
              <li><Link href="/deals" className="hover:text-blue-400 transition-colors">Offers</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Connect</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Twitter / X</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Discord Community</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">YouTube</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-blue-200/40 font-medium text-center md:text-left">
            © 2026 NextGen Gaming Store. All rights reserved. <br className="md:hidden" />
            All games, characters, and trademarks are property of their respective owners.
          </div>
          
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold tracking-wide">
            <Shield className="h-4 w-4" /> NO REFUNDS ON DIGITAL PURCHASES OR RENTALS
          </div>
        </div>
      </div>
    </footer>
  );
}
