import { Flex, Tag } from '@chakra-ui/react';
import React from 'react';
import { Link } from '@remix-run/react';
import type { Genre } from '~/genres/GenresTypes';

type GenreTagsProps = {
  genres: Genre[];
};

export default function GenreTags({ genres }: GenreTagsProps) {
  return (
    <Flex gap={2} flexWrap="wrap">
      {genres.map((genre) => {
        const { id, name } = genre;

        const searchParams = new URLSearchParams({
          genreId: id.toString(),
        });

        return (
          <React.Fragment key={id}>
            <Link
              key={id}
              to={{ pathname: '/', search: searchParams.toString() }}
            >
              <Tag colorScheme="red">{name}</Tag>
            </Link>
          </React.Fragment>
        );
      })}
    </Flex>
  );
}
