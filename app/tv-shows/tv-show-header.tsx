import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { getYear } from '~/common/common-utils';
import HeaderCard from '~/common/header-card';
import HeaderCardContent from '~/common/header-card-content';
import HeaderCardBody from '~/common/header-card-body';
import HeaderCardImage from '~/common/header-card-image';
import VoteRating from '~/common/vote-rating';
import GenreTags from '~/genres/genre-tags';
import { getImageUrl } from '~/medias/media-utils';
import type { TvShow } from './tv-show-types';
import BaseImage from '~/common/base-image';

type TvShowHeaderProps = {
  tvShow: TvShow;
};

export default function TvShowHeader({ tvShow }: TvShowHeaderProps) {
  return (
    <HeaderCard>
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
