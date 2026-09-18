import astroBot from "@/assets/games/astro-bot.jpg.asset.json";
import deathStranding from "@/assets/games/death-stranding-2-on-the-beach.jpg.asset.json";
import demonsSouls from "@/assets/games/demons-souls.jpg.asset.json";
import finalFantasy from "@/assets/games/final-fantasy-vii-rebirth.jpg.asset.json";
import ghostYotei from "@/assets/games/ghost-of-yotei.jpg.asset.json";
import godOfWarWide from "@/assets/games/god-of-war-ragnarok-wide.jpg.asset.json";
import godOfWar from "@/assets/games/god-of-war-ragnarok.jpg.asset.json";
import granTurismo from "@/assets/games/gran-turismo-7.jpg.asset.json";
import gta from "@/assets/games/grand-theft-auto-vi.jpg.asset.json";
import helldivers from "@/assets/games/helldivers-2.jpg.asset.json";
import horizonForbidden from "@/assets/games/horizon-forbidden-west.jpg.asset.json";
import horizonZero from "@/assets/games/horizon-zero-dawn-remastered.jpg.asset.json";
import legoHorizon from "@/assets/games/lego-horizon-adventures.jpg.asset.json";
import spiderMan from "@/assets/games/marvels-spider-man-2.jpg.asset.json";
import milesMorales from "@/assets/games/marvels-spider-man-miles-morales.jpg.asset.json";
import ratchet from "@/assets/games/ratchet-and-clank-rift-apart.jpg.asset.json";
import residentEvil from "@/assets/games/resident-evil-4-remake.jpg.asset.json";
import returnal from "@/assets/games/returnal.jpg.asset.json";
import ronin from "@/assets/games/rise-of-the-ronin.jpg.asset.json";
import sackboy from "@/assets/games/sackboy-a-big-adventure.jpg.asset.json";
import silentHill from "@/assets/games/silent-hill-2.jpg.asset.json";
import stellarBlade from "@/assets/games/stellar-blade.jpg.asset.json";
import lastOfUsOne from "@/assets/games/the-last-of-us-part-i.jpg.asset.json";
import lastOfUsTwo from "@/assets/games/the-last-of-us-part-ii-remastered.jpg.asset.json";
import uncharted from "@/assets/games/uncharted-legacy-of-thieves-collection.jpg.asset.json";
import untilDawn from "@/assets/games/until-dawn.jpg.asset.json";

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
  { slug: "marvels-spider-man-2", title: "Marvel’s Spider-Man 2", genre: "Action adventure", price: "₹3,999", oldPrice: "₹4,999", image: spiderMan.url, description: description("Marvel’s Spider-Man 2"), trailer: "https://www.youtube.com/embed/9fVYKsEmuRo" },
  { slug: "god-of-war-ragnarok", title: "God of War Ragnarök", genre: "Action adventure", price: "₹3,999", oldPrice: "₹4,999", image: godOfWar.url, description: "Kratos and Atreus journey through the Nine Realms as Ragnarök draws near. Discover detailed environments, fluid performance, and immersive DualSense wireless controller features designed to bring every moment closer.", platform: "PS5 · PS4", trailer: "https://www.youtube.com/embed/uvZZvTRFbTs" },
  { slug: "grand-theft-auto-vi", title: "Grand Theft Auto VI", genre: "Action · Open world", price: "₹5,499", image: gta.url, description: description("Grand Theft Auto VI") },
  { slug: "ghost-of-yotei", title: "Ghost of Yōtei", genre: "Action adventure", price: "₹4,999", image: ghostYotei.url, description: description("Ghost of Yōtei") },
  { slug: "astro-bot", title: "ASTRO BOT", genre: "Platformer", price: "₹3,999", image: astroBot.url, description: description("ASTRO BOT") },
  { slug: "the-last-of-us-part-i", title: "The Last of Us Part I", genre: "Action adventure", price: "₹4,499", oldPrice: "₹4,999", image: lastOfUsOne.url, description: description("The Last of Us Part I") },
  { slug: "horizon-forbidden-west", title: "Horizon Forbidden West", genre: "Action RPG", price: "₹3,499", oldPrice: "₹4,999", image: horizonForbidden.url, description: description("Horizon Forbidden West") },
  { slug: "gran-turismo-7", title: "Gran Turismo 7", genre: "Racing", price: "₹3,999", oldPrice: "₹4,999", image: granTurismo.url, description: description("Gran Turismo 7") },
  { slug: "helldivers-2", title: "Helldivers 2", genre: "Shooter", price: "₹2,999", image: helldivers.url, description: description("Helldivers 2") },
  { slug: "death-stranding-2-on-the-beach", title: "Death Stranding 2", genre: "Action", price: "₹4,999", image: deathStranding.url, description: description("Death Stranding 2") },
  { slug: "stellar-blade", title: "Stellar Blade", genre: "Action", price: "₹4,499", oldPrice: "₹4,999", image: stellarBlade.url, description: description("Stellar Blade") },
  { slug: "rise-of-the-ronin", title: "Rise of the Ronin", genre: "Action RPG", price: "₹3,999", oldPrice: "₹4,999", image: ronin.url, description: description("Rise of the Ronin") },
  { slug: "ratchet-and-clank-rift-apart", title: "Ratchet & Clank: Rift Apart", genre: "Platformer", price: "₹3,499", oldPrice: "₹4,999", image: ratchet.url, description: description("Ratchet & Clank: Rift Apart") },
  { slug: "returnal", title: "Returnal", genre: "Roguelike shooter", price: "₹3,499", oldPrice: "₹4,999", image: returnal.url, description: description("Returnal") },
  { slug: "demons-souls", title: "Demon’s Souls", genre: "Action RPG", price: "₹3,499", oldPrice: "₹4,999", image: demonsSouls.url, description: description("Demon’s Souls") },
  { slug: "sackboy-a-big-adventure", title: "Sackboy: A Big Adventure", genre: "Platformer", price: "₹2,499", oldPrice: "₹3,999", image: sackboy.url, description: description("Sackboy: A Big Adventure") },
  { slug: "uncharted-legacy-of-thieves-collection", title: "UNCHARTED: Legacy of Thieves", genre: "Action adventure", price: "₹2,499", oldPrice: "₹3,499", image: uncharted.url, description: description("UNCHARTED: Legacy of Thieves") },
  { slug: "the-last-of-us-part-ii-remastered", title: "The Last of Us Part II Remastered", genre: "Action adventure", price: "₹2,999", oldPrice: "₹3,999", image: lastOfUsTwo.url, description: description("The Last of Us Part II Remastered") },
  { slug: "marvels-spider-man-miles-morales", title: "Spider-Man: Miles Morales", genre: "Action adventure", price: "₹2,999", oldPrice: "₹3,999", image: milesMorales.url, description: description("Spider-Man: Miles Morales") },
  { slug: "horizon-zero-dawn-remastered", title: "Horizon Zero Dawn Remastered", genre: "Action RPG", price: "₹2,999", oldPrice: "₹3,999", image: horizonZero.url, description: description("Horizon Zero Dawn Remastered") },
  { slug: "lego-horizon-adventures", title: "LEGO Horizon Adventures", genre: "Adventure", price: "₹2,999", oldPrice: "₹3,999", image: legoHorizon.url, description: description("LEGO Horizon Adventures") },
  { slug: "until-dawn", title: "Until Dawn", genre: "Horror", price: "₹3,999", oldPrice: "₹4,999", image: untilDawn.url, description: description("Until Dawn") },
  { slug: "final-fantasy-vii-rebirth", title: "Final Fantasy VII Rebirth", genre: "Action RPG", price: "₹4,499", oldPrice: "₹4,999", image: finalFantasy.url, description: description("Final Fantasy VII Rebirth") },
  { slug: "silent-hill-2", title: "Silent Hill 2", genre: "Horror", price: "₹4,499", oldPrice: "₹4,999", image: silentHill.url, description: description("Silent Hill 2") },
  { slug: "resident-evil-4-remake", title: "Resident Evil 4", genre: "Horror", price: "₹2,999", oldPrice: "₹3,999", image: residentEvil.url, description: description("Resident Evil 4") },
];

export const godOfWarHero = godOfWarWide.url;

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}