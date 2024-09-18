import { Box } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import Carousel from '~/core/ui/components/carousel';
import CarouselItem from '~/core/ui/components/carousel-item';
import { paperStyles } from '~/core/ui/ui.styles';
import type { Maybe } from '~/core/core.types';
import type { VideoMedia } from '../medias.types';
import { BaseTooltip } from '~/core/ui/components/base-tooltip';

type VideoCarouselProps = {
  videos: Maybe<VideoMedia[]>;
};

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  return (
    <Carousel visibleItemCount={{ base: 2.5, md: 3.5, lg: 4.5 }}>
      {videos?.map((video) => {
        const searchParams = new URLSearchParams({ video: video.key });
        return (
          <CarouselItem key={video.key}>
            <BaseTooltip label={video.name}>
              <Link
                to={{ search: searchParams.toString() }}
                state={{ canGoBack: true }}
              >
                <Box
                  {...paperStyles}
                  marginBottom={2}
                  paddingY={2}
                  paddingX={4}
                >
                  <Box fontWeight="semibold" noOfLines={2}>
                    {video.name}
                  </Box>
                  <Box fontSize="sm" opacity={0.7}>
                    {video.type}
                  </Box>
                </Box>
              </Link>
            </BaseTooltip>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
}
