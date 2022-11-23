import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getMetaTags } from '~/seo/SeoUtils';
import { Flex } from '@chakra-ui/react';
import TvShowList from '~/tv-shows/TvShowList';
import Title from '~/common/Title';
import { tvShowsService } from '~/tv-shows/TvShowsService';
import TvShowSeasonsLink from '~/tv-shows/TvShowSeasonsLink';
import ImageViewer from '~/medias/ImageViewer';
import VideoList from '~/medias/VideoList';
import VideoViewer from '~/medias/VideoViewer';
import ImageList from '~/medias/ImageList';
import { getImageUrl } from '~/medias/MediaUtils';
import PageTitle from '~/common/PageTitle';
import TvShowHeader from '~/tv-shows/TvShowHeader';
import ImageListItem from '~/medias/ImageListItem';

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
        <PageTitle
          goBackButtonProps={{ getFallback: () => '/' }}
          title={tvShow.name}
        />
        <TvShowHeader tvShow={tvShow} />
      </div>

      <TvShowSeasonsLink tvShow={tvShow} />

      <section>
        <Title title="Videos" titleAs="h2" />
        <VideoList videos={tvShow.videos?.results} />
        <VideoViewer title={tvShow.name} videos={tvShow.videos?.results} />
      </section>

      <section>
        <Title title="Images" titleAs="h2" />
        <ImageList>
          {tvShow.images?.backdrops.map((image, i) => {
            const src = image.file_path;
            return (
              <ImageListItem
                key={src}
                src={src}
                alt={`${tvShow.name} Image ${i + 1}`}
              />
            );
          })}
        </ImageList>
        <ImageViewer title={tvShow.name} images={tvShow.images?.backdrops} />
      </section>

      <section>
        <Title title="Similar TV Shows" titleAs="h2" />
        <TvShowList tvShows={tvShow.similar} />
      </section>
    </Flex>
  );
}
