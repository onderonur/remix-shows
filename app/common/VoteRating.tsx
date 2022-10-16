import type { TypographyProps } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

type VoteRatingProps = {
  rating: number;
  size?: TypographyProps['fontSize'];
};

export default function VoteRating({ rating, size = 'sm' }: VoteRatingProps) {
  return (
    <HStack
      spacing={2}
      fontWeight="bold"
      fontSize={size}
      color="gray.600"
      whiteSpace="nowrap"
    >
      <StarIcon color="yellow.400" />
      <HStack spacing={1}>
        <div>{Number(rating).toFixed(2)}</div>
        <Box color="gray.600" opacity={0.7}>
          / 10
        </Box>
      </HStack>
    </HStack>
  );
}
