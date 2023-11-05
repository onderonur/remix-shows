import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getMetaTags } from '~/seo/seo-utils';
import { Flex } from '@chakra-ui/react';
import TvShowList from '~/tv-shows/tv-show-list';
import Title from '~/common/title';
import { tvShowsService } from '~/tv-shows/tv-show-service';
import TvShowSeasonsLink from '~/tv-shows/tv-show-seasons-link';
import ImageViewer from '~/medias/image-viewer';
import VideoCarousel from '~/medias/video-carousel';
import VideoViewer from '~/medias/video-viewer';
import { getImageUrl } from '~/medias/media-utils';
import PageTitle from '~/common/page-title';
import TvShowHeader from '~/tv-shows/tv-show-header';
import ImageCarousel from '~/medias/image-carousel';
import TvShowBackground from '~/tv-shows/tv-show-background';
import { createErrorResponse } from '~/error-handling/error-handling-utils';
import { goTry } from 'go-try';

export const loader = async ({ params }: LoaderArgs) => {
  const [err, tvShow] = await goTry(() =>
    tvShowsService.details(Number(params.tvShowId), {
      appendToResponse: ['videos', 'images', 'similar'],
    }),
  );

  if (err) {
    throw createErrorResponse(err);
  }

  return json({ tvShow });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
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
    <>
      <TvShowBackground src={tvShow.backdrop_path} alt={tvShow.name} />
      <Flex
        // To reset things like horizontal scroll positions on tvShow change.
        // Because we can navigate between tvShow pages directly by using "Similar Shows" section.
        key={tvShow.id}
        flexDirection="column"
        gap={4}
      >
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
          <VideoCarousel
            // To reset the carousel as user redirects from tv show to another tv show
            key={tvShow.id}
            videos={tvShow.videos?.results}
          />
          <VideoViewer title={tvShow.name} videos={tvShow.videos?.results} />
        </section>

        <section>
          <Title title="Images" titleAs="h2" />
          <ImageCarousel
            // To reset the carousel as user redirects from tv show to another tv show
            key={tvShow.id}
            images={tvShow.images?.backdrops.map((backdrop, i) => ({
              src: backdrop.file_path,
              alt: `${tvShow.name} Image ${i + 1}`,
            }))}
          />
          <ImageViewer title={tvShow.name} images={tvShow.images?.backdrops} />
        </section>

        <section>
          <Title title="Similar TV Shows" titleAs="h2" />
          <TvShowList tvShows={tvShow.similar} />
        </section>
      </Flex>
    </>
  );
}
