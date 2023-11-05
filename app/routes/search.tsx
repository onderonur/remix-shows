import type { LoaderArgs } from '@remix-run/node';
import { json , redirect } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { goTry } from 'go-try';
import { useScrollToTopOnRouteChange } from '~/common/common-hooks';
import PageTitle from '~/common/page-title';
import { createErrorResponse } from '~/error-handling/error-handling-utils';
import { searchService } from '~/search/search-service';
import TvShowList from '~/tv-shows/tv-show-list';

const getKeyword = (searchParams: URLSearchParams) => {
  return searchParams.get('keyword')?.trim();
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const keyword = getKeyword(url.searchParams);

  if (!keyword) {
    return redirect('/');
  }

  const [err, tvShows] = await goTry(() =>
    searchService.searchTvShows({
      searchQuery: keyword,
      page: 1,
    }),
  );

  if (err) {
    throw createErrorResponse(err);
  }

  return json({ tvShows });
};

export default function SearchRoute() {
  const { tvShows } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const keyword = getKeyword(searchParams);

  useScrollToTopOnRouteChange();

  return (
    <>
      <PageTitle title={`Search results for '${keyword}'`} />
      <TvShowList tvShows={tvShows} />
    </>
  );
}
