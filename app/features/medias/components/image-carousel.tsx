import { Link } from '@remix-run/react';
import BaseImage from '~/core/ui/components/base-image';
import Carousel from '~/core/ui/components/carousel';
import CarouselItem from '~/core/ui/components/carousel-item';
import type { Maybe } from '~/core/core.types';
import { getImageUrl } from '../medias.utils';

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
