import { Box, Flex, Text } from '@chakra-ui/react';
import { getYear } from '~/common/CommonUtils';
import HeaderCard from '~/common/HeaderCard';
import VoteRating from '~/common/VoteRating';
import GenreTags from '~/genres/GenreTags';
import { getImageUrl } from '~/medias/MediaUtils';
import type { TvShow } from './TvShowsTypes';

type TvShowHeaderProps = {
  tvShow: TvShow;
};

export default function TvShowHeader({ tvShow }: TvShowHeaderProps) {
  return (
    <HeaderCard
      imageSrc={getImageUrl(tvShow.poster_path)}
      imageAlt={tvShow.name}
      imageFlexBasis="2xs"
      imageRatio="2 / 3"
      backgroundImageSrc={getImageUrl(tvShow.backdrop_path, {
        size: 'original',
      })}
    >
      <Flex flexDirection="column" gap={2}>
        <Flex gap={2} fontSize="lg">
          <VoteRating rating={tvShow.vote_average} />
          <div>&middot;</div>
          <Box color="gray.600" fontWeight="semibold" fontSize="lg">
            {getYear(tvShow.first_air_date)}
          </Box>
        </Flex>
        <div>
          {tvShow.tagline && (
            <Text color="gray.600" fontSize="lg" fontWeight="semibold">
              {tvShow.tagline}
            </Text>
          )}
          <Text>{tvShow.overview}</Text>
        </div>
        <GenreTags genres={tvShow.genres} />
      </Flex>
    </HeaderCard>
  );
}
