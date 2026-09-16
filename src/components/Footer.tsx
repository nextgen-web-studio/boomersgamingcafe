import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#111] border-t border-white/10 pt-16 pb-8 text-gray-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white">NextGen Store</span>
            </Link>
            <p className="text-sm">
              Your ultimate destination for the latest games, rentals, and exclusive gaming subscriptions.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Store</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ps5" className="hover:text-white transition-colors">PS5 Games</Link></li>
              <li><Link href="/ps4" className="hover:text-white transition-colors">PS4 Games</Link></li>
              <li><Link href="/new-releases" className="hover:text-white transition-colors">New Releases</Link></li>
              <li><Link href="/deals" className="hover:text-white transition-colors">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Account Security</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Parental Controls</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Health Warning</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            © 2026 NextGen Gaming Store. All rights reserved. 
            All games, characters, and trademarks are property of their respective owners.
          </div>
          
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-bold">
            <Shield className="h-4 w-4" /> NO REFUNDS ON DIGITAL PURCHASES OR RENTALS
          </div>
        </div>
      </div>
    </footer>
  );
}
