import { Input } from "@chakra-ui/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import type { Maybe } from "~/common/CommonTypes";
import SectionTitle from "~/common/SectionTitle";
import { useGenres } from "~/genres/GenresContext";
import InfiniteScrollSentry from "~/infinite-scroll/InfiniteScrollSentry";
import type { PaginationResponse } from "~/pagination/PaginationTypes";
import {
  checkHasNextPage,
  getAllPageResults,
  getNextPage,
} from "~/pagination/PaginationUtils";
import type { RootLoaderData } from "~/root";
import { getMetaTags } from "~/seo/SeoUtils";
import TvShowList from "~/tv-shows/TvShowList";
import { tvShowsService } from "~/tv-shows/TvShowsService";
import type { TvShowListItem } from "~/tv-shows/TvShowsTypes";
import { TV_SHOWS_SORT_BY } from "~/tv-shows/TvShowsUtils";
import BaseSelect from "~/common/BaseSelect";
import { useHasChanged } from "~/common/CommonHooks";
import { useMemo, useState } from "react";

type LoaderData = {
  genreId: Maybe<number>;
  tvShows: PaginationResponse<TvShowListItem>;
};

const getGenreId = (searchParams: URLSearchParams) => {
  const genreId = searchParams.get("genreId");
  return genreId ? Number(genreId) : null;
};

const getPage = (searchParams: URLSearchParams) =>
  Number(searchParams.get("page")) || 1;

const getSortBy = (searchParams: URLSearchParams) => {
  const defaultSortBy = TV_SHOWS_SORT_BY.popularityDesc;
  const sortById = searchParams.get("sortBy");

  if (!sortById) {
    return defaultSortBy;
  }

  return (
    Object.values(TV_SHOWS_SORT_BY).find((sortBy) => sortBy.id === sortById) ??
    defaultSortBy
  );
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const url = new URL(request.url);

  const tvShows = await tvShowsService.discover({
    page: getPage(url.searchParams),
    genreId: getGenreId(url.searchParams),
    sortBy: getSortBy(url.searchParams).id,
  });

  return {
    // We are using `genreId` in MetaFunction
    genreId: getGenreId(url.searchParams),
    tvShows,
  };
};

export const meta: MetaFunction = ({ parentsData, data }) => {
  const { genreId } = data as LoaderData;
  const { genres } = parentsData.root as RootLoaderData;
  const genre = genres.find((genre) => genre.id === genreId);
  if (!genre) {
    return getMetaTags();
  }
  return getMetaTags({ title: genre.name });
};

export default function IndexRoute() {
  const { tvShows: firstPage } = useLoaderData<LoaderData>();
  const [pages, setPages] = useState([firstPage]);
  if (useHasChanged(firstPage)) {
    setPages([firstPage]);
  }

  const fetcher = useFetcher<LoaderData>();
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
      <SectionTitle
        title="TV Shows"
        titleAs="h1"
        subtitle={genre?.name}
        extra={
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
        loading={fetcher.state === "loading"}
        onLoadMore={() => {
          const nextPage = getNextPage(tvShows);
          if (!nextPage) {
            return;
          }

          searchParams.set("page", nextPage.toString());

          // https://remix.run/docs/en/v1/guides/routing#what-is-the-index-query-param
          searchParams.set("index", "");

          fetcher.load(`/?${searchParams.toString()}`);
        }}
      />
    </>
  );
}
