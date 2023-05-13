import { httpClient } from '~/http-client/http-client';
import type { PaginationResponse } from '~/pagination/pagination-types';
import type { TvShowListItem } from '~/tv-shows/tv-show-types';
import { filterViewableTvShows } from '~/tv-shows/tv-show-utils';

type SearchInput = { searchQuery?: string; page?: number };

const searchTvShows = async ({ searchQuery, page }: SearchInput) => {
  const results = await httpClient.get<PaginationResponse<TvShowListItem>>(
    `/search/tv`,
    {
      query: searchQuery,
      page,
    },
  );
  return filterViewableTvShows(results);
};

export const searchService = {
  searchTvShows,
};
