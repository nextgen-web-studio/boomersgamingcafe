import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Trash2, UserRound, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useCart, removeFromCart, clearCart } from "@/lib/cart";

export function SiteHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const cartItems = useCart();
  const cartTotal = cartItems.reduce((total, item) => total + parseInt(item.price.replace(/[^\d]/g, "")), 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/", search: { q: searchQuery.trim() } });
      setIsMobileSearchOpen(false);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    if (!(window as any).Razorpay) {
      alert("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    const rzp = new (window as any).Razorpay({ 
      key: "rzp_test_TccMP6YnZ6PZD9", 
      amount: cartTotal * 100, 
      currency: "INR", 
      name: "PS Games Sales", 
      description: "Digital Games Purchase", 
      handler: function (response: any) { 
        clearCart();
        navigate({ to: "/success" });
      } 
    }); 
    rzp.open();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 font-bold" search={{}}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-xs text-ink-foreground">PS</span>
            <span className="truncate text-base sm:text-lg">PS Games Sales</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <Link to="/" search={{}} className="hover:text-foreground">Games</Link>
            <Link to="/" search={{ section: "new" }} className="hover:text-foreground">New</Link>
            <Link to="/" search={{ section: "deals" }} className="hover:text-foreground">Deals</Link>
            <Link to="/plus" className="hover:text-foreground">Plus</Link>
            <Link to="/news" className="hover:text-foreground">News</Link>
          </nav>
        </div>
        
        <div className="flex flex-1 justify-end items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearch} className="hidden sm:flex relative items-center max-w-xs w-full">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search games" 
              className="pl-9 rounded-full h-9 bg-muted border-transparent focus-visible:ring-1 focus-visible:bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search" 
            className="sm:hidden"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            {isMobileSearchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Shopping bag" className="relative">
                <ShoppingBag className="size-5" />
                {cartItems.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 size-2 bg-red-600 rounded-full" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto py-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                    <ShoppingBag className="size-16 text-muted-foreground/30" />
                    <p className="text-muted-foreground">Your cart is currently empty.</p>
                    <SheetClose asChild>
                      <Button className="mt-4" variant="outline" asChild>
                        <Link to="/" search={{}}>Continue Shopping</Link>
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.slug} className="flex gap-4 items-center">
                        <img src={item.image} alt={item.title} className="size-16 rounded-md object-cover bg-muted" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.price}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.slug)} className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="pt-6 border-t border-border mt-auto">
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>Rs {cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <Button className="w-full bg-[#00439c] hover:bg-[#00367a] text-white py-6 text-lg rounded-full" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          <Button variant="dark" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/sign-in"><UserRound className="size-4 mr-2" /> Sign In</Link>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden"><Menu className="size-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <SheetClose asChild><Link to="/" search={{}} className="text-lg font-medium py-2">Games</Link></SheetClose>
                <SheetClose asChild><Link to="/" search={{ section: "new" }} className="text-lg font-medium py-2">New Releases</Link></SheetClose>
                <SheetClose asChild><Link to="/" search={{ section: "deals" }} className="text-lg font-medium py-2">Deals</Link></SheetClose>
                <SheetClose asChild><Link to="/plus" className="text-lg font-medium py-2">PlayStation Plus</Link></SheetClose>
                <SheetClose asChild><Link to="/news" className="text-lg font-medium py-2">News</Link></SheetClose>
                <div className="h-px bg-border my-2" />
                <SheetClose asChild><Link to="/sign-in" className="text-lg font-medium py-2">Sign In</Link></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileSearchOpen ? 'max-h-20 opacity-100 border-t border-border' : 'max-h-0 opacity-0'}`}>
        <div className="p-3 bg-background">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search games..." 
              className="pl-9 rounded-full h-10 w-full bg-muted border-transparent focus-visible:ring-1 focus-visible:bg-muted-foreground/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
}