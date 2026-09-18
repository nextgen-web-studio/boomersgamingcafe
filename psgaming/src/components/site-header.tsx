import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/", search: { q: searchQuery.trim() } });
    }
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
        
        <div className="flex flex-1 justify-end items-center gap-1.5 sm:gap-3">
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
          
          <Button variant="ghost" size="icon" aria-label="Search" className="sm:hidden"><Search className="size-5" /></Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Shopping bag"><ShoppingBag className="size-5" /></Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag className="size-16 text-muted-foreground/30" />
                <p className="text-muted-foreground">Your cart is currently empty.</p>
                <Button className="w-full mt-4" asChild>
                  <Link to="/" search={{}}>Continue Shopping</Link>
                </Button>
              </div>
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
                <Link to="/" search={{}} className="text-lg font-medium">Games</Link>
                <Link to="/" search={{ section: "new" }} className="text-lg font-medium">New Releases</Link>
                <Link to="/" search={{ section: "deals" }} className="text-lg font-medium">Deals</Link>
                <Link to="/plus" className="text-lg font-medium">PlayStation Plus</Link>
                <Link to="/news" className="text-lg font-medium">News</Link>
                <div className="h-px bg-border my-2" />
                <Link to="/sign-in" className="text-lg font-medium">Sign In</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}