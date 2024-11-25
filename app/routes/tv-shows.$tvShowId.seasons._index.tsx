import type {
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from '@remix-run/react';
import { createNumberArray } from '~/core/shared/utils';
import { getMetaTags } from '~/core/seo/utils';
import { Flex, List } from '@chakra-ui/react';
import { getImageUrl } from '~/features/medias/utils';
import TvShowEpisodeListItem from '~/features/tv-shows/components/tv-show-episode-list-item';
import Title from '~/core/ui/components/title';
import HeaderCard from '~/core/ui/components/header-card';
import { tvShowsService } from '~/features/tv-shows/data';
import BaseSelect from '~/core/ui/components/base-select';
import { useScrollToTopOnRouteChange } from '~/core/ui/hooks';
import PageTitle from '~/core/ui/components/page-title';
import HeaderCardContent from '~/core/ui/components/header-card-content';
import HeaderCardImage from '~/core/ui/components/header-card-image';
import HeaderCardBody from '~/core/ui/components/header-card-body';
import TvShowBackground from '~/features/tv-shows/components/tv-show-background';
import { goTry } from 'go-try';
import { createErrorResponse } from '~/core/errors/utils';

const getSelectedSeason = (searchParams: URLSearchParams) => {
  return Number(searchParams.get('season')) || 1;
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const url = new URL(request.url);

  const [err, data] = await goTry(() =>
    tvShowsService.seasonDetails(
      Number(params.tvShowId),
      getSelectedSeason(url.searchParams),
    ),
  );

  if (err) {
    throw createErrorResponse(err);
  }

  return json(data);
};

const getPageTitle = ({
  tvShow,
  tvShowSeason,
}: SerializeFrom<typeof loader>) => {
  return `${tvShow.name} - ${tvShowSeason.name}`;
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return getMetaTags({
      title: 'Not found',
      description: 'Show not found',
    });
  }

  return getMetaTags({
    title: getPageTitle(data),
    description: data.tvShow.overview,
    image: getImageUrl(data.tvShow.poster_path),
  });
};

export default function SeasonsIndexRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const pageTitle = getPageTitle(loaderData);
  const { tvShow, tvShowSeason } = loaderData;
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  useScrollToTopOnRouteChange();

  return (
    <>
      <TvShowBackground src={tvShow.backdrop_path} alt={pageTitle} />
      <Flex flexDirection="column" gap={4}>
        <div>
          <PageTitle
            goBackButtonProps={{ getFallback: () => `/tv-shows/${tvShow.id}` }}
            title={pageTitle}
          />
          <HeaderCard>
            <HeaderCardContent>
              <HeaderCardImage
                src={getImageUrl(tvShowSeason.poster_path)}
                alt={pageTitle}
                aspectRatio="2 / 3"
                flexBasis="36"
              />
              <HeaderCardBody>{tvShowSeason.overview}</HeaderCardBody>
            </HeaderCardContent>
          </HeaderCard>
        </div>

        <section>
          <Title
            title="Episodes"
            titleAs="h2"
            after={
              <Form>
                <BaseSelect
                  name="season"
                  label="Season"
                  value={getSelectedSeason(searchParams)}
                  onChange={(e) =>
                    submit(e.currentTarget.form, { replace: true })
                  }
                >
                  {createNumberArray(tvShow.number_of_seasons).map(
                    (seasonNo) => {
                      return (
                        <option key={seasonNo} value={seasonNo}>
                          Season {seasonNo}
                        </option>
                      );
                    },
                  )}
                </BaseSelect>
              </Form>
            }
          />
          <List display="flex" flexDirection="column" gap={2}>
            {tvShowSeason.episodes.map((episode) => {
              return (
                <Link
                  key={episode.id}
                  to={`/tv-shows/${tvShow.id}/seasons/${episode.season_number}/episodes/${episode.episode_number}`}
                  state={{ canGoBack: true }}
                >
                  <TvShowEpisodeListItem episode={episode} />
                </Link>
              );
            })}
          </List>
        </section>
      </Flex>
    </>
  );
}
