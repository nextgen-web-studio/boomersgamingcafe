export interface Game {
  id: string;
  slug: string;
  title: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  genres: string[];
  platforms: string[];
  coverImage: string;
  heroImage: string;
  rating: number;
  originalPrice: number;
  salePrice?: number;
  rentEnabled: boolean;
  rentPrice?: number;
  rentDurationDays?: number;
  isHot?: boolean;
  isNew?: boolean;
}
