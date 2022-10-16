import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getImageUrl } from '~/medias/MediaUtils';
import { getMetaTags } from '~/seo/SeoUtils';
import { Box, Flex } from '@chakra-ui/react';
import VoteRating from '~/common/VoteRating';
import SectionTitle from '~/common/SectionTitle';
import { tvShowsService } from '~/tv-shows/TvShowsService';
import type { TvShow, TvShowEpisode } from '~/tv-shows/TvShowsTypes';
import FancyCard from '~/common/FancyCard';
import ImageViewer from '~/medias/ImageViewer';
import VideoList from '~/medias/VideoList';
import VideoViewer from '~/medias/VideoViewer';
import ImageList from '~/medias/ImageList';
import { getDateString } from '~/common/CommonUtils';

type LoaderData = {
  tvShow: TvShow;
  tvShowEpisode: TvShowEpisode;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const { tvShow, tvShowEpisode } = await tvShowsService.episodeDetails(
    Number(params.tvShowId),
    Number(params.seasonNumber),
    Number(params.episodeNumber),
  );

  return { tvShow, tvShowEpisode };
};

const getPageTitle = ({ tvShow, tvShowEpisode }: LoaderData) => {
  return `${tvShow.name} - ${tvShowEpisode.name}`;
};

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
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
  const loaderData = useLoaderData<LoaderData>();
  const pageTitle = getPageTitle(loaderData);
  const { tvShow, tvShowEpisode } = loaderData;

  return (
    <Flex flexDirection="column" gap={4}>
      <div>
        <SectionTitle
          goBackButtonProps={{
            getFallback: () => ({
              pathname: `/tv-shows/${tvShow.id}/seasons`,
              search: new URLSearchParams({
                season: tvShowEpisode.season_number.toString(),
              }).toString(),
            }),
          }}
          titleAs="h1"
          title={pageTitle}
          subtitle={`S ${tvShowEpisode.season_number}, Ep ${tvShowEpisode.episode_number}`}
        />
        <Flex gap={4}>
          <FancyCard
            imageSrc={getImageUrl(tvShowEpisode.still_path)}
            imageAlt={pageTitle}
            imageFlexBasis="xs"
            imageRatio={16 / 9}
            backgroundImageSrc={getImageUrl(tvShow.backdrop_path, {
              size: 'original',
            })}
          >
            <Flex justifyContent="space-between" gap={4}>
              <VoteRating rating={tvShowEpisode.vote_average} size="md" />
              <Box color="gray.600">
                {getDateString(tvShowEpisode.air_date)}
              </Box>
            </Flex>
            <div>{tvShowEpisode.overview}</div>
          </FancyCard>
        </Flex>
      </div>

      <Box>
        <SectionTitle title="Videos" />
        <VideoList videos={tvShowEpisode.videos.results} />
        <VideoViewer title={pageTitle} videos={tvShowEpisode.videos.results} />
      </Box>

      <Box>
        <SectionTitle title="Images" />
        <ImageList
          images={tvShowEpisode.images.stills}
          getImageAlt={(image, i) => `${tvShowEpisode.name} Image ${i + 1}`}
        />
        <ImageViewer title={pageTitle} images={tvShowEpisode.images.stills} />
      </Box>
    </Flex>
  );
}
