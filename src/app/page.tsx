'use client';

import { mockGames } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (game: any) => {
    setIsProcessing(true);
    try {
      const amount = game.discountPrice || game.price;
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: game.title,
        description: 'Purchase of Digital Game',
        order_id: order.id,
        handler: async function (response: any) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Player',
          email: 'player@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#00439C', // PlayStation Blue
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      alert('Checkout failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const heroGame = mockGames.find(g => g.slug === 'god-of-war-ragnarok') || mockGames[0];
  const gridGames = mockGames;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="min-h-screen bg-white text-black font-sans">
        
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <div className="w-6 h-6 bg-[#00439C] text-white flex items-center justify-center rounded-sm text-xs">PS</div>
                PS Games Sales
              </Link>
              <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                <Link href="/" className="text-black">Games</Link>
                <Link href="/?section=new" className="hover:text-black transition-colors">New</Link>
                <Link href="/?section=deals" className="hover:text-black transition-colors">Deals</Link>
                <Link href="/plus" className="hover:text-black transition-colors">Plus</Link>
              </nav>
            </div>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="relative w-full h-[600px] bg-black">
            <div className="absolute inset-0">
              <Image 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop" 
                alt="God of War Ragnarok" 
                fill 
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-xl">
                <h2 className="text-white text-sm font-bold tracking-widest uppercase mb-4">PlayStation Studios</h2>
                <h1 className="text-white text-5xl font-bold mb-4">{heroGame.title}</h1>
                <p className="text-white text-lg mb-8">
                  {heroGame.shortDescription}
                </p>
                <button 
                  onClick={() => handleCheckout(heroGame)}
                  className="bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                  Buy for ₹{heroGame.discountPrice || heroGame.price}
                </button>
              </div>
            </div>
          </section>

          {/* Games Grid */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-black mb-12">
              The biggest worlds and freshest adventures on PlayStation
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gridGames.map(game => (
                <div key={game.id} className="group flex flex-col gap-2 cursor-pointer" onClick={() => handleCheckout(game)}>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                    <Image 
                      src={game.coverImage} 
                      alt={game.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {game.platforms.map(p => (
                        <span key={p} className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                      {game.discountPrice && (
                        <span className="bg-[#FFC107] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                          SALE
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{game.title}</h3>
                    <p className="text-sm text-gray-500">{game.genre}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {game.discountPrice ? (
                        <>
                          <span className="font-bold text-gray-900">₹{game.discountPrice}</span>
                          <span className="text-sm text-gray-400 line-through">₹{game.price}</span>
                        </>
                      ) : (
                        <span className="font-bold text-gray-900">₹{game.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PlayStation Plus Section */}
          <section className="w-full bg-[#00439C] text-white py-24">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-4">PlayStation Plus</h2>
                <p className="text-xl mb-8 opacity-90">
                  Get monthly games, online multiplayer, exclusive discounts, and a huge catalog of PlayStation favorites.
                </p>
                <Link href="/plus" className="inline-block bg-white text-[#00439C] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
                  Explore memberships
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm text-gray-500">
            <div>
              <p className="font-bold text-gray-900 mb-1">PS Games Sales</p>
              <p>Independent storefront concept using official PlayStation game imagery.</p>
            </div>
            <div className="text-right text-xs">
              Built in NEXTGEN Repo
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
