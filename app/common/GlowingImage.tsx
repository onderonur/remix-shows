import { Box } from '@chakra-ui/react';
import BaseImage from './BaseImage';

export type GlowingImageProps = {
  src: string;
  alt: string;
  aspectRatio: string;
};

function GlowingImage({ src, alt, aspectRatio }: GlowingImageProps) {
  return (
    <Box
      position="relative"
      borderRadius="md"
      width="full"
      sx={{ aspectRatio }}
      _before={{
        content: "''",
        position: 'absolute',
        inset: 0,
        background: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(0.3rem) saturate(2)',
        borderRadius: 'inherit',
        aspectRatio: 'inherit',
      }}
    >
      <BaseImage
        src={src}
        alt={alt}
        width="full"
        height="full"
        objectFit="cover"
        borderRadius="inherit"
        transform="scale(0.96)"
      />
    </Box>
  );
}

export default GlowingImage;
