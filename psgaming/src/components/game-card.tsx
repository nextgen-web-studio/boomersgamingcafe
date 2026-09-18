import { Link } from "@tanstack/react-router";
import type { Game } from "@/lib/games";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link to="/games/$slug" params={{ slug: game.slug }} className="group block min-w-0">
      <div className="aspect-square overflow-hidden rounded-md bg-muted">
        <img src={game.image} alt={`${game.title} cover`} className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" />
      </div>
      <div className="mt-2 flex gap-1 text-[10px] font-medium">
        <span className="bg-muted px-1.5 py-0.5 text-muted-foreground">PS5</span>
        {game.oldPrice && <span className="bg-badge px-1.5 py-0.5 text-badge-foreground">SALE</span>}
      </div>
      <h3 className="mt-2 truncate text-sm font-semibold">{game.title}</h3>
      <p className="mt-1 truncate text-xs text-muted-foreground">{game.genre}</p>
      <p className="mt-2 text-sm font-semibold">{game.price} {game.oldPrice && <span className="ml-1 text-xs font-normal text-muted-foreground line-through">{game.oldPrice}</span>}</p>
    </Link>
  );
}