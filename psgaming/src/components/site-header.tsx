import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function SiteHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemsCount = 0; // Mock count, update with real state later

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/", search: { q: searchQuery.trim() } });
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 bg-white ${isScrolled ? 'shadow-md border-b-transparent' : 'border-b border-gray-100'}`}>
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tight" search={{}}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-600 text-sm text-white shadow-sm">NG</span>
            <span className="truncate text-lg sm:text-xl text-gray-900 hidden sm:inline-block">NextGen Store</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-gray-500 md:flex">
            <Link to="/" search={{}} className="hover:text-black transition-colors">Games</Link>
            <Link to="/" search={{ section: "new" }} className="hover:text-black transition-colors">New</Link>
            <Link to="/" search={{ section: "deals" }} className="hover:text-black transition-colors">Deals</Link>
            <Link to="/plus" className="hover:text-blue-600 transition-colors">NextGen Plus</Link>
            <Link to="/news" className="hover:text-black transition-colors">News</Link>
          </nav>
        </div>
        
        <div className="flex flex-1 justify-end items-center gap-1 sm:gap-3">
          <form onSubmit={handleSearch} className="hidden sm:flex relative items-center max-w-xs w-full">
            <Search className="absolute left-3 size-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search games..." 
              className="pl-10 rounded-full h-10 bg-gray-100 border-transparent focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search" 
            className="sm:hidden size-11 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            {isMobileSearchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Shopping bag" className="size-11 rounded-full relative text-gray-600 hover:text-black hover:bg-gray-100 transition-colors">
                <ShoppingBag className="size-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-black text-xl">Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-12 flex flex-col items-center justify-center text-center space-y-6">
                <ShoppingBag className="size-16 text-gray-200" />
                <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
                <SheetClose asChild>
                  <Button className="w-full rounded-full py-6 font-bold bg-blue-600 hover:bg-blue-700" asChild>
                    <Link to="/" search={{}}>Continue Shopping</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          <Button className="hidden sm:inline-flex bg-gray-900 hover:bg-black text-white rounded-full px-5 font-bold h-10" asChild>
            <Link to="/sign-in"><UserRound className="size-4 mr-2" /> Sign In</Link>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden size-11 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-[400px] border-r-0 shadow-2xl">
              <SheetHeader className="text-left mt-4 mb-6">
                <SheetTitle className="font-black text-2xl tracking-tight">NextGen</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1">
                <SheetClose asChild><Link to="/" search={{}} className="text-lg font-bold py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors">Games</Link></SheetClose>
                <SheetClose asChild><Link to="/" search={{ section: "new" }} className="text-lg font-bold py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors">New Releases</Link></SheetClose>
                <SheetClose asChild><Link to="/" search={{ section: "deals" }} className="text-lg font-bold py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors">Deals</Link></SheetClose>
                <SheetClose asChild><Link to="/plus" className="text-lg font-bold py-4 px-4 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors">NextGen Plus</Link></SheetClose>
                <SheetClose asChild><Link to="/news" className="text-lg font-bold py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors">News</Link></SheetClose>
                <div className="h-px bg-gray-100 my-4 mx-4" />
                <SheetClose asChild><Link to="/sign-in" className="text-lg font-bold py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center"><UserRound className="size-5 mr-3 text-gray-400" /> Sign In</Link></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileSearchOpen ? 'max-h-24 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 bg-white">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <Search className="absolute left-4 size-5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search games..." 
              className="pl-12 rounded-full h-12 w-full bg-gray-100 border-transparent focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white font-medium text-base transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
}