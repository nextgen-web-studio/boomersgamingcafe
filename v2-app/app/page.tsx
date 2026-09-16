import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl font-bold">Trending Now</h2>
          <a href="/games" className="text-sm font-medium text-white/60 hover:text-white transition">View All ?</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Skeletons/Mock Cards will go here */}
          <div className="aspect-[3/4] glass-panel rounded-xl animate-pulse"></div>
          <div className="aspect-[3/4] glass-panel rounded-xl animate-pulse"></div>
          <div className="aspect-[3/4] glass-panel rounded-xl animate-pulse"></div>
          <div className="aspect-[3/4] glass-panel rounded-xl animate-pulse"></div>
          <div className="aspect-[3/4] glass-panel rounded-xl animate-pulse"></div>
        </div>
      </section>
    </div>
  );
}
