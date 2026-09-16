"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Trash2, Gamepad2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      // 1. Create order on our backend
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });
      
      const order = await response.json();

      // 2. Open Razorpay Checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TccMP6YnZ6PZD9", 
        amount: order.amount,
        currency: order.currency,
        name: "NextGen Gaming Store",
        description: "Game Purchase / Rental",
        order_id: order.id,
        handler: function (response: any) {
          // Success callback
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          clearCart();
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0f172a", // Match dark theme
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment Failed. Please try again.");
      });
      
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bg-card border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center">
            <Gamepad2 className="h-20 w-20 text-white/20 mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/60 mb-8 max-w-md">
              Looks like you haven't added any games to your cart yet. Discover new releases and hot games in the store!
            </p>
            <Link href="/">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-card border border-white/10 rounded-xl p-4 relative group">
                  <div className="w-20 md:w-32 aspect-[3/4] shrink-0 rounded-md overflow-hidden relative">
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <div className="flex justify-between items-start pr-8">
                        <h3 className="text-base md:text-xl font-bold text-white line-clamp-2 leading-snug">{item.title}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-2">
                        <span className="text-[10px] md:text-xs font-semibold bg-white/10 text-white px-2 py-1 rounded backdrop-blur-md">
                          {item.platform}
                        </span>
                        <span className={`text-[10px] md:text-xs font-semibold px-2 py-1 rounded ${item.purchaseType === 'rental' ? 'bg-primary/20 text-primary' : 'bg-green-500/20 text-green-400'}`}>
                          {item.purchaseType === 'rental' ? '7-Day Rental' : 'Permanent'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <span className="text-xl font-bold text-white">₹{item.price}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-white/40 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-white/10 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal ({items.length} items)</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-white">₹{cartTotal}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout} 
                  disabled={isProcessing}
                  className="w-full bg-white text-black hover:bg-white/90 font-bold mb-4" 
                  size="lg"
                >
                  {isProcessing ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/80 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>Razorpay Checkout integration will securely process this payment.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
