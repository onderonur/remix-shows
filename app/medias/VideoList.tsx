import { Box, List, ListItem } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { paperStyles } from '~/common/CommonStyles';
import type { Maybe } from '~/common/CommonTypes';
import EmptyAlert from '~/common/EmptyAlert';
import type { VideoMedia } from './MediaTypes';

type VideoListProps = {
  videos: Maybe<VideoMedia[]>;
};

export default function VideoList({ videos }: VideoListProps) {
  if (!videos?.length) {
    return <EmptyAlert title="There are no videos..." />;
  }

  return (
    <List spacing={2}>
      {videos?.map((video) => {
        const searchParams = new URLSearchParams({ video: video.key });
        return (
          <ListItem key={video.key} {...paperStyles} paddingY={2} paddingX={4}>
            <Link
              to={{ search: searchParams.toString() }}
              state={{ canGoBack: true }}
            >
              <Box fontWeight="semibold">{video.name}</Box>
              <Box fontSize="sm" color="gray.600">
                {video.type}
              </Box>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
}
