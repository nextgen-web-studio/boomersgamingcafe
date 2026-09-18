import { mockSubscriptions } from '@/lib/mock-data';
import { Check, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative w-full py-32 px-4 flex flex-col items-center justify-center text-center border-b border-border bg-black">
        <div className="absolute inset-0 opacity-40 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop"
            alt="Gaming Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-primary text-primary text-sm font-bold tracking-widest bg-primary/10">
            NEXTGEN MEMBERSHIP
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            More Games.<br />More ways to play.
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enhance your PlayStation experience with online multiplayer, monthly games, exclusive discounts and more.
          </p>
        </div>
      </section>

      {/* Plans Comparison */}
      <section className="py-24 px-4 max-w-[1920px] mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Choose your membership plan</h2>
          <p className="text-gray-400">Join NEXTGEN and discover your next great adventure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockSubscriptions.map((plan) => (
            <div key={plan.id} className="relative flex flex-col bg-card rounded-2xl border border-white/5 overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
              
              <div className={`h-2 w-full bg-gradient-to-r ${plan.color}`} />
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-white mb-1">
                  ₹{plan.price} <span className="text-sm text-muted-foreground font-normal">/ {plan.duration.toLowerCase()}</span>
                </div>
                <p className="text-sm text-gray-400 mt-4 mb-8 min-h-[60px]">
                  {plan.description}
                </p>

                <div className="flex flex-col gap-4 flex-grow mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-gray-200 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/cart" className="w-full text-center rounded-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 transition-colors">
                  Join {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
