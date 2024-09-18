import { getImageUrl } from '~/features/medias/medias.utils';
import BaseImage from '~/core/ui/components/base-image';
import type { Maybe } from '~/core/core.types';
import type { ImageMedia } from '~/features/medias/medias.types';
import MediaViewer from '~/features/medias/components/media-viewer';

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
