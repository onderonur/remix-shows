import { Grid } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import type { PaginationResponse } from '~/pagination/pagination-types';
import type { TvShowListItem } from '~/tv-shows/tv-show-types';
import TvShowCard from './tv-show-card';
import type { Maybe } from '~/common/common-types';
import InfoAlert from '~/common/info-alert';

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
