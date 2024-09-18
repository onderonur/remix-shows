import { Input } from '@chakra-ui/react';
import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  useFetcher,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from '@remix-run/react';
import { useGenres } from '~/features/genres/components/genres-context';
import InfiniteScrollSentry from '~/core/ui/components/infinite-scroll-sentry';
import {
  checkHasNextPage,
  getAllPageResults,
  getNextPage,
} from '~/core/pagination/pagination.utils';
import type { loader as rootLoader } from '~/root';
import { getMetaTags } from '~/core/seo/seo.utils';
import TvShowList from '~/features/tv-shows/components/tv-show-list';
import { tvShowsService } from '~/features/tv-shows/tv-shows.service';
import { TV_SHOWS_SORT_BY } from '~/features/tv-shows/tv-shows.utils';
import BaseSelect from '~/core/ui/components/base-select';
import { useHasChanged } from '~/core/ui/ui.hooks';
import { useMemo, useState } from 'react';
import PageTitle from '~/core/ui/components/page-title';
import { createErrorResponse } from '~/core/errors/errors.utils';
import { goTry } from 'go-try';

const getGenreId = (searchParams: URLSearchParams) => {
  const genreId = searchParams.get('genreId');
  return genreId ? Number(genreId) : null;
};

const getPage = (searchParams: URLSearchParams) =>
  Number(searchParams.get('page')) || 1;

const getSortBy = (searchParams: URLSearchParams) => {
  const defaultSortBy = TV_SHOWS_SORT_BY.popularityDesc;
  const sortById = searchParams.get('sortBy');

  if (!sortById) {
    return defaultSortBy;
  }

  return (
    Object.values(TV_SHOWS_SORT_BY).find((sortBy) => sortBy.id === sortById) ??
    defaultSortBy
  );
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);

  const [err, tvShows] = await goTry(() =>
    tvShowsService.discover({
      page: getPage(url.searchParams),
      genreId: getGenreId(url.searchParams),
      sortBy: getSortBy(url.searchParams).id,
    }),
  );

  if (err) {
    throw createErrorResponse(err);
  }

  return json({
    // We are using `genreId` in MetaFunction
    genreId: getGenreId(url.searchParams),
    tvShows,
  });
};

export const meta: V2_MetaFunction<
  typeof loader,
  { root: typeof rootLoader }
> = ({ data, matches }) => {
  const genreId = data?.genreId;
  const rootData = matches.find((match) => match.id === 'root')?.data;
  const genres = rootData?.genres ?? [];
  const genre = genres.find((genre) => genre.id === genreId);
  if (!genre) {
    return getMetaTags();
  }
  return getMetaTags({ title: genre.name });
};

export default function IndexRoute() {
  const { tvShows: firstPage } = useLoaderData<typeof loader>();
  const [pages, setPages] = useState([firstPage]);
  if (useHasChanged(firstPage)) {
    setPages([firstPage]);
  }

  const fetcher = useFetcher<typeof loader>();
  const fetcherTvShows = fetcher.data?.tvShows;
  if (useHasChanged(fetcherTvShows) && fetcherTvShows) {
    setPages((current) => [...current, fetcherTvShows]);
  }

  const tvShows = useMemo(() => {
    const lastPage = pages[pages.length - 1];
    return { ...lastPage, results: getAllPageResults(pages) };
  }, [pages]);

  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  const genres = useGenres();
  const genreId = getGenreId(searchParams);
  const genre = genres.find((genre) => genre.id === genreId);
  const sortBy = getSortBy(searchParams).id;

  return (
    <>
      <PageTitle
        title="TV Shows"
        subtitle={genre?.name}
        after={
          <Form>
            <BaseSelect
              name="sortBy"
              label="Sort By"
              value={sortBy}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            >
              {Object.values(TV_SHOWS_SORT_BY).map((sortingOption) => {
                return (
                  <option key={sortingOption.id} value={sortingOption.id}>
                    {sortingOption.name}
                  </option>
                );
              })}
            </BaseSelect>
            {!!genreId && (
              <Input name="genreId" value={genreId} readOnly hidden />
            )}
          </Form>
        }
      />
      <TvShowList tvShows={tvShows} />
      <InfiniteScrollSentry
        hasNextPage={checkHasNextPage(tvShows)}
        loading={fetcher.state === 'loading'}
        onLoadMore={() => {
          const nextPage = getNextPage(tvShows);
          if (!nextPage) {
            return;
          }

          searchParams.set('page', nextPage.toString());

          // https://remix.run/docs/en/v1/guides/routing#what-is-the-index-query-param
          searchParams.set('index', '');

          fetcher.load(`/?${searchParams.toString()}`);
        }}
      />
    </>
  );
}
