export interface GameDetail {
  title: string;
  slug: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  genre: string;
  platform: string;
  rating: string;
  ageRating: string;
  price: string;
  rentPrice?: string;
  description: string;
  heroImage: string;
  coverImage: string;
  media?: {
    trailerBg: string;
    gameplay: string;
    trailerUrl?: string;
  };
  features: string[];
  tags: string[];
}

export const DEMO_GAMES_DETAIL: Record<string, GameDetail> = {
  // NEW & TOP GAMES
  "spiderman-remastered": {
    title: "Marvel's Spider-Man Remastered",
    slug: "spiderman-remastered",
    developer: "Insomniac Games",
    publisher: "PlayStation PC LLC",
    releaseDate: "2022-08-12",
    genre: "Action / Adventure",
    platform: "PS5",
    rating: "4.8",
    ageRating: "Teen",
    price: "₹3,999",
    rentPrice: "₹399",
    description: "In Marvel's Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original action-packed story.",
    heroImage: "https://img.youtube.com/vi/q4IrtAX5pRw/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/q4IrtAX5pRw/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/q4IrtAX5pRw/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/q4IrtAX5pRw/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=q4IrtAX5pRw"
    },
    features: ["Single Player", "DualSense Support", "Ray Tracing", "Fast Loading"],
    tags: ["top", "ps5"]
  },
  "god-of-war-ragnarok": {
    title: "God of War Ragnarök",
    slug: "god-of-war-ragnarok",
    developer: "Santa Monica Studio",
    publisher: "PlayStation Publishing LLC",
    releaseDate: "2022-11-09",
    genre: "Action / Adventure",
    platform: "PS5 • PS4",
    rating: "4.9",
    ageRating: "Mature 17+",
    price: "₹3,999",
    rentPrice: "₹399",
    description: "Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives.",
    heroImage: "https://img.youtube.com/vi/hfJ4Km46A-0/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/hfJ4Km46A-0/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/hfJ4Km46A-0/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/hfJ4Km46A-0/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=hfJ4Km46A-0"
    },
    features: ["Offline play enabled", "1 player", "Remote Play supported"],
    tags: ["top", "ps5", "ps4"]
  },
  "elden-ring": {
    title: "Elden Ring",
    slug: "elden-ring",
    developer: "FromSoftware",
    publisher: "Bandai Namco",
    releaseDate: "2022-02-25",
    genre: "Action / RPG",
    platform: "PS5 • PS4",
    rating: "4.9",
    ageRating: "Mature 17+",
    price: "₹3,999",
    rentPrice: "₹399",
    description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.",
    heroImage: "https://img.youtube.com/vi/E3Huy2cdih0/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/E3Huy2cdih0/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/E3Huy2cdih0/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/E3Huy2cdih0/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=E3Huy2cdih0"
    },
    features: ["Single Player", "Online Multiplayer"],
    tags: ["top", "ps5", "ps4"]
  },
  "horizon-forbidden-west": {
    title: "Horizon Forbidden West",
    slug: "horizon-forbidden-west",
    developer: "Guerrilla Games",
    publisher: "PlayStation Publishing",
    releaseDate: "2022-02-18",
    genre: "Action / RPG",
    platform: "PS5 • PS4",
    rating: "4.8",
    ageRating: "Teen",
    price: "₹2,999",
    rentPrice: "₹299",
    description: "Join Aloy as she braves the Forbidden West - a majestic but dangerous frontier.",
    heroImage: "https://img.youtube.com/vi/Lq594Xpoa8g/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/Lq594Xpoa8g/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/Lq594Xpoa8g/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/Lq594Xpoa8g/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=Lq594Xpoa8g"
    },
    features: ["Single Player", "4K HDR", "3D Audio"],
    tags: ["deals", "ps5", "ps4"]
  },
  "the-last-of-us-part-1": {
    title: "The Last of Us Part I",
    slug: "the-last-of-us-part-1",
    developer: "Naughty Dog",
    publisher: "PlayStation Studios",
    releaseDate: "2022-09-02",
    genre: "Action / Survival",
    platform: "PS5",
    rating: "4.8",
    ageRating: "Mature 17+",
    price: "₹4,999",
    rentPrice: "₹499",
    description: "Experience the emotional storytelling and unforgettable characters in The Last of Us, winner of over 200 Game of the Year awards.",
    heroImage: "https://img.youtube.com/vi/WxjeV10H1F0/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/WxjeV10H1F0/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/WxjeV10H1F0/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/WxjeV10H1F0/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=WxjeV10H1F0"
    },
    features: ["Single Player", "3D Audio", "DualSense Support"],
    tags: ["top", "ps5"]
  },
  "cyberpunk-2077": {
    title: "Cyberpunk 2077",
    slug: "cyberpunk-2077",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    releaseDate: "2020-12-10",
    genre: "Action / RPG",
    platform: "PS5 • PS4",
    rating: "4.6",
    ageRating: "Mature 17+",
    price: "₹2,999",
    rentPrice: "₹499",
    description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City.",
    heroImage: "https://img.youtube.com/vi/8X2kIfS6fb8/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/8X2kIfS6fb8/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/8X2kIfS6fb8/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/8X2kIfS6fb8/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=8X2kIfS6fb8"
    },
    features: ["Single Player", "Ray Tracing"],
    tags: ["deals", "ps5"]
  },
  // UPCOMING GAMES (Using Ghost of Tsushima image as placeholder)
  "gta-6": {
    title: "Grand Theft Auto VI",
    slug: "gta-6",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "Coming 2025",
    genre: "Action / Open World",
    platform: "PS5",
    rating: "TBD",
    ageRating: "Mature 17+",
    price: "₹5,499",
    rentPrice: "₹599",
    description: "Welcome to Leonida, the home of the neon-soaked streets of Vice City and beyond.",
    heroImage: "https://img.youtube.com/vi/QdBZY2fkU-0/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/QdBZY2fkU-0/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/QdBZY2fkU-0/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/QdBZY2fkU-0/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=QdBZY2fkU-0"
    },
    features: ["Single Player", "Online Multiplayer"],
    tags: ["upcoming", "ps5"]
  },
  "wolverine": {
    title: "Marvel's Wolverine",
    slug: "wolverine",
    developer: "Insomniac Games",
    publisher: "PlayStation Studios",
    releaseDate: "Coming Soon",
    genre: "Action / Adventure",
    platform: "PS5",
    rating: "TBD",
    ageRating: "Mature 17+",
    price: "₹4,999",
    rentPrice: "₹499",
    description: "A standalone game directed by Brian Horton and Cameron Christian.",
    heroImage: "https://img.youtube.com/vi/ZdlM-02L8t4/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/ZdlM-02L8t4/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/ZdlM-02L8t4/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/ZdlM-02L8t4/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=ZdlM-02L8t4"
    },
    features: ["Single Player", "DualSense Support"],
    tags: ["upcoming", "ps5"]
  },
  "ghost-of-yotei": {
    title: "Ghost of Yōtei",
    slug: "ghost-of-yotei",
    developer: "Sucker Punch Productions",
    publisher: "PlayStation Studios",
    releaseDate: "Coming 2025",
    genre: "Action / Adventure",
    platform: "PS5",
    rating: "TBD",
    ageRating: "Mature 17+",
    price: "₹4,999",
    rentPrice: "₹499",
    description: "Embark on a new journey with a new Ghost, Atsu, and explore the lands surrounding Mount Yōtei in 1603.",
    heroImage: "https://img.youtube.com/vi/7z7MM6N9g2M/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/7z7MM6N9g2M/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/7z7MM6N9g2M/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/7z7MM6N9g2M/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=7z7MM6N9g2M"
    },
    features: ["Single Player"],
    tags: ["upcoming", "ps5"]
  },
  "rdr-2": {
    title: "Red Dead Redemption 2",
    slug: "rdr-2",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2018-10-26",
    genre: "Action / Adventure",
    platform: "PS4",
    rating: "4.9",
    ageRating: "Mature 17+",
    price: "₹3,999",
    rentPrice: "₹399",
    description: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan.",
    heroImage: "https://img.youtube.com/vi/eaW0tYpxyp0/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/eaW0tYpxyp0/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/eaW0tYpxyp0/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/eaW0tYpxyp0/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=eaW0tYpxyp0"
    },
    features: ["Single Player", "Online Multiplayer"],
    tags: ["top", "ps4"]
  },
  "gta-5": {
    title: "Grand Theft Auto V",
    slug: "gta-5",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2022-03-15",
    genre: "Action / Open World",
    platform: "PS5 • PS4",
    rating: "4.8",
    ageRating: "Mature 17+",
    price: "₹2,799",
    rentPrice: "₹299",
    description: "Experience entertainment blockbusters Grand Theft Auto V and GTA Online.",
    heroImage: "https://img.youtube.com/vi/QkkoHAzjnUs/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/QkkoHAzjnUs/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/QkkoHAzjnUs/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/QkkoHAzjnUs/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=QkkoHAzjnUs"
    },
    features: ["Single Player", "Online Multiplayer"],
    tags: ["top", "ps5", "ps4"]
  },
  "ea-fc-24": {
    title: "EA SPORTS FC™ 24",
    slug: "ea-fc-24",
    developer: "EA Vancouver",
    publisher: "Electronic Arts",
    releaseDate: "2023-09-29",
    genre: "Sports",
    platform: "PS5 • PS4",
    rating: "4.5",
    ageRating: "Everyone",
    price: "₹4,499",
    rentPrice: "₹449",
    description: "EA SPORTS FC™ 24 is a new era for The World's Game: 19,000+ fully licensed players, 700+ teams, and 30+ leagues.",
    heroImage: "https://img.youtube.com/vi/XhP3Xh4LMA8/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/XhP3Xh4LMA8/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/XhP3Xh4LMA8/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/XhP3Xh4LMA8/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=XhP3Xh4LMA8"
    },
    features: ["Single Player", "Local Multiplayer", "Online Multiplayer"],
    tags: ["top", "ps5", "ps4"]
  },
  "helldivers-2": {
    title: "Helldivers 2",
    slug: "helldivers-2",
    developer: "Arrowhead Game Studios",
    publisher: "PlayStation PC LLC",
    releaseDate: "2024-02-08",
    genre: "Action / Co-op",
    platform: "PS5 • PS4",
    rating: "4.8",
    ageRating: "Mature 17+",
    price: "₹3,499",
    rentPrice: "₹349",
    description: "Enlist in the Helldivers and join the fight for freedom across a hostile galaxy.",
    heroImage: "https://img.youtube.com/vi/ZUTsoX80FwA/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/ZUTsoX80FwA/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/ZUTsoX80FwA/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/ZUTsoX80FwA/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=ZUTsoX80FwA"
    },
    features: ["Online Co-op", "Multiplayer"],
    tags: ["top", "ps5"]
  },
  "ghost-of-tsushima": {
    title: "Ghost of Tsushima Director's Cut",
    slug: "ghost-of-tsushima",
    developer: "Sucker Punch Productions",
    publisher: "PlayStation PC LLC",
    releaseDate: "2024-05-16",
    genre: "Action / Adventure",
    platform: "PS5 • PS4",
    rating: "4.9",
    ageRating: "Mature 17+",
    price: "₹3,999",
    rentPrice: "₹399",
    description: "In the late 13th century, the Mongol empire has laid waste to entire nations.",
    heroImage: "https://img.youtube.com/vi/MUz539AeC5Y/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/MUz539AeC5Y/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/MUz539AeC5Y/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/MUz539AeC5Y/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=MUz539AeC5Y"
    },
    features: ["Single Player", "Co-op"],
    tags: ["top", "ps5", "ps4"]
  },
  "death-stranding": {
    title: "Death Stranding Director's Cut",
    slug: "death-stranding",
    developer: "KOJIMA PRODUCTIONS",
    publisher: "505 Games",
    releaseDate: "2022-03-30",
    genre: "Action / Adventure",
    platform: "PS5",
    rating: "4.6",
    ageRating: "Mature 17+",
    price: "₹2,999",
    rentPrice: "₹299",
    description: "From legendary game creator Hideo Kojima comes a genre-defying experience.",
    heroImage: "https://img.youtube.com/vi/piIgkj7BgIg/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/piIgkj7BgIg/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/piIgkj7BgIg/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/piIgkj7BgIg/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=piIgkj7BgIg"
    },
    features: ["Single Player"],
    tags: ["deals", "ps5"]
  },
  "days-gone": {
    title: "Days Gone",
    slug: "days-gone",
    developer: "Bend Studio",
    publisher: "PlayStation PC LLC",
    releaseDate: "2021-05-18",
    genre: "Action / Survival",
    platform: "PS4",
    rating: "4.5",
    ageRating: "Mature 17+",
    price: "₹2,499",
    rentPrice: "₹249",
    description: "Ride and fight into a deadly, post pandemic America.",
    heroImage: "https://img.youtube.com/vi/VDqBQhGJaX0/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/VDqBQhGJaX0/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/VDqBQhGJaX0/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/VDqBQhGJaX0/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=VDqBQhGJaX0"
    },
    features: ["Single Player"],
    tags: ["deals", "ps4"]
  },
  "returnal": {
    title: "Returnal",
    slug: "returnal",
    developer: "Housemarque",
    publisher: "PlayStation Publishing",
    releaseDate: "2021-04-30",
    genre: "Action / Rogue-like",
    platform: "PS5",
    rating: "4.5",
    ageRating: "Teen",
    price: "₹3,999",
    rentPrice: "₹399",
    description: "Break the cycle as Selene fights for survival in a shapeshifting alien world.",
    heroImage: "https://img.youtube.com/vi/Jv4DjVcGNOo/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/Jv4DjVcGNOo/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/Jv4DjVcGNOo/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/Jv4DjVcGNOo/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=Jv4DjVcGNOo"
    },
    features: ["Single Player", "Co-op"],
    tags: ["top", "ps5"]
  },
  "ratchet-clank": {
    title: "Ratchet & Clank: Rift Apart",
    slug: "ratchet-clank",
    developer: "Insomniac Games",
    publisher: "PlayStation Publishing",
    releaseDate: "2021-06-11",
    genre: "Platformer",
    platform: "PS5",
    rating: "4.8",
    ageRating: "Everyone 10+",
    price: "₹3,999",
    rentPrice: "₹399",
    description: "Blast your way through an interdimensional adventure with Ratchet and Clank.",
    heroImage: "https://img.youtube.com/vi/9p_gg9UW9k4/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/9p_gg9UW9k4/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/9p_gg9UW9k4/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/9p_gg9UW9k4/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=9p_gg9UW9k4"
    },
    features: ["Single Player"],
    tags: ["top", "ps5"]
  },
  "uncharted": {
    title: "Uncharted: Legacy of Thieves",
    slug: "uncharted",
    developer: "Naughty Dog",
    publisher: "PlayStation Publishing",
    releaseDate: "2022-01-28",
    genre: "Action / Adventure",
    platform: "PS5",
    rating: "4.7",
    ageRating: "Teen",
    price: "₹2,999",
    rentPrice: "₹299",
    description: "Seek your legacy and leave your mark on the map in UNCHARTED: Legacy of Thieves Collection.",
    heroImage: "https://img.youtube.com/vi/4wJzI54oO5E/hqdefault.jpg",
    coverImage: "https://img.youtube.com/vi/4wJzI54oO5E/hqdefault.jpg",
    media: {
      trailerBg: "https://img.youtube.com/vi/4wJzI54oO5E/hqdefault.jpg",
      gameplay: "https://img.youtube.com/vi/4wJzI54oO5E/hqdefault.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=4wJzI54oO5E"
    },
    features: ["Single Player"],
    tags: ["deals", "ps5"]
  }
};

