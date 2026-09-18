import { createFileRoute } from "@tanstack/react-router";
import { Check, Cloud, Gamepad2, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/plus")({
  head: () => ({ meta: [
    { title: "PlayStation Plus Memberships — PS Games Sales" },
    { name: "description", content: "Compare Essential, Extra, and Deluxe PlayStation Plus memberships." },
    { property: "og:title", content: "PlayStation Plus Memberships — PS Games Sales" },
    { property: "og:description", content: "Compare Essential, Extra, and Deluxe PlayStation Plus memberships." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PlusPage,
});

const plans = [
  { name: "Essential", detail: "Online multiplayer and monthly games", price: "₹499", features: ["Monthly games", "Online multiplayer", "Cloud storage"] },
  { name: "Extra", detail: "Hundreds of downloadable games", price: "₹749", features: ["Everything in Essential", "Game Catalog", "Ubisoft+ Classics"], popular: true },
  { name: "Deluxe", detail: "Classics, trials, and the full catalog", price: "₹849", features: ["Everything in Extra", "Classics Catalog", "Game trials"] },
];

function PlusPage() { return <main className="min-h-[calc(100vh-4rem)] bg-canvas">
  <section className="bg-ink px-4 py-16 text-center text-ink-foreground sm:py-24"><p className="text-xs font-semibold uppercase text-primary">PlayStation Plus</p><h1 className="mt-3 text-4xl font-bold sm:text-6xl">Choose your way to play</h1><p className="mx-auto mt-5 max-w-xl text-sm text-ink-muted sm:text-base">Discover new games, connect with friends, and get more from every PlayStation session.</p></section>
  <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16"><div className="grid gap-4 md:grid-cols-3">{plans.map((plan) => <article key={plan.name} className={`border p-6 ${plan.popular ? "border-primary bg-ink text-ink-foreground" : "border-border bg-background"}`}>
    <div className="flex items-start justify-between gap-3"><h2 className="text-xl font-bold">{plan.name}</h2>{plan.popular && <span className="text-[10px] font-semibold uppercase text-primary">Most popular</span>}</div><p className={`mt-2 min-h-10 text-sm ${plan.popular ? "text-ink-muted" : "text-muted-foreground"}`}>{plan.detail}</p><p className="mt-5 text-3xl font-bold">{plan.price}<span className={`text-xs font-normal ${plan.popular ? "text-ink-muted" : "text-muted-foreground"}`}> / month</span></p><Button variant={plan.popular ? "default" : "dark"} className="mt-6 w-full">Choose {plan.name}</Button><ul className="mt-6 space-y-3 text-sm">{plan.features.map(f => <li key={f} className="flex items-center gap-2"><Check className="size-4 text-primary" />{f}</li>)}</ul>
  </article>)}</div><div className="mt-14 grid grid-cols-3 gap-3 text-center text-xs font-semibold sm:text-sm">{[[Gamepad2,"Monthly games"],[UsersRound,"Online multiplayer"],[Cloud,"Cloud storage"]].map(([Icon,label]) => { const I=Icon as typeof Gamepad2; return <div key={label as string} className="flex flex-col items-center gap-3"><I className="size-6 text-primary" /><span>{label as string}</span></div>})}</div></section>
 </main>; }