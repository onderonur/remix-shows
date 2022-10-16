import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useScrollToTopOnRouteChange } from '~/common/CommonHooks';
import SectionTitle from '~/common/SectionTitle';
import type { PaginationResponse } from '~/pagination/PaginationTypes';
import { searchService } from '~/search/SearchService';
import TvShowList from '~/tv-shows/TvShowList';
import type { TvShowListItem } from '~/tv-shows/TvShowsTypes';

const getKeyword = (searchParams: URLSearchParams) => {
  return searchParams.get('keyword')?.trim();
};

type LoaderData = {
  tvShows: PaginationResponse<TvShowListItem>;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | ReturnType<typeof redirect>> => {
  const url = new URL(request.url);
  const keyword = getKeyword(url.searchParams);

  if (!keyword) {
    return redirect('/');
  }

  const tvShows = await searchService.searchTvShows({
    searchQuery: keyword,
    page: 1,
  });

  return { tvShows };
};

export default function SearchRoute() {
  const { tvShows } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const keyword = getKeyword(searchParams);

  useScrollToTopOnRouteChange();

  return (
    <>
      <SectionTitle title={`Search results for '${keyword}'`} />
      <TvShowList tvShows={tvShows} />
    </>
  );
}
