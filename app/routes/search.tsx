import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useScrollToTopOnRouteChange } from '~/common/CommonHooks';
import SectionTitle from '~/common/SectionTitle';
import { searchService } from '~/search/SearchService';
import TvShowList from '~/tv-shows/TvShowList';

const getKeyword = (searchParams: URLSearchParams) => {
  return searchParams.get('keyword')?.trim();
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const keyword = getKeyword(url.searchParams);

  if (!keyword) {
    return redirect('/');
  }

  const tvShows = await searchService.searchTvShows({
    searchQuery: keyword,
    page: 1,
  });

  return json({ tvShows });
};

export default function SearchRoute() {
  const { tvShows } = useLoaderData<typeof loader>();
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
