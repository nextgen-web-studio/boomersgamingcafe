import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-3 font-bold">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-xs text-ink-foreground">PS</span>
            <span className="truncate text-base sm:text-lg">PS Games Sales</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link to="/" className="hover:text-foreground">Games</Link>
            <Link to="/" className="hover:text-foreground">New</Link>
            <Link to="/" className="hover:text-foreground">Deals</Link>
            <Link to="/plus" className="hover:text-foreground">Plus</Link>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <div className="hidden h-9 items-center gap-2 rounded-full bg-muted px-4 text-sm text-muted-foreground sm:flex">
            <Search className="size-4" /> Search games
          </div>
          <Button variant="ghost" size="icon" aria-label="Search" className="sm:hidden"><Search className="size-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Shopping bag"><ShoppingBag className="size-5" /></Button>
          <Button variant="dark" size="sm" className="hidden sm:inline-flex"><UserRound className="size-4" /> Sign in</Button>
          <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden"><Menu className="size-5" /></Button>
        </div>
      </div>
    </header>
  );
}