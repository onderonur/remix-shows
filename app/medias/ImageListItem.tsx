import { GridItem } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import BaseImage from '~/common/BaseImage';
import { getImageUrl } from './MediaUtils';

type ImageListItemProps = {
  src: string;
  alt: string;
};

export default function ImageListItem({ src, alt }: ImageListItemProps) {
  const searchParams = new URLSearchParams({ image: src });

  return (
    <GridItem>
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
    </GridItem>
  );
}
