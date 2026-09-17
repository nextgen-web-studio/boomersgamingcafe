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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/marvels-spider-man-remastered-hero-banner-desktop-01-en-17nov21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/b0OiumSTCnuFhTzB3x0BqRkE.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/marvels-spider-man-remastered-screenshot-01-en-17nov21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/marvels-spider-man-remastered-screenshot-04-en-17nov21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-ragnarok-hero-banner-desktop-01-en-07sep21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XoIG0yEQyJCgZIeb1H38.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-ragnarok-screenshot-01-en-07sep21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-ragnarok-screenshot-05-en-07sep21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/elden-ring-hero-banner-desktop-01-en-19feb22?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooZA2NI6Yx.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/elden-ring-screenshot-01-en-19feb22?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/elden-ring-screenshot-02-en-19feb22?$1600px$"
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
    genre: "Action / Adventure",
    platform: "PS5 • PS4",
    rating: "4.7",
    ageRating: "Teen",
    price: "₹2,999",
    rentPrice: "₹299",
    description: "Join Aloy as she braves the Forbidden West - a majestic but dangerous frontier.",
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/horizon-forbidden-west-hero-banner-desktop-01-en-29aug21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/HOiWzArazUJW0AHBCWNKNBoE.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/horizon-forbidden-west-screenshot-01-en-29aug21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/horizon-forbidden-west-screenshot-02-en-29aug21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-hero-banner-desktop-01-en-18may22?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyVA1m4kyzZWmfcKvjmPA.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-screenshot-01-en-18may22?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-screenshot-03-en-18may22?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/cyberpunk-2077-phantom-liberty-hero-banner-desktop-01-en-07jun23?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/28e35198ba15eb90cc856cbf2089baec9e62e157e8ce71dc.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/cyberpunk-2077-phantom-liberty-screenshot-01-en-07jun23?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/cyberpunk-2077-phantom-liberty-screenshot-02-en-07jun23?$1600px$"
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
    heroImage: "https://media.rockstargames.com/rockstargames-newsite/uploads/22bf689e414c7764f2ce9052bda403061da1dc5c.jpg",
    coverImage: "https://media.rockstargames.com/rockstargames-newsite/uploads/6bcde6d50ffb13e11f1ec7cf8f4da066b1d40a02.jpg",
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/marvels-wolverine-hero-banner-desktop-01-en-07sep21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202109/0821/xsm6iZ6r3rIffE6k1DqCizR6.png",
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-yotei-hero-desktop-01-en-24sep24?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202409/2311/f7734bbd8e0e0f80bcce08cb0a5dc4e1ec055fc5eaf2fb4e.png",
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
    heroImage: "https://image.api.playstation.com/vulcan/ap/rnd/202005/2215/xK0K4dG4mGfE0j3O4d3V1m4V.jpg",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202005/2215/xK0K4dG4mGfE0j3O4d3V1m4V.jpg",
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
    heroImage: "https://image.api.playstation.com/vulcan/ap/rnd/202202/2816/mYnnPiXtgOVkXFDE7Fw2pD5y.png",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202202/2816/mYnnPiXtgOVkXFDE7Fw2pD5y.png",
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
    heroImage: "https://image.api.playstation.com/vulcan/ap/rnd/202307/1715/05c84d7d0a27cbbe48c1e22da2b7a9de56417435f3d537f0.png",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202307/1715/05c84d7d0a27cbbe48c1e22da2b7a9de56417435f3d537f0.png",
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/helldivers-2-hero-banner-desktop-01-en-24may23?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202310/1816/8c9cd24036e4f3a73c1d9361a9bc3f0b2f5188f5727b13a8.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/helldivers-2-screenshot-01-en-24may23?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/helldivers-2-screenshot-02-en-24may23?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-tsushima-directors-cut-hero-banner-desktop-01-en-23jun21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202106/2322/Qd1v4uAW0k9rR0UoN5Bv49tE.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-tsushima-directors-cut-screenshot-01-en-23jun21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-tsushima-directors-cut-screenshot-02-en-23jun21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/death-stranding-directors-cut-hero-banner-desktop-01-en-07jul21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202106/2215/kSjL5l2u6NlH5mX2Y0R7H7Y9.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/death-stranding-directors-cut-screenshot-01-en-07jul21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/death-stranding-directors-cut-screenshot-02-en-07jul21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/days-gone-hero-banner-desktop-01-en-14jan21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LuzJWyl6rG2rF3Tz1cIeL12m.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/days-gone-screenshot-01-en-14jan21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/days-gone-screenshot-02-en-14jan21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/returnal-hero-banner-desktop-01-en-14jan21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202011/1717/hZc5XjZJjFmUo6O6aYwO2m8W.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/returnal-screenshot-01-en-14jan21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/returnal-screenshot-02-en-14jan21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/ratchet-and-clank-rift-apart-hero-banner-desktop-01-en-11feb21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/D0C5H9eJ0gU1fXb6sX9x6T8T.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/ratchet-and-clank-rift-apart-screenshot-01-en-11feb21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/ratchet-and-clank-rift-apart-screenshot-02-en-11feb21?$1600px$"
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
    heroImage: "https://gmedia.playstation.com/is/image/SIEPDC/uncharted-legacy-of-thieves-collection-hero-banner-desktop-01-en-08sep21?$1600px$",
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202109/0821/kYJdJtZ6y7Q1E9M6l5W9U9V0.png",
    media: {
      trailerBg: "https://gmedia.playstation.com/is/image/SIEPDC/uncharted-legacy-of-thieves-collection-screenshot-01-en-08sep21?$1600px$",
      gameplay: "https://gmedia.playstation.com/is/image/SIEPDC/uncharted-legacy-of-thieves-collection-screenshot-02-en-08sep21?$1600px$"
    },
    features: ["Single Player"],
    tags: ["deals", "ps5"]
  }
};
