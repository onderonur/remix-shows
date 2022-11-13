import { httpClient } from '~/http-client/httpClient';
import type { PaginationResponse } from '~/pagination/PaginationTypes';
import type { TvShowListItem } from '~/tv-shows/TvShowsTypes';
import { filterViewableTvShows } from '~/tv-shows/TvShowsUtils';

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
