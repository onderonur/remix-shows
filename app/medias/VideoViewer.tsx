import YouTubePlayer from "./YouTubePlayer";
import MediaViewer from "./MediaViewer";
import type { Maybe } from "~/common/CommonTypes";
import type { VideoMedia } from "./MediaTypes";

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
