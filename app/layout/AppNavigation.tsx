import { Box, Flex, List, ListItem, Stack, VStack } from '@chakra-ui/react';
import { Link, useLocation, useSearchParams } from '@remix-run/react';
import ExternalLink from '~/common/ExternalLink';
import { useGenres } from '~/genres/GenresContext';
import GitHubIcon from './GitHubIcon';
import TmdbAttribution from './TmdbAttribution';

export default function AppNavigation() {
  const genres = useGenres();
  const [searchParams] = useSearchParams();
  const genreId = searchParams.get('genreId');
  const location = useLocation();

  return (
    <Flex
      flexDirection={'column'}
      gap={4}
      height="full"
      overflow="hidden"
      paddingBottom={6}
    >
      <VStack align="stretch" spacing={1} flex={1} padding={4} overflow="auto">
        <Box fontWeight="bold">Genres</Box>
        <Box as="nav">
          <List>
            {genres.map((genre) => {
              const isSelected =
                location.pathname === '/' && Number(genreId) === genre.id;
              return (
                <ListItem
                  key={genre.id}
                  marginY={0.5}
                  color={isSelected ? 'red.400' : undefined}
                  backgroundColor={isSelected ? 'gray.600' : undefined}
                  fontWeight={isSelected ? 'bold' : undefined}
                  _hover={{ backgroundColor: 'gray.500' }}
                  _active={{ backgroundColor: 'gray.600' }}
                  rounded="md"
                >
                  <Link to={{ pathname: '/', search: `genreId=${genre.id}` }}>
                    <Box padding={2}>{genre.name}</Box>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </VStack>
      <Box paddingX={4}>
        <TmdbAttribution />
      </Box>
      <Box paddingX={4}>
        <ExternalLink
          aria-label="Check the source code on GitHub"
          href="https://github.com/onderonur/remix-shows"
        >
          <Stack spacing={2} alignItems={'center'} textAlign={'center'}>
            <GitHubIcon />
            <Box fontSize="xs">Check the source code on GitHub</Box>
          </Stack>
        </ExternalLink>
      </Box>
    </Flex>
  );
}
