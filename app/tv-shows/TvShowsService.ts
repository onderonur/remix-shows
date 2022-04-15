import { BaseService } from "~/api/BaseService";
import type { Id, Maybe } from "~/common/CommonTypes";
import type { PaginationResponse } from "~/pagination/PaginationTypes";
import type {
  TvShow,
  TvShowEpisode,
  TvShowListItem,
  TvShowSeason,
} from "./TvShowsTypes";
import {
  filterViewableTvShows,
  shouldViewTvShow,
  VIEW_FILTER_LIMIT,
} from "./TvShowsUtils";

class TvShowsService extends BaseService {
  discover = async (params: {
    page: number;
    sortBy: string;
    genreId: Maybe<Id>;
  }) => {
    const tvShows = await this.get<PaginationResponse<TvShowListItem>>(
      `/discover/tv`,
      {
        page: params.page,
        sort_by: params.sortBy,
        with_genres: params.genreId ? [params.genreId].join() : null,
        "vote_count.gte": VIEW_FILTER_LIMIT.minVoteCount,
      }
    );

    return filterViewableTvShows(tvShows);
  };

  details = async (tvShowId: Id, args?: { appendToResponse?: string[] }) => {
    const tvShow = await this.get<TvShow>(`/tv/${tvShowId}`, {
      append_to_response: args?.appendToResponse?.join(),
    });

    if (!shouldViewTvShow(tvShow)) {
      throw new Error("Not found");
    }

    if (tvShow.similar) {
      tvShow.similar = filterViewableTvShows(tvShow.similar);
    }

    if (tvShow.videos) {
      tvShow.videos.results = tvShow.videos.results.filter(
        (video) => video.site === "YouTube"
      );
    }

    return tvShow;
  };

  seasonDetails = async (tvShowId: Id, seasonNumber: number) => {
    const [tvShow, tvShowSeason] = await Promise.all([
      // To check tvShow is viewable, we fetch it too.
      this.details(tvShowId),
      this.get<TvShowSeason>(`/tv/${tvShowId}/season/${seasonNumber}`),
    ]);

    // And also returning tvShow to use it in pages.
    return { tvShow, tvShowSeason };
  };

  episodeDetails = async (
    tvShowId: Id,
    seasonNumber: number,
    episodeNumber: number
  ) => {
    const [tvShow, tvShowEpisode] = await Promise.all([
      // To check tvShow is viewable, we fetch it too.
      this.details(tvShowId),
      this.get<TvShowEpisode>(
        `/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`,
        { append_to_response: "images,videos" }
      ),
    ]);

    // And also returning tvShow to use it in pages.
    return { tvShow, tvShowEpisode };
  };
}

export const tvShowsService = new TvShowsService();
