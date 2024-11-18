import { List, ListItem, Tag } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import type { Genre } from '~/features/genres/types';

type GenreTagsProps = {
  genres: Genre[];
};

export default function GenreTags({ genres }: GenreTagsProps) {
  return (
    <List gap={2} display="flex" flexWrap="wrap">
      {genres.map((genre) => {
        const { id, name } = genre;

        const searchParams = new URLSearchParams({
          genreId: id.toString(),
        });

        return (
          <ListItem key={id}>
            <Link to={{ pathname: '/', search: searchParams.toString() }}>
              <Tag colorScheme="red">{name}</Tag>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
}
