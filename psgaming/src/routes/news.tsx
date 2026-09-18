import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  component: NewsPage,
});

const newsArticles = [
  {
    id: 1,
    category: "Announcements",
    title: "Ghost of Yōtei revealed for PlayStation 5",
    date: "September 18, 2026",
    image: "/ghost-of-yotei.jpg",
    featured: true,
  },
  {
    id: 2,
    category: "Hardware",
    title: "Introducing the PlayStation 5 Pro",
    date: "September 10, 2026",
    image: "/astro-bot.jpg", // Mock image since we don't have PS5 pro hardware image
  },
  {
    id: 3,
    category: "PlayStation Plus",
    title: "PlayStation Plus Monthly Games for October",
    date: "September 25, 2026",
    image: "/returnal.jpg",
  },
  {
    id: 4,
    category: "Updates",
    title: "Marvel's Spider-Man 2: New Suits Update",
    date: "September 15, 2026",
    image: "/marvels-spider-man-2-wide.jpg",
  },
  {
    id: 5,
    category: "Deep Dive",
    title: "Behind the scenes of Death Stranding 2",
    date: "September 12, 2026",
    image: "/death-stranding-2-on-the-beach.jpg",
  }
];

function NewsPage() {
  return (
    <main className="bg-canvas min-h-screen">
      <div className="bg-ink text-ink-foreground py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">PlayStation.Blog</h1>
          <p className="text-xl text-ink-muted">The latest news and updates on all things PlayStation.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article, idx) => (
            <article 
              key={article.id} 
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer ${article.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className={`overflow-hidden ${article.featured ? 'aspect-video' : 'aspect-[4/3]'}`}>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{article.category}</span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h2 className={`${article.featured ? 'text-3xl' : 'text-xl'} font-bold leading-tight group-hover:text-primary transition-colors`}>
                  {article.title}
                </h2>
                {article.featured && (
                  <p className="mt-4 text-muted-foreground line-clamp-2">
                    A new journey begins. Explore the breathtaking landscapes of 1603 Hokkaido in the next chapter of the Ghost franchise.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
