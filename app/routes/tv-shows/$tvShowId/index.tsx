import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getMetaTags } from '~/seo/SeoUtils';
import { Box, Flex } from '@chakra-ui/react';
import TvShowList from '~/tv-shows/TvShowList';
import SectionTitle from '~/common/SectionTitle';
import { tvShowsService } from '~/tv-shows/TvShowsService';
import TvShowCard from '~/tv-shows/TvShowCard';
import TvShowSeasonsLink from '~/tv-shows/TvShowSeasonsLink';
import ImageViewer from '~/medias/ImageViewer';
import VideoList from '~/medias/VideoList';
import VideoViewer from '~/medias/VideoViewer';
import ImageList from '~/medias/ImageList';
import { getImageUrl } from '~/medias/MediaUtils';

export const loader = async ({ params }: LoaderArgs) => {
  const tvShow = await tvShowsService.details(Number(params.tvShowId), {
    appendToResponse: ['videos', 'images', 'similar'],
  });

  return json({ tvShow });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data.tvShow) {
    return getMetaTags({
      title: 'Not found',
      description: 'Show not found',
    });
  }

  return getMetaTags({
    title: data.tvShow.name,
    description: data.tvShow.overview,
    image: getImageUrl(data.tvShow.poster_path),
  });
};

export default function TvShowsIndexRoute() {
  const { tvShow } = useLoaderData<typeof loader>();

  return (
    <Flex flexDirection="column" gap={4}>
      <div>
        <SectionTitle
          goBackButtonProps={{ getFallback: () => '/' }}
          titleAs="h1"
          title={tvShow.name}
        />
        <TvShowCard tvShow={tvShow} genresAsLink hasBackgroundImage />
      </div>

      <TvShowSeasonsLink tvShow={tvShow} />

      <Box>
        <SectionTitle title="Videos" />
        <VideoList videos={tvShow.videos?.results} />
        <VideoViewer title={tvShow.name} videos={tvShow.videos?.results} />
      </Box>

      <Box>
        <SectionTitle title="Images" />
        <ImageList
          images={tvShow.images?.backdrops}
          getImageAlt={(image, i) => `${tvShow.name} Image ${i + 1}`}
        />
        <ImageViewer title={tvShow.name} images={tvShow.images?.backdrops} />
      </Box>

      <Box>
        <SectionTitle title="Similar TV Shows" />
        <TvShowList tvShows={tvShow.similar} />
      </Box>
    </Flex>
  );
}
