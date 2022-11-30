import type { LoaderArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getImageUrl } from '~/medias/MediaUtils';
import { getMetaTags } from '~/seo/SeoUtils';
import { Box, Flex } from '@chakra-ui/react';
import VoteRating from '~/common/VoteRating';
import Title from '~/common/Title';
import { tvShowsService } from '~/tv-shows/TvShowsService';
import HeaderCard from '~/common/HeaderCard';
import ImageViewer from '~/medias/ImageViewer';
import VideoCarousel from '~/medias/VideoCarousel';
import VideoViewer from '~/medias/VideoViewer';
import { getDateString } from '~/common/CommonUtils';
import PageTitle from '~/common/PageTitle';
import HeaderCardContent from '~/common/HeaderCardContent';
import HeaderCardImage from '~/common/HeaderCardImage';
import HeaderCardBody from '~/common/HeaderCardBody';
import ImageCarousel from '~/medias/ImageCarousel';
import TvShowBackground from '~/tv-shows/TvShowBackground';

export const loader = async ({ params }: LoaderArgs) => {
  const { tvShow, tvShowEpisode } = await tvShowsService.episodeDetails(
    Number(params.tvShowId),
    Number(params.seasonNumber),
    Number(params.episodeNumber),
  );

  return json({ tvShow, tvShowEpisode });
};

const getPageTitle = ({
  tvShow,
  tvShowEpisode,
}: SerializeFrom<typeof loader>) => {
  return `${tvShow.name} - ${tvShowEpisode.name}`;
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
