export type Game = {
  slug: string;
  title: string;
  genre: string;
  price: string;
  oldPrice?: string;
  image: string;
  description: string;
  platform?: string;
  trailer?: string;
};

const description = (title: string) =>
  `Experience ${title} on PlayStation 5. Discover detailed environments, fluid performance, and immersive DualSense wireless controller features designed to bring every moment closer.`;

export const games: Game[] = [
  { slug: "marvels-spider-man-2", title: "Marvel's Spider-Man 2", genre: "Action adventure", price: "₹3,999", oldPrice: "₹4,999", image: "/marvels-spider-man-2.jpg", description: description("Marvel's Spider-Man 2"), trailer: "https://www.youtube.com/embed/9fVYKsEmuRo" },
  { slug: "god-of-war-ragnarok", title: "God of War Ragnarök", genre: "Action adventure", price: "₹3,999", oldPrice: "₹4,999", image: "/god-of-war-ragnarok.jpg", description: "Kratos and Atreus journey through the Nine Realms as Ragnarök draws near. Discover detailed environments, fluid performance, and immersive DualSense wireless controller features designed to bring every moment closer.", platform: "PS5 • PS4", trailer: "https://www.youtube.com/embed/uvZZvTRFbTs" },
  { slug: "grand-theft-auto-vi", title: "Grand Theft Auto VI", genre: "Action • Open world", price: "₹5,499", image: "/grand-theft-auto-vi.jpg", description: description("Grand Theft Auto VI") },
  { slug: "ghost-of-yotei", title: "Ghost of Yōtei", genre: "Action adventure", price: "₹4,999", image: "/ghost-of-yotei.jpg", description: description("Ghost of Yōtei") },
  { slug: "astro-bot", title: "ASTRO BOT", genre: "Platformer", price: "₹3,999", image: "/astro-bot.jpg", description: description("ASTRO BOT") },
  { slug: "the-last-of-us-part-i", title: "The Last of Us Part I", genre: "Action adventure", price: "₹4,499", oldPrice: "₹4,999", image: "/the-last-of-us-part-i.jpg", description: description("The Last of Us Part I") },
  { slug: "horizon-forbidden-west", title: "Horizon Forbidden West", genre: "Action RPG", price: "₹3,499", oldPrice: "₹4,999", image: "/horizon-forbidden-west.jpg", description: description("Horizon Forbidden West") },
  { slug: "gran-turismo-7", title: "Gran Turismo 7", genre: "Racing", price: "₹3,999", oldPrice: "₹4,999", image: "/gran-turismo-7.jpg", description: description("Gran Turismo 7") },
  { slug: "helldivers-2", title: "Helldivers 2", genre: "Shooter", price: "₹2,999", image: "/helldivers-2.jpg", description: description("Helldivers 2") },
  { slug: "death-stranding-2-on-the-beach", title: "Death Stranding 2", genre: "Action", price: "₹4,999", image: "/death-stranding-2-on-the-beach.jpg", description: description("Death Stranding 2") },
  { slug: "stellar-blade", title: "Stellar Blade", genre: "Action", price: "₹4,499", oldPrice: "₹4,999", image: "/stellar-blade.jpg", description: description("Stellar Blade") },
  { slug: "rise-of-the-ronin", title: "Rise of the Ronin", genre: "Action RPG", price: "₹3,999", oldPrice: "₹4,999", image: "/rise-of-the-ronin.jpg", description: description("Rise of the Ronin") },
  { slug: "ratchet-and-clank-rift-apart", title: "Ratchet & Clank: Rift Apart", genre: "Platformer", price: "₹3,499", oldPrice: "₹4,999", image: "/ratchet-and-clank-rift-apart.jpg", description: description("Ratchet & Clank: Rift Apart") },
  { slug: "returnal", title: "Returnal", genre: "Roguelike shooter", price: "₹3,499", oldPrice: "₹4,999", image: "/returnal.jpg", description: description("Returnal") },
  { slug: "demons-souls", title: "Demon's Souls", genre: "Action RPG", price: "₹3,499", oldPrice: "₹4,999", image: "/demons-souls.jpg", description: description("Demon's Souls") },
  { slug: "sackboy-a-big-adventure", title: "Sackboy: A Big Adventure", genre: "Platformer", price: "₹2,499", oldPrice: "₹3,999", image: "/sackboy-a-big-adventure.jpg", description: description("Sackboy: A Big Adventure") },
  { slug: "uncharted-legacy-of-thieves-collection", title: "UNCHARTED: Legacy of Thieves", genre: "Action adventure", price: "₹2,499", oldPrice: "₹3,499", image: "/uncharted-legacy-of-thieves-collection.jpg", description: description("UNCHARTED: Legacy of Thieves") },
  { slug: "the-last-of-us-part-ii-remastered", title: "The Last of Us Part II Remastered", genre: "Action adventure", price: "₹2,999", oldPrice: "₹3,999", image: "/the-last-of-us-part-ii-remastered.jpg", description: description("The Last of Us Part II Remastered") },
  { slug: "marvels-spider-man-miles-morales", title: "Spider-Man: Miles Morales", genre: "Action adventure", price: "₹2,999", oldPrice: "₹3,999", image: "/marvels-spider-man-miles-morales.jpg", description: description("Spider-Man: Miles Morales") },
  { slug: "horizon-zero-dawn-remastered", title: "Horizon Zero Dawn Remastered", genre: "Action RPG", price: "₹2,999", oldPrice: "₹3,999", image: "/horizon-zero-dawn-remastered.jpg", description: description("Horizon Zero Dawn Remastered") },
  { slug: "lego-horizon-adventures", title: "LEGO Horizon Adventures", genre: "Adventure", price: "₹2,999", oldPrice: "₹3,999", image: "/lego-horizon-adventures.jpg", description: description("LEGO Horizon Adventures") },
  { slug: "until-dawn", title: "Until Dawn", genre: "Horror", price: "₹3,999", oldPrice: "₹4,999", image: "/until-dawn.jpg", description: description("Until Dawn") },
  { slug: "final-fantasy-vii-rebirth", title: "Final Fantasy VII Rebirth", genre: "Action RPG", price: "₹4,499", oldPrice: "₹4,999", image: "/final-fantasy-vii-rebirth.jpg", description: description("Final Fantasy VII Rebirth") },
  { slug: "silent-hill-2", title: "Silent Hill 2", genre: "Horror", price: "₹4,499", oldPrice: "₹4,999", image: "/silent-hill-2.jpg", description: description("Silent Hill 2") },
  { slug: "resident-evil-4-remake", title: "Resident Evil 4", genre: "Horror", price: "₹2,999", oldPrice: "₹3,999", image: "/resident-evil-4-remake.jpg", description: description("Resident Evil 4") },
];

export const godOfWarHero = "/god-of-war-ragnarok-wide.jpg";

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}