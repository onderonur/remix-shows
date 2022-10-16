import type { PaginationResponse } from '~/pagination/PaginationTypes';
import type { TvShowListItem } from '~/tv-shows/TvShowsTypes';
import { filterViewableTvShows } from '~/tv-shows/TvShowsUtils';
import { BaseService } from '../api/BaseService';

type SearchInput = { searchQuery?: string; page?: number };

class SearchService extends BaseService {
  searchTvShows = async ({ searchQuery, page }: SearchInput) => {
    const results = await this.get<PaginationResponse<TvShowListItem>>(
      `/search/tv`,
      {
        query: searchQuery,
        page,
      },
    );
    return filterViewableTvShows(results);
  };
}

export const searchService = new SearchService();
