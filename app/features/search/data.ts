import { httpClient } from '~/core/http-client/http-client';
import type { PaginationResponse } from '~/core/pagination/types';
import type { TvShowListItem } from '~/features/tv-shows/types';
import { filterViewableTvShows } from '~/features/tv-shows/utils';

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
