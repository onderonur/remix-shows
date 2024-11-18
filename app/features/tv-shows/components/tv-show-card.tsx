import { Flex, Text, VStack } from '@chakra-ui/react';
import BaseImage from '~/core/ui/components/base-image';
import { baseTransitionStyles } from '~/core/ui/styles';
import { getYear } from '~/core/shared/utils';
import VoteRating from '~/core/ui/components/vote-rating';
import { useGenres } from '~/features/genres/components/genres-context';
import { getImageUrl } from '~/features/medias/utils';
import type { TvShowListItem } from '../types';
import { BaseTooltip } from '~/core/ui/components/base-tooltip';

type TvShowCardProps = {
  tvShow: TvShowListItem;
};

export default function TvShowCard({ tvShow }: TvShowCardProps) {
  const genres = useGenres();

  return (
    <VStack
      spacing="1.5"
      align="stretch"
      borderRadius="md"
      position="relative"
      {...baseTransitionStyles}
      _hover={{
        transform: 'scale(1.03)',
      }}
    >
      <BaseImage
        src={getImageUrl(tvShow.backdrop_path)}
        alt={tvShow.name}
        sx={{ aspectRatio: '500 / 281' }}
        borderRadius="md"
        objectFit="cover"
      />
      <VStack align="stretch" spacing="0.5">
        <BaseTooltip label={tvShow.name} placement="top-start">
          <Text
            fontWeight="bold"
            fontSize="md"
            lineHeight="short"
            noOfLines={2}
          >
            {tvShow.name}
          </Text>
        </BaseTooltip>
        <Text opacity={0.7} fontSize="xs">
          {tvShow.genre_ids
            .map(
              (genreId) => genres.find((genre) => genre.id === genreId)?.name,
            )
            .join(', ')}
        </Text>
        <Flex fontWeight="semibold" fontSize="sm" gap="1">
          {getYear(tvShow.first_air_date)}
          <span>&middot;</span>
          <VoteRating rating={tvShow.vote_average} />
        </Flex>
      </VStack>
    </VStack>
  );
}
