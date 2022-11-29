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
          <Box fontSize="sm" opacity={0.7}>
            Episodes: {tvShow.number_of_episodes}
          </Box>
        </div>
        <ChevronRightIcon
          fontSize={'5xl'}
          {...baseTransitionStyles}
          color="red.300"
          position="relative"
          _groupHover={{
            color: 'red.400',
            transform: 'scale(1.1) translate(10px)',
          }}
        />
      </Flex>
    </Link>
  );
}
