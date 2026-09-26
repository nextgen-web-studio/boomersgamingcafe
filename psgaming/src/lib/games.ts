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
  { slug: "marvels-spider-man-2", title: "Marvel's Spider-Man 2", genre: "Action adventure", price: "₹13,999", oldPrice: "₹14,999", image: "/marvels-spider-man-2.jpg", description: description("Marvel's Spider-Man 2"), trailer: "https://www.youtube.com/embed/bgqGdIoa52s" },
  { slug: "god-of-war-ragnarok", title: "God of War Ragnarok", genre: "Action adventure", price: "₹13,999", oldPrice: "₹14,999", image: "/god-of-war-ragnarok.jpg", description: "Kratos and Atreus journey through the Nine Realms as Ragnarok draws near. Discover detailed environments, fluid performance, and immersive DualSense wireless controller features designed to bring every moment closer.", platform: "PS5 - PS4", trailer: "https://www.youtube.com/embed/tQH0YK1rGVc" },
  { slug: "grand-theft-auto-vi", title: "Grand Theft Auto VI", genre: "Action - Open world", price: "₹15,499", image: "/grand-theft-auto-vi.jpg", description: description("Grand Theft Auto VI"), trailer: "https://www.youtube.com/embed/l6RRdTFuepk" },
  { slug: "ghost-of-yotei", title: "Ghost of Yotei", genre: "Action adventure", price: "₹14,999", image: "/ghost-of-yotei.jpg", description: description("Ghost of Yotei"), trailer: "https://www.youtube.com/embed/d48IWwIRg98" },
  { slug: "astro-bot", title: "ASTRO BOT", genre: "Platformer", price: "₹13,999", image: "/astro-bot.jpg", description: description("ASTRO BOT"), trailer: "https://www.youtube.com/embed/unYFdcEjV9k" },
  { slug: "the-last-of-us-part-i", title: "The Last of Us Part I", genre: "Action adventure", price: "₹14,499", oldPrice: "₹14,999", image: "/the-last-of-us-part-i.jpg", description: description("The Last of Us Part I"), trailer: "https://www.youtube.com/embed/R2Ebc_OFeug" },
  { slug: "horizon-forbidden-west", title: "Horizon Forbidden West", genre: "Action RPG", price: "₹13,499", oldPrice: "₹14,999", image: "/horizon-forbidden-west.jpg", description: description("Horizon Forbidden West"), trailer: "https://www.youtube.com/embed/UxDWGW7Z67I" },
  { slug: "gran-turismo-7", title: "Gran Turismo 7", genre: "Racing", price: "₹13,999", oldPrice: "₹14,999", image: "/gran-turismo-7.jpg", description: description("Gran Turismo 7"), trailer: "https://www.youtube.com/embed/oz-O74SmTSQ" },
  { slug: "helldivers-2", title: "Helldivers 2", genre: "Shooter", price: "₹12,999", image: "/helldivers-2.jpg", description: description("Helldivers 2"), trailer: "https://www.youtube.com/embed/2iZox9M8sWI" },
  { slug: "death-stranding-2-on-the-beach", title: "Death Stranding 2", genre: "Action", price: "₹14,999", image: "/death-stranding-2-on-the-beach.jpg", description: description("Death Stranding 2"), trailer: "https://www.youtube.com/embed/od0ULrKzylQ" },
  { slug: "stellar-blade", title: "Stellar Blade", genre: "Action", price: "₹14,499", oldPrice: "₹14,999", image: "/stellar-blade.jpg", description: description("Stellar Blade"), trailer: "https://www.youtube.com/embed/V6XYHiBxkvk" },
  { slug: "rise-of-the-ronin", title: "Rise of the Ronin", genre: "Action RPG", price: "₹13,999", oldPrice: "₹14,999", image: "/rise-of-the-ronin.jpg", description: description("Rise of the Ronin"), trailer: "https://www.youtube.com/embed/34FMSgdzzvI" },
  { slug: "ratchet-and-clank-rift-apart", title: "Ratchet & Clank: Rift Apart", genre: "Platformer", price: "₹13,499", oldPrice: "₹14,999", image: "/ratchet-and-clank-rift-apart.jpg", description: description("Ratchet & Clank: Rift Apart"), trailer: "https://www.youtube.com/embed/55PRv_e00wc" },
  { slug: "returnal", title: "Returnal", genre: "Roguelike shooter", price: "₹13,499", oldPrice: "₹14,999", image: "/returnal.jpg", description: description("Returnal"), trailer: "https://www.youtube.com/embed/ZsVRtrRsUBk" },
  { slug: "demons-souls", title: "Demon's Souls", genre: "Action RPG", price: "₹13,499", oldPrice: "₹14,999", image: "/demons-souls.jpg", description: description("Demon's Souls"), trailer: "https://www.youtube.com/embed/qjZIw0VUezU" },
  { slug: "sackboy-a-big-adventure", title: "Sackboy: A Big Adventure", genre: "Platformer", price: "₹12,499", oldPrice: "₹13,999", image: "/sackboy-a-big-adventure.jpg", description: description("Sackboy: A Big Adventure"), trailer: "https://www.youtube.com/embed/ZOk3fj5ujNM" },
  { slug: "uncharted-legacy-of-thieves-collection", title: "UNCHARTED: Legacy of Thieves", genre: "Action adventure", price: "₹12,499", oldPrice: "₹13,499", image: "/uncharted-legacy-of-thieves-collection.jpg", description: description("UNCHARTED: Legacy of Thieves"), trailer: "https://www.youtube.com/embed/F3Wl-OiZCO4" },
  { slug: "the-last-of-us-part-ii-remastered", title: "The Last of Us Part II Remastered", genre: "Action adventure", price: "₹12,999", oldPrice: "₹13,999", image: "/the-last-of-us-part-ii-remastered.jpg", description: description("The Last of Us Part II Remastered"), trailer: "https://www.youtube.com/embed/-llaUBqovHw" },
  { slug: "marvels-spider-man-miles-morales", title: "Spider-Man: Miles Morales", genre: "Action adventure", price: "₹12,999", oldPrice: "₹13,999", image: "/marvels-spider-man-miles-morales.jpg", description: description("Spider-Man: Miles Morales"), trailer: "https://www.youtube.com/embed/RHQe-UsmC_0" },
  { slug: "horizon-zero-dawn-remastered", title: "Horizon Zero Dawn Remastered", genre: "Action RPG", price: "₹12,999", oldPrice: "₹13,999", image: "/horizon-zero-dawn-remastered.jpg", description: description("Horizon Zero Dawn Remastered"), trailer: "https://www.youtube.com/embed/kMN-x9goE7M" },
  { slug: "lego-horizon-adventures", title: "LEGO Horizon Adventures", genre: "Adventure", price: "₹12,999", oldPrice: "₹13,999", image: "/lego-horizon-adventures.jpg", description: description("LEGO Horizon Adventures"), trailer: "https://www.youtube.com/embed/1vFsP75mS-Y" },
  { slug: "until-dawn", title: "Until Dawn", genre: "Horror", price: "₹13,999", oldPrice: "₹14,999", image: "/until-dawn.jpg", description: description("Until Dawn"), trailer: "https://www.youtube.com/embed/bIkuM5y0Bjw" },
  { slug: "final-fantasy-vii-rebirth", title: "Final Fantasy VII Rebirth", genre: "Action RPG", price: "₹14,499", oldPrice: "₹14,999", image: "/final-fantasy-vii-rebirth.jpg", description: description("Final Fantasy VII Rebirth"), trailer: "https://www.youtube.com/embed/5ZXqcymx0CI" },
  { slug: "silent-hill-2", title: "Silent Hill 2", genre: "Horror", price: "₹14,499", oldPrice: "₹14,999", image: "/silent-hill-2.jpg", description: description("Silent Hill 2"), trailer: "https://www.youtube.com/embed/OWACgbMeg8Q" },
  { slug: "resident-evil-4-remake", title: "Resident Evil 4", genre: "Horror", price: "₹12,999", oldPrice: "₹13,999", image: "/resident-evil-4-remake.jpg", description: description("Resident Evil 4"), trailer: "https://www.youtube.com/embed/bwxMrAy4z-s" },
];

export const godOfWarHero = "/god-of-war-ragnarok-wide.jpg";

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}
