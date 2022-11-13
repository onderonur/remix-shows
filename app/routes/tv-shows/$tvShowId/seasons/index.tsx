import type { LoaderArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from '@remix-run/react';
import { createNumberArray } from '~/common/CommonUtils';
import { getMetaTags } from '~/seo/SeoUtils';
import { Flex, List } from '@chakra-ui/react';
import { getImageUrl } from '~/medias/MediaUtils';
import TvShowEpisodeListItem from '~/tv-shows/TvShowEpisodeListItems';
import Title from '~/common/Title';
import FancyCard from '~/common/FancyCard';
import { tvShowsService } from '~/tv-shows/TvShowsService';
import BaseSelect from '~/common/BaseSelect';
import { useScrollToTopOnRouteChange } from '~/common/CommonHooks';
import PageTitle from '~/common/PageTitle';

const getSelectedSeason = (searchParams: URLSearchParams) => {
  return Number(searchParams.get('season')) || 1;
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const url = new URL(request.url);

  const { tvShow, tvShowSeason } = await tvShowsService.seasonDetails(
    Number(params.tvShowId),
    getSelectedSeason(url.searchParams),
  );

  return json({ tvShow, tvShowSeason });
};

const getPageTitle = ({
  tvShow,
  tvShowSeason,
}: SerializeFrom<typeof loader>) => {
  return `${tvShow.name} - ${tvShowSeason.name}`;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
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
    <Flex flexDirection="column" gap={4}>
      <div>
        <PageTitle
          goBackButtonProps={{ getFallback: () => `/tv-shows/${tvShow.id}` }}
          title={pageTitle}
        />
        <FancyCard
          imageSrc={getImageUrl(tvShowSeason.poster_path)}
          imageAlt={pageTitle}
          imageFlexBasis="36"
          imageRatio={2 / 3}
          backgroundImageSrc={getImageUrl(tvShow.backdrop_path, {
            size: 'original',
          })}
        >
          {tvShowSeason.overview}
        </FancyCard>
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
                {createNumberArray(tvShow.number_of_seasons).map((seasonNo) => {
                  return (
                    <option key={seasonNo} value={seasonNo}>
                      Season {seasonNo}
                    </option>
                  );
                })}
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
  );
}
