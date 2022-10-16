import { Flex, Spinner } from '@chakra-ui/react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type InfiniteScrollSentryProps = Pick<
  Parameters<typeof useInfiniteScroll>[0],
  'hasNextPage' | 'loading' | 'onLoadMore'
>;

export default function InfiniteScrollSentry({
  hasNextPage,
  loading,
  onLoadMore,
}: InfiniteScrollSentryProps) {
  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore,
  });

  if (!hasNextPage) {
    return null;
  }

  return (
    <Flex ref={sentryRef} justifyContent="center" padding={4}>
      <Spinner
        thickness="0.4rem"
        speed="0.65s"
        emptyColor="gray.200"
        color="red.500"
        size="xl"
      />
    </Flex>
  );
}
