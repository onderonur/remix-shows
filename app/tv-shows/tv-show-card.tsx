import { Flex, Text, VStack } from '@chakra-ui/react';
import BaseImage from '~/common/base-image';
import { baseTransitionStyles } from '~/common/common-styles';
import { getYear } from '~/common/common-utils';
import VoteRating from '~/common/vote-rating';
import { useGenres } from '~/genres/genres-context';
import { getImageUrl } from '~/medias/media-utils';
import type { TvShowListItem } from './tv-show-types';

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
        <Text fontWeight="bold" fontSize="md" lineHeight="short">
          {tvShow.name}
        </Text>
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
