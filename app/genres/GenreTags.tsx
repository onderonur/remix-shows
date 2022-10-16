import { Flex, Tag } from '@chakra-ui/react';
import React from 'react';
import { Link } from '@remix-run/react';
import type { Id } from '~/common/CommonTypes';
import { useGenres } from '~/genres/GenresContext';
import type { Genre } from '~/genres/GenresTypes';

type GenreTagsProps = {
  genres: Genre[] | Id[];
  asLink: boolean;
};

export default function GenreTags({ genres, asLink }: GenreTagsProps) {
  const allGenres = useGenres();

  return (
    <Flex gap={2} flexWrap="wrap">
      {genres.map((genre) => {
        let genreId: Id;
        let genreName: string = '';
        if (typeof genre === 'number') {
          genreId = genre;
          const found = allGenres.find((item) => item.id === genre);
          genreName = found?.name ?? '';
        } else {
          genreId = genre.id;
          genreName = genre.name;
        }

        const tag = <Tag colorScheme="red">{genreName}</Tag>;

        const searchParams = new URLSearchParams({
          genreId: genreId.toString(),
        });
        const tagContent = asLink ? (
          <Link
            key={genreId}
            to={{ pathname: '/', search: searchParams.toString() }}
          >
            {tag}
          </Link>
        ) : (
          tag
        );

        return <React.Fragment key={genreId}>{tagContent}</React.Fragment>;
      })}
    </Flex>
  );
}
