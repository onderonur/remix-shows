import {
  AspectRatio,
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import type { Maybe } from '~/common/CommonTypes';
import { useGoBack } from '~/routing/RoutingHooks';

const stepperButtonDistanceFromEdge = 2;

type MediaViewerProps<MediaItem> = {
  title: string;
  medias: Maybe<MediaItem[]>;
  searchParamName: string;
  getMediaKey: (media: MediaItem) => string;
  renderMedia: (props: { media: MediaItem }) => React.ReactNode;
};

export default function MediaViewer<MediaItem>({
  title,
  medias,
  searchParamName,
  getMediaKey,
  renderMedia,
}: MediaViewerProps<MediaItem>) {
  const [searchParams] = useSearchParams();
  const mediaKey = searchParams.get(searchParamName);

  const firstIndex = 0;
  const lastIndex = (medias?.length ?? 1) - 1;
  const currentIndex =
    medias?.findIndex((media) => getMediaKey(media) === mediaKey) ?? -1;
  const media = medias?.[currentIndex];

  const size = useBreakpointValue({ base: 'full', md: '6xl' });

  const navigate = useNavigate();

  const handleClickStep = (media: Maybe<MediaItem>) => {
    if (media) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set(searchParamName, getMediaKey(media));
      navigate(
        {
          search: newSearchParams.toString(),
        },
        {
          replace: true,
          state: { canGoBack: true },
        },
      );
    }
  };

  const goBack = useGoBack({
    getFallback: () => {
      const restSearchParams = new URLSearchParams(searchParams);
      restSearchParams.delete(searchParamName);
      return { search: restSearchParams.toString() };
    },
  });

  return (
    <Modal isCentered isOpen={!!media} size={size} onClose={goBack}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Box position="relative">
            <AspectRatio ratio={16 / 9}>
              {media && renderMedia({ media })}
            </AspectRatio>
            {currentIndex > firstIndex && (
              <Flex
                position="absolute"
                top={0}
                bottom={0}
                left={stepperButtonDistanceFromEdge}
                alignItems="center"
              >
                <IconButton
                  aria-label="Previous image"
                  icon={<ArrowBackIcon />}
                  onClick={() => handleClickStep(medias?.[currentIndex - 1])}
                />
              </Flex>
            )}
            {currentIndex < lastIndex && (
              <Flex
                position="absolute"
                top={0}
                bottom={0}
                right={stepperButtonDistanceFromEdge}
                alignItems="center"
              >
                <IconButton
                  aria-label="Previous image"
                  icon={<ArrowForwardIcon />}
                  onClick={() => handleClickStep(medias?.[currentIndex + 1])}
                />
              </Flex>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
