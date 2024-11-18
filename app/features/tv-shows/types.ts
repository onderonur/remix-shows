import type { Id } from '~/core/shared/types';
import type { Genre } from '~/features/genres/types';
import type { ImageMedia, VideoMedia } from '~/features/medias/types';
import type { PaginationResponse } from '~/core/pagination/types';

export type BaseTvShow = {
  id: Id;
  name: string;
  overview: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  poster_path: string;
  backdrop_path: string;
  adult: boolean;
  popularity: number;
};

export type TvShow = BaseTvShow & {
  genres: Genre[];
  networks: Array<{
    id: Id;
    name: string;
    logo_path: string;
    origin_country: string;
  }>;
  images?: { backdrops: ImageMedia[]; posters: ImageMedia[] };
  videos?: { results: VideoMedia[] };
  similar?: PaginationResponse<TvShowListItem>;
};

export type TvShowListItem = BaseTvShow & {
  genre_ids: Id[];
};

export type BaseTvShowEpisode = {
  id: Id;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
  vote_average: number;
  vote_count: number;
  production_code: string;
  season_number: number;
  episode_number: number;
};

export type TvShowSeason = {
  id: Id;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  air_date: string;
  episodes: BaseTvShowEpisode[];
};

export type TvShowEpisode = BaseTvShowEpisode & {
  images: {
    stills: ImageMedia[];
  };
  videos: { results: VideoMedia[] };
};
