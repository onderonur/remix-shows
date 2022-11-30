import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { getYear } from '~/common/CommonUtils';
import HeaderCard from '~/common/HeaderCard';
import HeaderCardBackgroundImage from '~/common/HeaderCardBackgroundImage';
import HeaderCardContent from '~/common/HeaderCardContent';
import HeaderCardBody from '~/common/HeaderCardBody';
import HeaderCardImage from '~/common/HeaderCardImage';
import VoteRating from '~/common/VoteRating';
import GenreTags from '~/genres/GenreTags';
import { getImageUrl } from '~/medias/MediaUtils';
import type { TvShow } from './TvShowsTypes';
import BaseImage from '~/common/BaseImage';

type TvShowHeaderProps = {
  tvShow: TvShow;
};

export default function TvShowHeader({ tvShow }: TvShowHeaderProps) {
  return (
    <HeaderCard>
      <HeaderCardBackgroundImage
        src={getImageUrl(tvShow.backdrop_path, {
          size: 'original',
        })}
        alt={tvShow.name}
      />
      <HeaderCardContent>
        <HeaderCardImage
          src={getImageUrl(tvShow.poster_path)}
          alt={tvShow.name}
          aspectRatio="2 / 3"
          flexBasis="2xs"
        />
        <HeaderCardBody>
          <Flex flexDirection="column" gap={2}>
            {tvShow.tagline && (
              <Text fontSize="lg" fontWeight="bold" opacity={0.7}>
                {tvShow.tagline}
              </Text>
            )}
            <Text>{tvShow.overview}</Text>
            <Flex gap={2} fontSize="lg">
              <Box fontWeight="semibold">{getYear(tvShow.first_air_date)}</Box>
              <div>&middot;</div>
              <VoteRating rating={tvShow.vote_average} />
            </Flex>
            <GenreTags genres={tvShow.genres} />
            <List
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, paddingY: 2 }}
            >
              {tvShow.networks.map((network) => {
                return (
                  <ListItem key={network.id}>
                    <BaseImage
                      src={getImageUrl(network.logo_path)}
                      alt={network.name}
                      title={network.name}
                      sx={{
                        width: '16',
                        aspectRatio: '16 / 9',
                        objectFit: 'contain',
                        backgroundColor: 'whiteAlpha.900',
                        padding: 1,
                        borderRadius: 'md',
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Flex>
        </HeaderCardBody>
      </HeaderCardContent>
    </HeaderCard>
  );
}
