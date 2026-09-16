"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, getAllGames, upsertGame, deleteGame, getAllNews, upsertNews, deleteNews, Game, NewsItem } from "../../../lib/supabase";
import { 
  LayoutDashboard, PackageSearch, Users, ShoppingCart,
  Settings, TrendingUp, Plus, X, Loader2, Newspaper
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const SIDEBAR_SECTIONS = ["Dashboard", "Games", "News", "Orders", "Users", "Settings"];
const SIDEBAR_ICONS = [LayoutDashboard, PackageSearch, Newspaper, ShoppingCart, Users, Settings];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const router = useRouter();

  const [games, setGames] = useState<Game[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const [editingGame, setEditingGame] = useState<Partial<Game> & { isNew?: boolean } | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> & { isNew?: boolean } | null>(null);

  const [alert, setAlert] = useState<{type: "success"|"error", msg: string} | null>(null);

  const showAlert = (type: "success"|"error", msg: string) => {
    setAlert({type, msg});
    setTimeout(() => setAlert(null), 3000);
  };

  // Load everything from Supabase
  useEffect(() => {
    // Admin is bypassed — load data immediately
    Promise.all([getAllGames(), getAllNews()]).then(([g, n]) => {
      setGames(g);
      setNewsList(n);
      setLoading(false);
    });
  }, []);

  // --- Game Handlers ---
  const handleSaveGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGame) return;
    setSaving(true);
    try {
      const payload: any = { ...editingGame };
      delete payload.isNew;
      if (payload.isNew) delete payload.id;

      // Convert comma-separated features/tags strings if user typed them
      if (typeof payload.features === 'string') {
        payload.features = (payload.features as string).split(',').map((s: string) => s.trim());
      }
      if (typeof payload.tags === 'string') {
        payload.tags = (payload.tags as string).split(',').map((s: string) => s.trim());
      }

      const saved = await upsertGame(payload);
      setGames(prev => {
        const exists = prev.find(g => g.id === saved.id);
        return exists ? prev.map(g => g.id === saved.id ? saved : g) : [saved, ...prev];
      });
      setEditingGame(null);
      showAlert("success", "Game saved successfully!");
    } catch (err: any) {
      showAlert("error", err.message || "Failed to save game.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm("Delete this game from the database?")) return;
    try {
      await deleteGame(id);
      setGames(prev => prev.filter(g => g.id !== id));
      setEditingGame(null);
      showAlert("success", "Game deleted.");
    } catch (err: any) {
      showAlert("error", err.message);
    }
  };

  // --- News Handlers ---
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    setSaving(true);
    try {
      const payload: any = { ...editingNews };
      delete payload.isNew;
      const saved = await upsertNews(payload);
      setNewsList(prev => {
        const exists = prev.find(n => n.id === saved.id);
        return exists ? prev.map(n => n.id === saved.id ? saved : n) : [saved, ...prev];
      });
      setEditingNews(null);
      showAlert("success", "News saved!");
    } catch (err: any) {
      showAlert("error", err.message || "Failed to save news.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Delete this news item?")) return;
    try {
      await deleteNews(id);
      setNewsList(prev => prev.filter(n => n.id !== id));
      setEditingNews(null);
      showAlert("success", "News deleted.");
    } catch (err: any) {
      showAlert("error", err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white gap-3">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Toast Alert */}
      {alert && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold transition-all ${alert.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {alert.msg}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-white/10 hidden md:flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-bold text-white tracking-tight">Store Admin</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {SIDEBAR_SECTIONS.map((section, i) => {
            const Icon = SIDEBAR_ICONS[i];
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-sm ${activeSection === section ? "bg-primary/10 text-primary" : "text-white/60 hover:text-white hover:bg-white/5"}`}
              >
                <Icon className="h-5 w-5" /> {section}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-sm" onClick={() => router.push('/')}>
            ← Back to Store
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-card border-b border-white/10 flex items-center justify-between px-6 shrink-0">
          <h2 className="text-xl font-semibold text-white">{activeSection}</h2>
          <span className="text-xs text-white/40 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full">● Live Database</span>
        </header>
        
        <main className="p-6 md:p-8 flex-1 overflow-y-auto space-y-8">
          
          {activeSection === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card border border-white/10 p-6 rounded-xl">
                <h4 className="text-white/60 text-sm mb-2">Total Revenue</h4>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-white">₹24,599</span>
                  <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full"><TrendingUp className="h-3 w-3 mr-1"/> 12%</span>
                </div>
              </div>
              <div className="bg-card border border-white/10 p-6 rounded-xl">
                <h4 className="text-white/60 text-sm mb-2">Total Orders</h4>
                <div className="text-3xl font-bold text-white">124</div>
              </div>
              <div className="bg-card border border-white/10 p-6 rounded-xl">
                <h4 className="text-white/60 text-sm mb-2">Active Rentals</h4>
                <div className="text-3xl font-bold text-white">45</div>
              </div>
              <div className="bg-card border border-white/10 p-6 rounded-xl">
                <h4 className="text-white/60 text-sm mb-2">Total Games</h4>
                <div className="text-3xl font-bold text-white">{games.length}</div>
              </div>
            </div>
          )}

          {activeSection === "Games" && (
            <div className="bg-card border border-white/10 rounded-xl">
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Games Library ({games.length})</h3>
                <Button onClick={() => setEditingGame({ isNew: true, title: "", slug: "", platform: "", price: "", rent_price: "", status: "active", tags: [], features: [] })} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Plus className="h-4 w-4" /> Add Game
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-white/70">
                  <thead className="bg-white/5 text-white/50 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4">Cover</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Platform</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {games.map(game => (
                      <tr key={game.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-3">
                          <img src={game.cover_image} alt={game.title} className="h-12 w-9 object-cover rounded" />
                        </td>
                        <td className="px-6 py-4 font-medium text-white">{game.title}</td>
                        <td className="px-6 py-4">{game.platform}</td>
                        <td className="px-6 py-4">{game.price}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${game.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {game.status === 'active' ? 'Active' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => setEditingGame({ ...game, features: (game.features || []).join(', '), tags: (game.tags || []).join(', ') } as any)} className="text-primary hover:underline font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "News" && (
            <div className="bg-card border border-white/10 rounded-xl">
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">News & Announcements</h3>
                <Button onClick={() => setEditingNews({ isNew: true, headline: "", body: "", date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), status: "Draft" })} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Plus className="h-4 w-4" /> Add News
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-white/70">
                  <thead className="bg-white/5 text-white/50 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4">Headline</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {newsList.map(news => (
                      <tr key={news.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white max-w-xs truncate">{news.headline}</td>
                        <td className="px-6 py-4">{news.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${news.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{news.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => setEditingNews(news as any)} className="text-primary hover:underline font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(activeSection === "Orders" || activeSection === "Users" || activeSection === "Settings") && (
            <div className="bg-card border border-white/10 rounded-xl p-12 text-center">
              <p className="text-white/50 text-lg">
                {activeSection} management requires Supabase tables to be fully set up. Coming soon!
              </p>
            </div>
          )}

        </main>
      </div>

      {/* Edit Game Modal */}
      {editingGame && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-white/10 rounded-xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{editingGame.isNew ? 'Add New Game' : `Edit: ${editingGame.title}`}</h3>
              <button onClick={() => setEditingGame(null)} className="text-white/50 hover:text-white"><X className="h-5 w-5"/></button>
            </div>
            <form onSubmit={handleSaveGame} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {label: "Title *", key: "title", type: "text", required: true, full: true},
                {label: "Slug (URL key) *", key: "slug", type: "text", required: true},
                {label: "Developer", key: "developer", type: "text"},
                {label: "Publisher", key: "publisher", type: "text"},
                {label: "Genre", key: "genre", type: "text"},
                {label: "Platform (e.g. PS5 • PS4)", key: "platform", type: "text"},
                {label: "Price (e.g. ₹3,999)", key: "price", type: "text"},
                {label: "Rent Price (e.g. ₹399)", key: "rent_price", type: "text"},
                {label: "Rating (e.g. 4.8)", key: "rating", type: "text"},
                {label: "Age Rating", key: "age_rating", type: "text"},
                {label: "Release Date", key: "release_date", type: "text"},
                {label: "Cover Image URL (/images/...)", key: "cover_image", type: "text"},
                {label: "Hero Image URL (/images/...)", key: "hero_image", type: "text"},
                {label: "Features (comma separated)", key: "features", type: "text"},
                {label: "Tags (e.g. top,ps5,deals)", key: "tags", type: "text"},
              ].map(f => (
                <div key={f.key} className={f.full ? "md:col-span-2" : ""}>
                  <label className="block text-xs text-white/60 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={(editingGame as any)[f.key] ?? ""}
                    onChange={e => setEditingGame({...editingGame, [f.key]: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white text-sm outline-none focus:border-primary"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="block text-xs text-white/60 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={(editingGame as any).description ?? ""}
                  onChange={e => setEditingGame({...editingGame, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white text-sm outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Status</label>
                <select value={editingGame.status ?? "active"} onChange={e => setEditingGame({...editingGame, status: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-md p-2 text-white text-sm outline-none focus:border-primary">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="md:col-span-2 pt-4 flex justify-between items-center border-t border-white/10">
                {!editingGame.isNew ? (
                  <Button type="button" variant="ghost" onClick={() => handleDeleteGame(editingGame.id!)} className="text-red-500 hover:bg-red-500/10">Delete Game</Button>
                ) : <div />}
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setEditingGame(null)}>Cancel</Button>
                  <Button type="submit" disabled={saving} className="bg-primary text-black hover:bg-primary/90 min-w-[120px]">
                    {saving ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : "Save Game"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit News Modal */}
      {editingNews && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-white/10 rounded-xl w-full max-w-lg shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{editingNews.isNew ? 'Add News' : 'Edit News'}</h3>
              <button onClick={() => setEditingNews(null)} className="text-white/50 hover:text-white"><X className="h-5 w-5"/></button>
            </div>
            <form onSubmit={handleSaveNews} className="p-6 space-y-4">
              <div>
                <label className="block text-xs text-white/60 mb-1">Headline *</label>
                <input required type="text" value={editingNews.headline ?? ""} onChange={e => setEditingNews({...editingNews, headline: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">Body / Content</label>
                <textarea rows={4} value={editingNews.body ?? ""} onChange={e => setEditingNews({...editingNews, body: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white text-sm outline-none focus:border-primary resize-none" />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">Date</label>
                <input type="text" value={editingNews.date ?? ""} onChange={e => setEditingNews({...editingNews, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">Status</label>
                <select value={editingNews.status ?? "Draft"} onChange={e => setEditingNews({...editingNews, status: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-md p-2 text-white text-sm outline-none focus:border-primary">
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="pt-4 flex justify-between items-center border-t border-white/10">
                {!editingNews.isNew ? (
                  <Button type="button" variant="ghost" onClick={() => handleDeleteNews(editingNews.id!)} className="text-red-500 hover:bg-red-500/10">Delete</Button>
                ) : <div />}
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setEditingNews(null)}>Cancel</Button>
                  <Button type="submit" disabled={saving} className="bg-primary text-black hover:bg-primary/90 min-w-[100px]">
                    {saving ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : "Save News"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
