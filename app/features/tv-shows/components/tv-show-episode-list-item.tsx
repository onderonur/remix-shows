import { Box, Flex, ListItem, Text } from '@chakra-ui/react';
import BaseImage from '~/core/ui/components/base-image';
import { paperStyles } from '~/core/ui/styles';
import { getDateString } from '~/core/shared/utils';
import VoteRating from '~/core/ui/components/vote-rating';
import { getImageUrl } from '~/features/medias/utils';
import type { BaseTvShowEpisode } from '../types';

type TvShowEpisodeListItemProps = {
  episode: BaseTvShowEpisode;
};

export default function TvShowEpisodeListItem({
  episode,
}: TvShowEpisodeListItemProps) {
  return (
    <ListItem
      display="flex"
      alignItems="flex-start"
      flexWrap="wrap"
      padding={4}
      gap={4}
      {...paperStyles}
    >
      <Box
        position="relative"
        flexGrow={1}
        flexShrink={0}
        flexBasis={240}
        marginX="auto"
        maxWidth="xs"
        rounded="md"
        overflow="hidden"
      >
        <BaseImage
          src={getImageUrl(episode.still_path)}
          alt={episode.name}
          sx={{ aspectRatio: '500 / 281' }}
        />
        <Box
          textAlign="center"
          position="absolute"
          bottom={0}
          width="full"
          backgroundImage={`linear-gradient(to bottom, transparent, #02050b)`}
          padding={1}
        >
          S {episode.season_number}, Ep {episode.episode_number}
        </Box>
      </Box>
      <Box flex={1} flexBasis={300}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box fontWeight="bold" fontSize="lg">
            {episode.name}
          </Box>
          <Box fontSize="sm" opacity={0.7}>
            {getDateString(episode.air_date)}
          </Box>
        </Flex>
        <VoteRating rating={episode.vote_average} />
        <Text marginTop={2}>{episode.overview}</Text>
      </Box>
    </ListItem>
  );
}
