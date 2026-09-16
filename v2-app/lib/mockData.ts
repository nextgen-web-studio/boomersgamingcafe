import { Game } from '../types';

export const mockGames: Game[] = [
  {
    id: '1', slug: 'cyber-revolution', title: 'Cyber Revolution',
    developer: 'Neon Studios', publisher: 'NextGen Interactive', releaseDate: '2026-09-10',
    genres: ['Action', 'RPG'], platforms: ['PS5'],
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2000&auto=format&fit=crop',
    rating: 4.8, originalPrice: 3999, rentEnabled: true, rentPrice: 499, rentDurationDays: 7, isNew: true, isHot: true
  },
  {
    id: '2', slug: 'fantasy-realm-x', title: 'Fantasy Realm X',
    developer: 'Dragonforge', publisher: 'NextGen Interactive', releaseDate: '2026-05-12',
    genres: ['RPG', 'Adventure'], platforms: ['PS5', 'PS4'],
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',
    rating: 4.5, originalPrice: 2999, salePrice: 1999, rentEnabled: false
  },
  {
    id: '3', slug: 'speed-demons-2027', title: 'Speed Demons 2027',
    developer: 'Velocity', publisher: 'Velocity', releaseDate: '2026-08-01',
    genres: ['Racing', 'Simulation'], platforms: ['PS5'],
    coverImage: 'https://images.unsplash.com/photo-1511956558485-6126b803fb24?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=2000&auto=format&fit=crop',
    rating: 4.2, originalPrice: 4499, rentEnabled: true, rentPrice: 599, rentDurationDays: 3, isHot: true
  },
  {
    id: '4', slug: 'space-marines-vr', title: 'Space Marines',
    developer: 'Starlight', publisher: 'NextGen', releaseDate: '2025-11-20',
    genres: ['Shooter', 'Action'], platforms: ['PS4'],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2000&auto=format&fit=crop',
    rating: 4.0, originalPrice: 1499, rentEnabled: true, rentPrice: 199, rentDurationDays: 7
  }
];
