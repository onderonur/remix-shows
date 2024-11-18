import { Grid } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import type { PaginationResponse } from '~/core/pagination/types';
import type { TvShowListItem } from '~/features/tv-shows/types';
import TvShowCard from './tv-show-card';
import type { Maybe } from '~/core/shared/types';
import InfoAlert from '~/core/ui/components/info-alert';

type TvShowListProps = {
  tvShows: Maybe<PaginationResponse<TvShowListItem>>;
};

export default function TvShowList({ tvShows }: TvShowListProps) {
  if (!tvShows?.results.length) {
    return <InfoAlert title="There are no tv shows..." />;
  }

  return (
    <Grid
      templateColumns={{
        base: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      rowGap="6"
      columnGap="2"
    >
      {tvShows.results.map((tvShow) => {
        return (
          <Link
            key={tvShow.id}
            to={`/tv-shows/${tvShow.id}`}
            state={{ canGoBack: true }}
          >
            <TvShowCard tvShow={tvShow} />
          </Link>
        );
      })}
    </Grid>
  );
}
