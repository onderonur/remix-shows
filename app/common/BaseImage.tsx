import type { ImgProps } from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";

type BaseImageProps = ImgProps;

// This component is for SSR.
// So it's wrapped just to be sure about we are using the right component (`Img`)
// and not `Image`.
export default function BaseImage(props: BaseImageProps) {
  return <Img {...props} />;
}
