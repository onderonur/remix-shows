import YouTubePlayer from './youtube-player';
import MediaViewer from './media-viewer';
import type { Maybe } from '~/core/shared/types';
import type { VideoMedia } from '../types';

type VideoViewerProps = {
  title: string;
  videos: Maybe<VideoMedia[]>;
};

export default function VideoViewer({ title, videos }: VideoViewerProps) {
  return (
    <MediaViewer
      title={title}
      medias={videos}
      searchParamName="video"
      getMediaKey={(video) => video.key}
      renderMedia={({ media }) => {
        return <YouTubePlayer youTubeId={media.key} />;
      }}
    />
  );
}
