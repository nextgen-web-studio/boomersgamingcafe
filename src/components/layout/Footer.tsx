import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="mx-auto max-w-[1920px] px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <span className="text-3xl font-black tracking-tighter text-white uppercase">
                NEXT<span className="text-primary">GEN</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The premium digital gaming marketplace for the next generation of players. Discover, buy, and rent the best games.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Store</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/games" className="text-muted-foreground hover:text-white text-sm transition-colors">Games</Link></li>
              <li><Link href="/ps5" className="text-muted-foreground hover:text-white text-sm transition-colors">PS5</Link></li>
              <li><Link href="/ps4" className="text-muted-foreground hover:text-white text-sm transition-colors">PS4</Link></li>
              <li><Link href="/latest" className="text-muted-foreground hover:text-white text-sm transition-colors">Latest</Link></li>
              <li><Link href="/deals" className="text-muted-foreground hover:text-white text-sm transition-colors">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Account</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/account" className="text-muted-foreground hover:text-white text-sm transition-colors">My Account</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-white text-sm transition-colors">Orders & Rentals</Link></li>
              <li><Link href="/wishlist" className="text-muted-foreground hover:text-white text-sm transition-colors">Wishlist</Link></li>
              <li><Link href="/subscriptions" className="text-muted-foreground hover:text-white text-sm transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/contact" className="text-muted-foreground hover:text-white text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-white text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} NEXTGEN Gaming Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Payments securely processed by Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
