import type { PaginationResponse } from '~/pagination/pagination-types';
import type { BaseTvShow, TvShowListItem } from './tv-show-types';

export const VIEW_FILTER_LIMIT = {
  minVoteCount: 500,
  minPopularity: 100,
};

export const shouldViewTvShow = (tvShow: BaseTvShow) => {
  return (
    !tvShow.adult &&
    tvShow.vote_count >= VIEW_FILTER_LIMIT.minVoteCount &&
    tvShow.popularity >= VIEW_FILTER_LIMIT.minPopularity
  );
};

export const filterViewableTvShows = (
  page: PaginationResponse<TvShowListItem>,
): PaginationResponse<TvShowListItem> => {
  const remainingItems = page.results.filter(shouldViewTvShow);
  const removedItemCount = page.results.length - remainingItems.length;
  return {
    ...page,
    results: remainingItems,
    total_results: page.total_results - removedItemCount,
    // If all of the items are removed, we set this page as the last one
    // to stop infinite loaders.
    // This is not the perfect way to do it. But it's just for demo purposes.
    total_pages: !remainingItems.length ? page.page : page.total_pages,
  };
};

export const TV_SHOWS_SORT_BY = {
  popularityDesc: {
    id: 'popularity.desc',
    name: 'Most Popular',
  },
  voteAverageDesc: {
    id: 'vote_average.desc',
    name: 'Top Rated',
  },
  voteCountDesc: {
    id: 'vote_count.desc',
    name: 'Most Voted',
  },
  firstAirDateDesc: {
    id: 'first_air_date.desc',
    name: 'New to Old',
  },
  firstAirDateAsc: {
    id: 'first_air_date.asc',
    name: 'Old to New',
  },
};
