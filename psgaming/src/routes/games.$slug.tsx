import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Gamepad2, HardDrive, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { games, getGame } from "@/lib/games";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => { const game = getGame(params.slug); if (!game) throw notFound(); return game; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Game"} — PS Games Sales` },
    { name: "description", content: loaderData?.description ?? "PlayStation game details." },
    { property: "og:title", content: `${loaderData?.title ?? "Game"} — PS Games Sales` },
    { property: "og:description", content: loaderData?.description ?? "PlayStation game details." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: GamePage,
});

function GamePage() {
  const game = Route.useLoaderData();
  const trailer = game.trailer ?? "https://www.youtube.com/embed/uvZZvTRFbTs";
  
  const handleCheckout = () => {
    const rzp = new (window as any).Razorpay({ 
      key: "rzp_test_TccMP6YnZ6PZD9", 
      amount: parseInt(game.price.replace(/[^\d]/g, "")) * 100, 
      currency: "INR", 
      name: game.title, 
      description: "Digital Game Purchase", 
      handler: function (response: any) { 
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id); 
      } 
    }); 
    rzp.open();
  };

  return <main>
    <section className="bg-ink px-4 py-8 text-ink-foreground sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_400px] lg:items-center">
        <div className="aspect-video w-full max-w-2xl mx-auto overflow-hidden rounded-lg bg-ink-soft">
          <img src={game.image} alt={game.title} className="size-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-primary">{game.platform ?? "PS5"}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{game.title}</h1>
          <p className="mt-4 leading-6 text-ink-muted">{game.description.split(". ")[0]}.</p>
          <p className="mt-6 text-3xl font-bold">
            {game.price} 
            {game.oldPrice && <span className="ml-2 text-sm font-normal text-ink-muted line-through">{game.oldPrice}</span>}
          </p>
          <Button className="mt-6 w-full sm:w-auto" onClick={handleCheckout}>
            Buy for {game.price}
          </Button>
        </div>
      </div>
    </section>

    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="text-2xl font-bold">About the game</h2>
          <p className="mt-4 leading-7 text-muted-foreground">{game.description}</p>
          <div className="mt-7 grid grid-cols-2 gap-5 border-t border-border pt-5 text-xs sm:grid-cols-4">
            {[[Gamepad2,"PS5 enhanced"],[UsersRound,"1 player"],[HardDrive,"75 GB"],[Check,"Remote Play"]].map(([Icon,label]) => { 
              const I = Icon as typeof Gamepad2; 
              return <div key={label as string}><I className="mb-2 size-5 text-primary" />{label as string}</div>
            })}
          </div>
        </div>
        <aside className="bg-canvas p-5 rounded-md">
          <h2 className="font-bold">Game information</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div><dt className="text-muted-foreground">Genre</dt><dd>{game.genre}</dd></div>
            <div><dt className="text-muted-foreground">Platform</dt><dd>{game.platform ?? "PS5"}</dd></div>
            <div><dt className="text-muted-foreground">Publisher</dt><dd>PlayStation Studios</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section className="bg-canvas px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-center">Official trailer</h2>
        <div className="mt-5 aspect-video w-full overflow-hidden rounded-md bg-ink shadow-lg">
          <iframe 
            src={trailer} 
            title={`${game.title} official trailer`} 
            className="size-full" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </div>
      </div>
    </section>

    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {games.filter(g => g.slug !== game.slug).slice(0,5).map(g => <GameCard key={g.slug} game={g} />)}
        </div>
      </div>
    </section>
  </main>;
}
