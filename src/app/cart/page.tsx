import { mockGames } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShieldCheck, CreditCard } from 'lucide-react';

export default function CartPage() {
  const cartItems = [mockGames[0], mockGames[1]];
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);
  const taxes = Math.round(subtotal * 0.18); // 18% tax example
  const total = subtotal + taxes;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-3xl font-black text-white mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-card border border-white/5 relative group">
              <div className="relative h-32 w-24 shrink-0 rounded-md overflow-hidden bg-muted">
                <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <div className="flex gap-2 mb-2">
                    {item.platforms.map(p => (
                      <span key={p} className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300 font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">
                    ₹{item.discountPrice || item.price}
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-full">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="rounded-xl bg-card border border-white/5 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 text-sm mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Estimated Tax</span>
                <span>₹{taxes}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between text-white text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 mb-4 transition-colors">
              <CreditCard className="h-5 w-5" /> Proceed to Checkout
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              Secure Checkout by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
