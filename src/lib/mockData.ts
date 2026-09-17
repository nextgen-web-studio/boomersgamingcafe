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
    screenshots?: string[];
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817040/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817040/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817040/header.jpg",
      gameplay: "",
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=hfJ4Km46A-0"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/ss_7c59382e67eadf779e0e15c3837ee91158237f11.1920x1080.jpg?t=1776465233",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/ss_05f27139b15c5410d07cd59b7b52adbdf73e13da.1920x1080.jpg?t=1776465233",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/ss_974a7b998c0c14da7fe52a342cf36c98850a57ac.1920x1080.jpg?t=1776465233",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/ss_78350297511e81f287b4bc361935efbc3016f6db.1920x1080.jpg?t=1776465233",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/ss_7cbcd6847cac4d2d42f496954d0df715c6af0b3a.1920x1080.jpg?t=1776465233"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
      gameplay: "",
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=Lq594Xpoa8g"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_7c1ead4b3d952fd0fb92735397945bd8732bba53.1920x1080.jpg?t=1789585745",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_2d05273cef37bcc3651dc9dbea42dbeca5f5f196.1920x1080.jpg?t=1789585745",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_87750b2dbc34d82d1ffef7aaab40a9f46d970d99.1920x1080.jpg?t=1789585745",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_a4a19b86e80488f3d608e835e5ae3086760db866.1920x1080.jpg?t=1789585745",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2420110/ss_16055ecb20ad2879811db3e97375aef43eef0a8c.1920x1080.jpg?t=1789585745"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=WxjeV10H1F0"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/ss_3f1805ecddafacee7f61f87cb8e4624435a83ee3.1920x1080.jpg?t=1750959031",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/ss_89fffc2857dcae29dee2a09f1be33d745610e19d.1920x1080.jpg?t=1750959031",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/ss_8cd55ab975b2e47f4d4d9a0da4ae6948040ef807.1920x1080.jpg?t=1750959031",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/ss_f4829000d3677a9b5b2f234482a7deff12b31ac9.1920x1080.jpg?t=1750959031",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888930/ss_3bed642215856b863799884f6f11671a1ef014d4.1920x1080.jpg?t=1750959031"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=8X2kIfS6fb8"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1784714077",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.1920x1080.jpg?t=1784714077",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.1920x1080.jpg?t=1784714077",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_7924f64b6e5d586a80418c9896a1c92881a7905b.1920x1080.jpg?t=1784714077",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_4eb068b1cf52c91b57157b84bed18a186ed7714b.1920x1080.jpg?t=1784714077"
      ]
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
    heroImage: "https://media.rockstargames.com/rockstargames/img/global/news/upload/actual_1699997977.jpg",
    coverImage: "https://media.rockstargames.com/rockstargames/img/global/news/upload/actual_1699997977.jpg",
    media: {
      trailerBg: "https://media.rockstargames.com/rockstargames/img/global/news/upload/actual_1699997977.jpg",
      gameplay: "",
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
    price: "Rs 14,999",
    rentPrice: "Rs 1499",
    description: "A standalone game directed by Brian Horton and Cameron Christian.",
    heroImage: "/images/wolverine.jpg",
    coverImage: "/images/wolverine.jpg",
    media: {
      trailerBg: "/images/wolverine.jpg",
      gameplay: "",
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
    price: "Rs 14,999",
    rentPrice: "Rs 1499",
    description: "Embark on a new journey with a new Ghost, Atsu, and explore the lands surrounding Mount Yōtei in 1603.",
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=7z7MM6N9g2M"
    },
    features: ["Single Player", "Open World"],
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
      gameplay: "",
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
      gameplay: "",
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/header.jpg",
      gameplay: "",
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2536700/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2536700/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2536700/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=ZUTsoX80FwA"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2536700/ss_b44c7c2999ff38515a118133dd024fb8006a8827.1920x1080.jpg?t=1698651832",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2536700/ss_4e1fe1d8d6e6a4aeec501d021c164decccf2f637.1920x1080.jpg?t=1698651832",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2536700/ss_d6d60879b2713f89dc31962c2fdf04efd7087e4f.1920x1080.jpg?t=1698651832",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2536700/ss_30d415c499d71b65182c966560f170513a2ceb7b.1920x1080.jpg?t=1698651832"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=MUz539AeC5Y"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/ss_51eb1a47a41271abb0aa781de576f704d95b601b.1920x1080.jpg?t=1763409398",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/ss_d60e16422fc1605181e0fedee3e2cfc1e02c750e.1920x1080.jpg?t=1763409398",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/ss_11409331d57966ef193d66ffcded569d02a4e034.1920x1080.jpg?t=1763409398",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/ss_bd593bab36968778b95ed4a1a12ec82d2350d351.1920x1080.jpg?t=1763409398",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2215430/ss_63cc7ea967bf808c73129792d9ae8e3fdb2962bf.1920x1080.jpg?t=1763409398"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=piIgkj7BgIg"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_f64a1140651ff5af30eb63bb6e5b41753d00a98e.1920x1080.jpg?t=1773400635",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_4b6d7d010d1701b2b57bf8ef1b4975a04b3d632f.1920x1080.jpg?t=1773400635",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_bc8812817c074772822c1d1e8a6b016983cf05e8.1920x1080.jpg?t=1773400635",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_d47bde2e349606b3ef1f641e2d8fb7ccf1adba77.1920x1080.jpg?t=1773400635",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_8f0a2b1f6ea6da05c53f802034e08cbe92aaccab.1920x1080.jpg?t=1773400635"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=VDqBQhGJaX0"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/ss_8d958e566d5315463d099b21eae729d0f462caad.1920x1080.jpg?t=1750947718",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/ss_4a1a39d5559909424ed36414070477a96c91e92c.1920x1080.jpg?t=1750947718",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/ss_364f3048399fcb95df5e878c708c94e934cd53d4.1920x1080.jpg?t=1750947718",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/ss_80bbb5ea187cc422012f7a84e694f20f87a26862.1920x1080.jpg?t=1750947718",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1259420/ss_a947f551335679fbffcbe64a3ffcb939429ed533.1920x1080.jpg?t=1750947718"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=Jv4DjVcGNOo"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_3c260834df0c87cfc9ac1b457d0ec0eb3b9f367c.1920x1080.jpg?t=1750956860",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_a91854c29cee0b4975862d174f03ff374ae5e26c.1920x1080.jpg?t=1750956860",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_e15da2a195556b773ba8a982051f55de50d79a75.1920x1080.jpg?t=1750956860",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_ea2f5b9dd34cd18e05970343edfb36ed0dade475.1920x1080.jpg?t=1750956860",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_7ba021e0dd34bdcfff04a6e600323858acdbec4e.1920x1080.jpg?t=1750956860"
      ]
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1895880/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1895880/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1895880/header.jpg",
      gameplay: "",
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
    heroImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/header.jpg",
    coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/header.jpg",
    media: {
      trailerBg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/header.jpg",
      gameplay: "",
      trailerUrl: "https://www.youtube.com/watch?v=4wJzI54oO5E"
    ,
      screenshots: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/e59420593825cddd6c5718561b1ffa44d4086f4d/ss_e59420593825cddd6c5718561b1ffa44d4086f4d.1920x1080.jpg?t=1779309472",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/1bb804eb1e1ac1b23840c977586c8f9c2c0393a8/ss_1bb804eb1e1ac1b23840c977586c8f9c2c0393a8.1920x1080.jpg?t=1779309472",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/074469c3a7070c2a821ae984705276028ebf34c2/ss_074469c3a7070c2a821ae984705276028ebf34c2.1920x1080.jpg?t=1779309472",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/f2571b7c3de0eaffdee86191b70840c958cc1354/ss_f2571b7c3de0eaffdee86191b70840c958cc1354.1920x1080.jpg?t=1779309472",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1659420/2bf8a52b2f2e9915e5042182f7c389d2d1ceff8e/ss_2bf8a52b2f2e9915e5042182f7c389d2d1ceff8e.1920x1080.jpg?t=1779309472"
      ]
    },
    features: ["Single Player"],
    tags: ["deals", "ps5"]
  }
};

