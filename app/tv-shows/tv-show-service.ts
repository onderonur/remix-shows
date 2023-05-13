import { httpClient } from '~/http-client/http-client';
import type { Id, Maybe } from '~/common/common-types';
import type { PaginationResponse } from '~/pagination/pagination-types';
import type {
  TvShow,
  TvShowEpisode,
  TvShowListItem,
  TvShowSeason,
} from './tv-show-types';
import {
  filterViewableTvShows,
  shouldViewTvShow,
  VIEW_FILTER_LIMIT,
} from './tv-show-utils';
import createHttpError from 'http-errors';

const discover = async (params: {
  page: number;
  sortBy: string;
  genreId: Maybe<Id>;
}) => {
  const tvShows = await httpClient.get<PaginationResponse<TvShowListItem>>(
    `/discover/tv`,
    {
      page: params.page,
      sort_by: params.sortBy,
      with_genres: params.genreId ? [params.genreId].join() : null,
      'vote_count.gte': VIEW_FILTER_LIMIT.minVoteCount,
    },
  );

  return filterViewableTvShows(tvShows);
};

const details = async (
  tvShowId: Id,
  args?: { appendToResponse?: string[] },
) => {
  const tvShow = await httpClient.get<TvShow>(`/tv/${tvShowId}`, {
    append_to_response: args?.appendToResponse?.join(),
  });

  if (!shouldViewTvShow(tvShow)) {
    throw new createHttpError.NotFound('Tv Show not found');
  }

  if (tvShow.similar) {
    tvShow.similar = filterViewableTvShows(tvShow.similar);
  }

  if (tvShow.videos) {
    tvShow.videos.results = tvShow.videos.results.filter(
      (video) => video.site === 'YouTube',
    );
  }

  return tvShow;
};

const seasonDetails = async (tvShowId: Id, seasonNumber: number) => {
  const [tvShow, tvShowSeason] = await Promise.all([
    // To check tvShow is viewable, we fetch it too.
    details(tvShowId),
    httpClient.get<TvShowSeason>(`/tv/${tvShowId}/season/${seasonNumber}`),
  ]);

  // And also returning tvShow to use it in pages.
  return { tvShow, tvShowSeason };
};

const episodeDetails = async (
  tvShowId: Id,
  seasonNumber: number,
  episodeNumber: number,
) => {
  const [tvShow, tvShowEpisode] = await Promise.all([
    // To check tvShow is viewable, we fetch it too.
    details(tvShowId),
    httpClient.get<TvShowEpisode>(
      `/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`,
      { append_to_response: 'images,videos' },
    ),
  ]);

  // And also returning tvShow to use it in pages.
  return { tvShow, tvShowEpisode };
};

export const tvShowsService = {
  discover,
  details,
  seasonDetails,
  episodeDetails,
};
