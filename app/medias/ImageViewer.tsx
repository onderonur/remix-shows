import { getImageUrl } from "~/medias/MediaUtils";
import BaseImage from "../common/BaseImage";
import type { Maybe } from "../common/CommonTypes";
import type { ImageMedia } from "./MediaTypes";
import MediaViewer from "./MediaViewer";

type ImageViewerProps = {
  title: string;
  images: Maybe<ImageMedia[]>;
};

export default function ImageViewer({ title, images }: ImageViewerProps) {
  return (
    <MediaViewer
      title={title}
      medias={images}
      searchParamName="image"
      getMediaKey={(image) => image.file_path}
      renderMedia={({ media }) => {
        return (
          <BaseImage
            src={getImageUrl(media.file_path, { size: "original" })}
            alt={title}
          />
        );
      }}
    />
  );
}
