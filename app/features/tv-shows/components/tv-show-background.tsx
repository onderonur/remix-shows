import { Box } from '@chakra-ui/react';
import BaseImage from '~/core/ui/components/base-image';
import {
  APP_DRAWER_WIDTH,
  APP_HEADER_HEIGHT,
} from '~/core/layouts/layout.utils';
import { getImageUrl } from '~/features/medias/medias.utils';

type TvShowBackgroundProps = {
  src: string;
  alt: string;
};

export default function TvShowBackground({ src, alt }: TvShowBackgroundProps) {
  return (
    <Box
      // To prevent showing the image of previous tvShow until the next one's is loaded.
      key={src}
      sx={{
        position: 'fixed',
        top: APP_HEADER_HEIGHT,
        right: 0,
        bottom: 0,
        left: { base: 0, lg: APP_DRAWER_WIDTH },
        zIndex: -1,
        opacity: 0.08,
      }}
    >
      <BaseImage
        src={getImageUrl(src, {
          size: 'original',
        })}
        alt={alt}
        sx={{
          objectFit: 'cover',
          width: 'full',
          height: 'full',
        }}
      />
    </Box>
  );
}
