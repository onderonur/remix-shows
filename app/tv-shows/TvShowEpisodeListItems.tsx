import { Box, Flex, ListItem } from '@chakra-ui/react';
import BaseImage from '~/common/BaseImage';
import { paperStyles } from '~/common/CommonStyles';
import { getDateString } from '~/common/CommonUtils';
import VoteRating from '~/common/VoteRating';
import { getImageUrl } from '~/medias/MediaUtils';
import type { BaseTvShowEpisode } from './TvShowsTypes';

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
          width="100%"
          backgroundImage={`linear-gradient(to bottom, transparent, #02050b)`}
          color="gray.200"
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
          <Box fontSize="sm" color="gray.600">
            {getDateString(episode.air_date)}
          </Box>
        </Flex>
        <VoteRating rating={episode.vote_average} />
        <Box marginTop={2}>{episode.overview}</Box>
      </Box>
    </ListItem>
  );
}
