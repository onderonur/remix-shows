import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getMetaTags } from '~/core/seo/seo.utils';
import { Flex } from '@chakra-ui/react';
import TvShowList from '~/features/tv-shows/components/tv-show-list';
import Title from '~/core/ui/components/title';
import { tvShowsService } from '~/features/tv-shows/tv-shows.service';
import TvShowSeasonsLink from '~/features/tv-shows/components/tv-show-seasons-link';
import ImageViewer from '~/features/medias/components/image-viewer';
import VideoCarousel from '~/features/medias/components/video-carousel';
import VideoViewer from '~/features/medias/components/video-viewer';
import { getImageUrl } from '~/features/medias/medias.utils';
import PageTitle from '~/core/ui/components/page-title';
import TvShowHeader from '~/features/tv-shows/components/tv-show-header';
import ImageCarousel from '~/features/medias/components/image-carousel';
import TvShowBackground from '~/features/tv-shows/components/tv-show-background';
import { createErrorResponse } from '~/core/errors/errors.utils';
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
