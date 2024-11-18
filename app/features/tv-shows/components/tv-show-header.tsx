import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { getYear } from '~/core/shared/utils';
import HeaderCard from '~/core/ui/components/header-card';
import HeaderCardContent from '~/core/ui/components/header-card-content';
import HeaderCardBody from '~/core/ui/components/header-card-body';
import HeaderCardImage from '~/core/ui/components/header-card-image';
import VoteRating from '~/core/ui/components/vote-rating';
import GenreTags from '~/features/genres/components/genre-tags';
import { getImageUrl } from '~/features/medias/utils';
import type { TvShow } from '../types';
import BaseImage from '~/core/ui/components/base-image';

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
