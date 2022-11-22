import type { BoxProps } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import type { GlowingImageProps } from '~/common/GlowingImage';
import GlowingImage from '~/common/GlowingImage';
import BaseImage from './BaseImage';

type FancyCardProps = React.PropsWithChildren<{
  imageSrc: string;
  imageAlt: string;
  imageFlexBasis: BoxProps['flexBasis'];
  imageRatio: GlowingImageProps['aspectRatio'];
  backgroundImageSrc?: string;
}>;

export default function FancyCard({
  children,
  imageSrc,
  imageAlt,
  imageFlexBasis,
  imageRatio,
  backgroundImageSrc,
}: FancyCardProps) {
  return (
    <Box
      width="full"
      position="relative"
      padding="4"
      rounded="md"
      overflow="hidden"
      backgroundImage="radial-gradient(circle at 20% 50%, rgb(255 255 255 / 87%) 0%, rgb(255 255 255 / 92%) 100%)"
      border="1px"
      borderColor="gray.300"
    >
      <BaseImage
        key={backgroundImageSrc}
        src={backgroundImageSrc}
        alt={`${imageAlt} - Background`}
        objectFit="cover"
        position="absolute"
        inset={0}
        width="full"
        height="full"
        zIndex={-1}
      />
      <Flex gap={4} flexWrap="wrap">
        <Box flexBasis={imageFlexBasis} marginX="auto">
          <GlowingImage
            key={imageSrc}
            src={imageSrc}
            alt={imageAlt}
            aspectRatio={imageRatio}
          />
        </Box>
        <Box flexGrow={1} flexBasis="sm">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
