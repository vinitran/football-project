import { Genre } from './genre';
import { Season } from './season';

export interface Video {
  id: number;
  name: string;
  original_name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  genre_ids: number[];
  first_air_date: string;
  origin_country: string[];
  original_language: string;
  vote_count: number;
  vote_average: number;
  popularity: number;
  success?: boolean;
}

export interface VideoDetail extends Video {
  homepage: string | null;
  production_companies: ProductionCompany[];
  status: string;
  tagline: string | null;
  genres: Genre[];
  seasons: Season[];
}
