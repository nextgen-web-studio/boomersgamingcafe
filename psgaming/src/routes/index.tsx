import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { games, godOfWarHero } from "@/lib/games";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "PS Games Sales — PlayStation Games & Deals" },
    { name: "description", content: "Shop PlayStation 5 games, new releases, deals, and PlayStation Plus memberships." },
    { property: "og:title", content: "PS Games Sales — PlayStation Games & Deals" },
    { property: "og:description", content: "Shop PlayStation 5 games, new releases, deals, and PlayStation Plus memberships." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  return <main>
    <section className="bg-ink px-4 py-5 text-ink-foreground sm:px-6 sm:py-6">
      <div className="relative mx-auto min-h-[430px] max-w-7xl overflow-hidden rounded-lg sm:min-h-[540px]">
        <img src={godOfWarHero} alt="Kratos and Atreus in God of War Ragnarök" className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-hero-shade" />
        <div className="relative flex min-h-[430px] max-w-lg flex-col justify-end p-6 sm:min-h-[540px] sm:p-10">
          <p className="text-xs font-semibold uppercase">PlayStation Studios</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">God of War<br />Ragnarök</h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-muted sm:text-base">Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.</p>
          <div className="mt-6 flex items-center gap-4"><Link to="/games/$slug" params={{ slug: "god-of-war-ragnarok" }} className={buttonVariants()}>Buy for ₹3,999</Link><span className="text-sm text-ink-muted line-through">₹4,999</span></div>
        </div>
      </div>
    </section>
    <section className="bg-canvas px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0"><h2 className="text-2xl font-bold sm:text-3xl">Popular games</h2><p className="mt-1 text-sm text-muted-foreground">The biggest worlds and freshest adventures on PlayStation</p></div>
          <span className="shrink-0 text-xs font-semibold text-primary">25 games</span>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">{games.map((game) => <GameCard key={game.slug} game={game} />)}</div>
      </div>
    </section>
    <section className="bg-ink px-4 py-14 text-ink-foreground sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase text-primary">PlayStation Plus</p><h2 className="mt-3 text-3xl font-bold sm:text-5xl">Play more. Discover more.</h2><p className="mt-4 max-w-2xl text-ink-muted">Get monthly games, online multiplayer, exclusive discounts, and a huge catalog of PlayStation favorites.</p><Link to="/plus" className={buttonVariants({ className: "mt-7" })}>Explore memberships <ArrowRight className="size-4" /></Link></div>
    </section>
  </main>;
}