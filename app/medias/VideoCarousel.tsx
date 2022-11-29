import { Box } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import Carousel from '~/common/Carousel';
import CarouselItem from '~/common/CarouselItem';
import { paperStyles } from '~/common/CommonStyles';
import type { Maybe } from '~/common/CommonTypes';
import type { VideoMedia } from './MediaTypes';

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
            <Link
              to={{ search: searchParams.toString() }}
              state={{ canGoBack: true }}
              title={video.name}
            >
              <Box {...paperStyles} marginBottom={2} paddingY={2} paddingX={4}>
                <Box fontWeight="semibold" noOfLines={2}>
                  {video.name}
                </Box>
                <Box fontSize="sm" opacity={0.7}>
                  {video.type}
                </Box>
              </Box>
            </Link>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
}
