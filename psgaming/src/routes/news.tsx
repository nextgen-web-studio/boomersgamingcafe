import { createFileRoute } from "@tanstack/react-router";

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
    image: "/astro-bot.jpg",
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
    <main className="bg-[#f3f4f6] min-h-screen">
      {/* Colorful Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#00439c] via-[#0070d1] to-[#00439c] text-white py-24 px-4">
        <div className="absolute inset-0 bg-[url('/hero-bg-pattern.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-md">PlayStation.Blog</h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto drop-shadow">The latest news, updates, and deep dives into all things PlayStation.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, idx) => (
            <article 
              key={article.id} 
              className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer ${article.featured ? 'md:col-span-2 lg:col-span-2 transform md:-translate-y-4' : ''}`}
            >
              <div className={`overflow-hidden relative ${article.featured ? 'aspect-video' : 'aspect-[4/3]'}`}>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#00439c] bg-blue-50 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="text-sm font-semibold text-gray-400">{article.date}</span>
                </div>
                <h2 className={`${article.featured ? 'text-4xl' : 'text-2xl'} font-black leading-tight text-gray-900 group-hover:text-[#0070d1] transition-colors`}>
                  {article.title}
                </h2>
                {article.featured && (
                  <p className="mt-5 text-gray-600 text-lg font-medium leading-relaxed">
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
