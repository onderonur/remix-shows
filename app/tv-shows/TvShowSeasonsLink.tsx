import { Link } from '@remix-run/react';
import type { TvShow } from '~/tv-shows/TvShowsTypes';
import { Box, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { baseTransitionStyles, paperStyles } from '~/common/CommonStyles';

type TvShowSeasonsLinkProps = {
  tvShow: TvShow;
};

export default function TvShowSeasonsLink({ tvShow }: TvShowSeasonsLinkProps) {
  return (
    <Link to="seasons" state={{ canGoBack: true }}>
      <Flex
        alignItems="center"
        gap={4}
        paddingY={2}
        paddingX={4}
        role="group"
        {...paperStyles}
      >
        <div>
          <Box fontWeight="bold" fontSize="2xl">
            Seasons: {tvShow.number_of_seasons}
          </Box>
          <Box color="gray.600" fontSize="sm">
            Episodes: {tvShow.number_of_episodes}
          </Box>
        </div>
        <ChevronRightIcon
          fontSize={'5xl'}
          {...baseTransitionStyles}
          color="red.200"
          _groupHover={{ color: 'red.500', transform: 'scale(1.1)' }}
        />
      </Flex>
    </Link>
  );
}
