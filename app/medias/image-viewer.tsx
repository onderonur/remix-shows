import { getImageUrl } from '~/medias/media-utils';
import BaseImage from '../common/base-image';
import type { Maybe } from '../common/common-types';
import type { ImageMedia } from './media-types';
import MediaViewer from './media-viewer';

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
            src={getImageUrl(media.file_path, { size: 'original' })}
            alt={title}
          />
        );
      }}
    />
  );
}
