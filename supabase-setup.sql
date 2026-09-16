-- Run this entire script in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS games (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  developer TEXT,
  publisher TEXT,
  release_date TEXT,
  genre TEXT,
  platform TEXT,
  rating TEXT,
  age_rating TEXT,
  price TEXT,
  rent_price TEXT,
  description TEXT,
  hero_image TEXT,
  cover_image TEXT,
  features TEXT[],
  tags TEXT[],
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT NOT NULL,
  body TEXT,
  date TEXT,
  status TEXT DEFAULT 'Draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS so admin can freely read/write
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for service role" ON games FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON news FOR ALL USING (true) WITH CHECK (true);

-- Seed initial games
INSERT INTO games (slug, title, developer, publisher, release_date, genre, platform, rating, age_rating, price, rent_price, description, hero_image, cover_image, features, tags, status) VALUES
('spiderman-remastered', 'Marvel''s Spider-Man Remastered', 'Insomniac Games', 'PlayStation PC LLC', '2022-08-12', 'Action / Adventure', 'PS5', '4.8', 'Teen', '₹3,999', '₹399', 'In Marvel''s Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original action-packed story.', '/images/spiderman-cover.jpg', '/images/spiderman-cover.jpg', ARRAY['Single Player','DualSense Support','Ray Tracing'], ARRAY['top','ps5'], 'active'),
('god-of-war-ragnarok', 'God of War Ragnarök', 'Santa Monica Studio', 'PlayStation Publishing LLC', '2022-11-09', 'Action / Adventure', 'PS5 • PS4', '4.9', 'Mature 17+', '₹3,999', '₹399', 'Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives.', '/images/gow-hero.jpg', '/images/gow-cover.jpg', ARRAY['Offline play enabled','Remote Play supported'], ARRAY['top','ps5','ps4'], 'active'),
('elden-ring', 'Elden Ring', 'FromSoftware Inc.', 'Bandai Namco', '2022-02-25', 'Action / RPG', 'PS5 • PS4', '4.9', 'Mature 17+', '₹3,499', '₹299', 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace.', '/images/elden-cover.jpg', '/images/elden-cover.jpg', ARRAY['Online Multiplayer','Co-op Supported'], ARRAY['top','ps5','ps4'], 'active'),
('horizon-forbidden-west', 'Horizon Forbidden West', 'Guerrilla Games', 'PlayStation Publishing', '2022-02-18', 'Action / Adventure', 'PS5 • PS4', '4.7', 'Teen', '₹2,999', '₹299', 'Join Aloy as she braves the Forbidden West.', '/images/horizon-cover.jpg', '/images/horizon-cover.jpg', ARRAY['Single Player','4K HDR','3D Audio'], ARRAY['deals','ps5','ps4'], 'active'),
('tlou-1-remastered', 'The Last of Us Part I', 'Naughty Dog', 'PlayStation Publishing', '2022-09-02', 'Action / Survival', 'PS5', '4.9', 'Mature 17+', '₹2,999', '₹299', 'Experience the emotional storytelling of The Last of Us, rebuilt for PS5.', '/images/tlou-cover.jpg', '/images/tlou-cover.jpg', ARRAY['Single Player','Enhanced Graphics'], ARRAY['top','ps5'], 'active'),
('cyberpunk-2077', 'Cyberpunk 2077', 'CD PROJEKT RED', 'CD PROJEKT RED', '2020-12-10', 'RPG', 'PS5', '4.6', 'Mature 17+', '₹2,999', '₹499', 'An open-world, action-adventure RPG set in Night City.', '/images/cyberpunk-hero.jpg', '/images/cyberpunk-cover.jpg', ARRAY['Single Player','Ray Tracing'], ARRAY['deals','ps5'], 'active'),
('returnal', 'Returnal', 'Housemarque', 'PlayStation Publishing', '2021-04-30', 'Action / Rogue-like', 'PS5', '4.5', 'Teen', '₹3,999', '₹399', 'Break the cycle as Selene fights for survival in a shapeshifting alien world.', '/images/returnal-cover.jpg', '/images/returnal-cover.jpg', ARRAY['Single Player','Co-op'], ARRAY['top','ps5'], 'active'),
('ratchet-clank', 'Ratchet & Clank: Rift Apart', 'Insomniac Games', 'PlayStation Publishing', '2021-06-11', 'Platformer', 'PS5', '4.8', 'Everyone 10+', '₹3,999', '₹399', 'Blast your way through an interdimensional adventure.', '/images/ratchet-cover.jpg', '/images/ratchet-cover.jpg', ARRAY['Single Player'], ARRAY['top','ps5'], 'active'),
('uncharted', 'Uncharted: Legacy of Thieves', 'Naughty Dog', 'PlayStation Publishing', '2022-01-28', 'Action / Adventure', 'PS5', '4.7', 'Teen', '₹2,999', '₹299', 'Seek your legacy and leave your mark on the map.', '/images/uncharted-cover.jpg', '/images/uncharted-cover.jpg', ARRAY['Single Player'], ARRAY['deals','ps5'], 'active'),
('ghost-of-tsushima', 'Ghost of Tsushima Director''s Cut', 'Sucker Punch Productions', 'PlayStation PC LLC', '2024-05-16', 'Action / Adventure', 'PS5 • PS4', '4.9', 'Mature 17+', '₹3,999', '₹399', 'In the late 13th century, the Mongol empire has laid waste to entire nations.', '/images/ghost-cover.jpg', '/images/ghost-cover.jpg', ARRAY['Single Player','Co-op'], ARRAY['top','ps5','ps4'], 'active'),
('helldivers-2', 'Helldivers 2', 'Arrowhead Game Studios', 'PlayStation PC LLC', '2024-02-08', 'Action / Co-op', 'PS5 • PS4', '4.8', 'Mature 17+', '₹3,499', '₹349', 'Enlist in the Helldivers and join the fight for freedom.', '/images/helldivers2-cover.svg', '/images/helldivers2-cover.svg', ARRAY['Online Co-op','Multiplayer'], ARRAY['top','ps5'], 'active'),
('death-stranding', 'Death Stranding Director''s Cut', 'KOJIMA PRODUCTIONS', '505 Games', '2022-03-30', 'Action / Adventure', 'PS5', '4.6', 'Mature 17+', '₹2,999', '₹299', 'From Hideo Kojima comes a genre-defying experience.', '/images/deathstranding-cover.jpg', '/images/deathstranding-cover.jpg', ARRAY['Single Player'], ARRAY['deals','ps5'], 'active'),
('days-gone', 'Days Gone', 'Bend Studio', 'PlayStation PC LLC', '2021-05-18', 'Action / Survival', 'PS4', '4.5', 'Mature 17+', '₹2,499', '₹249', 'Ride and fight into a deadly, post pandemic America.', '/images/daysgone-cover.jpg', '/images/daysgone-cover.jpg', ARRAY['Single Player'], ARRAY['deals','ps4'], 'active'),
('gta-vi', 'Grand Theft Auto VI', 'Rockstar Games', 'Rockstar Games', 'Coming 2025', 'Action / Open World', 'PS5', 'TBD', 'Mature 17+', '₹5,499', NULL, 'Welcome to Leonida, the home of the neon-soaked streets of Vice City.', '/images/gta6-cover.svg', '/images/gta6-cover.svg', ARRAY['Single Player','Online Multiplayer'], ARRAY['upcoming','ps5'], 'draft'),
('wolverine', 'Marvel''s Wolverine', 'Insomniac Games', 'PlayStation Studios', 'Coming Soon', 'Action / Adventure', 'PS5', 'TBD', 'Mature 17+', '₹4,999', NULL, 'A standalone Wolverine game directed by Brian Horton and Cameron Christian.', '/images/wolverine-cover.svg', '/images/wolverine-cover.svg', ARRAY['Single Player','DualSense Support'], ARRAY['upcoming','ps5'], 'draft')
ON CONFLICT (slug) DO NOTHING;

-- Seed initial news
INSERT INTO news (headline, body, date, status) VALUES
('PlayStation Plus line-up for this month', 'Check out the free games available for PS Plus members this month.', 'Oct 12, 2026', 'Published'),
('State of Play announced', 'Sony has announced a new State of Play event showcasing upcoming PS5 titles.', 'Oct 10, 2026', 'Published'),
('Holiday Sale starts next week', 'Massive discounts on top PS5 and PS4 titles starting next week.', 'Oct 18, 2026', 'Draft')
ON CONFLICT DO NOTHING;
