import { Box } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import type { PaginationResponse } from '~/pagination/PaginationTypes';
import type { TvShowListItem } from '~/tv-shows/TvShowsTypes';
import TvShowCard from './TvShowCard';
import { baseTransitionStyles } from '~/common/CommonStyles';
import BaseMasonry from '~/common/BaseMasonry';
import type { Maybe } from '~/common/CommonTypes';
import EmptyAlert from '~/common/EmptyAlert';

type TvShowListProps = {
  tvShows: Maybe<PaginationResponse<TvShowListItem>>;
};

export default function TvShowList({ tvShows }: TvShowListProps) {
  if (!tvShows?.results.length) {
    return <EmptyAlert title="There are no tv shows..." />;
  }

  return (
    <BaseMasonry>
      {({ itemGap }) =>
        tvShows?.results.map((tvShow) => {
          return (
            <Box
              key={tvShow.id}
              padding={itemGap}
              {...baseTransitionStyles}
              _hover={{ transform: 'scale(1.02)' }}
            >
              <Link to={`/tv-shows/${tvShow.id}`} state={{ canGoBack: true }}>
                <TvShowCard
                  tvShow={tvShow}
                  overviewNoOfLines={12}
                  genresAsLink={false}
                />
              </Link>
            </Box>
          );
        })
      }
    </BaseMasonry>
  );
}
