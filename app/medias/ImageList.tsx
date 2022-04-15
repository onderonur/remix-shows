import { getImageUrl } from "~/medias/MediaUtils";
import BaseImage from "~/common/BaseImage";
import { AspectRatio, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import type { Maybe } from "~/common/CommonTypes";
import type { ImageMedia } from "./MediaTypes";
import EmptyAlert from "~/common/EmptyAlert";

type ImageListProps = {
  images: Maybe<ImageMedia[]>;
  getImageAlt: (image: ImageMedia, i: number) => string;
};

export default function ImageList({ images, getImageAlt }: ImageListProps) {
  if (!images?.length) {
    return <EmptyAlert title="There are no images..." />;
  }

  return (
    <Grid gridTemplateColumns={"repeat(auto-fill, minmax(6rem, 1fr))"} gap={1}>
      {images?.map((image, i) => {
        const src = image.file_path;
        const alt = getImageAlt(image, i);
        const searchParams = new URLSearchParams({ image: src });
        return (
          <GridItem key={src}>
            <Link
              to={{ search: searchParams.toString() }}
              state={{ canGoBack: true }}
            >
              <AspectRatio ratio={16 / 9}>
                <BaseImage src={getImageUrl(src)} alt={alt} />
              </AspectRatio>
            </Link>
          </GridItem>
        );
      })}
    </Grid>
  );
}
