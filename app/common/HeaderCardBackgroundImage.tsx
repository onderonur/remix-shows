import BaseImage from './BaseImage';

type HeaderCardBackgroundImageProps = {
  src: string;
  alt: string;
};

export default function HeaderCardBackgroundImage({
  src,
  alt,
}: HeaderCardBackgroundImageProps) {
  return (
    <BaseImage
      key={src}
      src={src}
      alt={`${alt} - Background`}
      objectFit="cover"
      position="absolute"
      inset={0}
      width="full"
      height="full"
      zIndex={-1}
    />
  );
}
