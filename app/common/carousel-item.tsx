import { Box } from '@chakra-ui/react';

type CarouselItemProps = React.PropsWithChildren;

export default function CarouselItem({ children }: CarouselItemProps) {
  return (
    <Box
      sx={{
        scrollSnapAlign: 'start',
        width: 'full',
        flex: 'none',
      }}
    >
      {children}
    </Box>
  );
}
