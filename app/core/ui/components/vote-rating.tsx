import { HStack, Box } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

type VoteRatingProps = {
  rating: number;
};

export default function VoteRating({ rating }: VoteRatingProps) {
  return (
    <HStack spacing={1} fontWeight="bold" whiteSpace="nowrap">
      <StarIcon color="yellow.400" />
      <HStack spacing={1}>
        <div>{Number(rating).toFixed(2)}</div>
        <Box opacity={0.7}>/ 10</Box>
      </HStack>
    </HStack>
  );
}
