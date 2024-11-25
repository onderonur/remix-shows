import type {
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getImageUrl } from '~/features/medias/utils';
import { getMetaTags } from '~/core/seo/utils';
import { Box, Flex } from '@chakra-ui/react';
import VoteRating from '~/core/ui/components/vote-rating';
import Title from '~/core/ui/components/title';
import { tvShowsService } from '~/features/tv-shows/data';
import HeaderCard from '~/core/ui/components/header-card';
import ImageViewer from '~/features/medias/components/image-viewer';
import VideoCarousel from '~/features/medias/components/video-carousel';
import VideoViewer from '~/features/medias/components/video-viewer';
import { getDateString } from '~/core/shared/utils';
import PageTitle from '~/core/ui/components/page-title';
import HeaderCardContent from '~/core/ui/components/header-card-content';
import HeaderCardImage from '~/core/ui/components/header-card-image';
import HeaderCardBody from '~/core/ui/components/header-card-body';
import ImageCarousel from '~/features/medias/components/image-carousel';
import TvShowBackground from '~/features/tv-shows/components/tv-show-background';
import { createErrorResponse } from '~/core/errors/utils';
import { goTry } from 'go-try';

export const loader = async ({ params }: LoaderArgs) => {
  const [err, data] = await goTry(() =>
    tvShowsService.episodeDetails(
      Number(params.tvShowId),
      Number(params.seasonNumber),
      Number(params.episodeNumber),
    ),
  );

  if (err) {
    throw createErrorResponse(err);
  }

  return json(data);
};

const getPageTitle = ({
  tvShow,
  tvShowEpisode,
}: SerializeFrom<typeof loader>) => {
  return `${tvShow.name} - ${tvShowEpisode.name}`;
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
    description: data.tvShowEpisode.overview || data.tvShowEpisode.overview,
    image: getImageUrl(
      data.tvShowEpisode.still_path || data.tvShow.poster_path,
    ),
  });
};

export default function EpisodeRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const pageTitle = getPageTitle(loaderData);
  const { tvShow, tvShowEpisode } = loaderData;

  return (
    <>
      <TvShowBackground src={tvShow.backdrop_path} alt={pageTitle} />
      <Flex flexDirection="column" gap={4}>
        <div>
          <PageTitle
            goBackButtonProps={{
              getFallback: () => ({
                pathname: `/tv-shows/${tvShow.id}/seasons`,
                search: new URLSearchParams({
                  season: tvShowEpisode.season_number.toString(),
                }).toString(),
              }),
            }}
            title={pageTitle}
            subtitle={`S ${tvShowEpisode.season_number}, Ep ${tvShowEpisode.episode_number}`}
          />
          <HeaderCard>
            <HeaderCardContent>
              <HeaderCardImage
                src={getImageUrl(tvShowEpisode.still_path)}
                alt={pageTitle}
                flexBasis="xs"
                aspectRatio="17 / 9"
              />
              <HeaderCardBody>
                <Flex justifyContent="space-between" gap={4}>
                  <VoteRating rating={tvShowEpisode.vote_average} />
                  <Box opacity={0.7}>
                    {getDateString(tvShowEpisode.air_date)}
                  </Box>
                </Flex>
                <div>{tvShowEpisode.overview}</div>
              </HeaderCardBody>
            </HeaderCardContent>
          </HeaderCard>
        </div>

        <section>
          <Title title="Videos" titleAs="h2" />
          <VideoCarousel videos={tvShowEpisode.videos.results} />
          <VideoViewer
            title={pageTitle}
            videos={tvShowEpisode.videos.results}
          />
        </section>

        <section>
          <Title title="Images" titleAs="h2" />
          <ImageCarousel
            images={tvShowEpisode.images.stills.map((still, i) => ({
              src: still.file_path,
              alt: `${tvShowEpisode.name} Image ${i + 1}`,
            }))}
          />
          <ImageViewer title={pageTitle} images={tvShowEpisode.images.stills} />
        </section>
      </Flex>
    </>
  );
}
