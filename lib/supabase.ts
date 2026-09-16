import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Game Types ---
export interface Game {
  id: string;
  slug: string;
  title: string;
  developer: string;
  publisher: string;
  release_date: string;
  genre: string;
  platform: string;
  rating: string;
  age_rating: string;
  price: string;
  rent_price: string;
  description: string;
  hero_image: string;
  cover_image: string;
  features: string[];
  tags: string[];
  status: string;
  created_at: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  body: string;
  date: string;
  status: string;
  created_at: string;
}

// --- Game Queries ---
export async function getAllGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function upsertGame(game: Partial<Game>) {
  const { data, error } = await supabase
    .from('games')
    .upsert(game, { onConflict: 'slug' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteGame(id: string) {
  const { error } = await supabase.from('games').delete().eq('id', id);
  if (error) throw error;
}

// --- News Queries ---
export async function getAllNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
}

export async function upsertNews(item: Partial<NewsItem>) {
  const { data, error } = await supabase
    .from('news')
    .upsert(item)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteNews(id: string) {
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw error;
}
