import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { GlowingImageProps } from '~/common/GlowingImage';
import GlowingImage from '~/common/GlowingImage';

type HeaderCardImageProps = {
  src: string;
  alt: string;
  flexBasis: BoxProps['flexBasis'];
  aspectRatio: GlowingImageProps['aspectRatio'];
};

export default function HeaderCardImage({
  src,
  alt,
  aspectRatio,
  flexBasis,
}: HeaderCardImageProps) {
  return (
    <Box flexBasis={flexBasis} marginX="auto">
      <GlowingImage key={src} src={src} alt={alt} aspectRatio={aspectRatio} />
    </Box>
  );
}
