import { Link } from '@remix-run/react';
import BaseImage from '~/common/BaseImage';
import Carousel from '~/common/Carousel';
import CarouselItem from '~/common/CarouselItem';
import type { Maybe } from '~/common/CommonTypes';
import { getImageUrl } from './MediaUtils';

type ImageCarouselProps = {
  images: Maybe<
    Array<{
      src: string;
      alt: string;
    }>
  >;
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel visibleItemCount={{ base: 2.5, sm: 3.5, xl: 4.5 }}>
      {images?.map((image) => {
        const { src, alt } = image;
        const searchParams = new URLSearchParams({ image: src });

        return (
          <CarouselItem key={src}>
            <Link
              to={{ search: searchParams.toString() }}
              state={{ canGoBack: true }}
            >
              <BaseImage
                src={getImageUrl(src)}
                alt={alt}
                sx={{ width: 'full', aspectRatio: '16 / 9' }}
              />
            </Link>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
}
