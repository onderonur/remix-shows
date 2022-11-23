import { Box } from '@chakra-ui/react';

type HeaderCardProps = React.PropsWithChildren;

export default function HeaderCard({ children }: HeaderCardProps) {
  return (
    <Box
      width="full"
      position="relative"
      padding="4"
      rounded="md"
      overflow="hidden"
      backgroundImage="radial-gradient(circle at 20% 50%, rgb(255 255 255 / 87%) 0%, rgb(255 255 255 / 92%) 100%)"
      border="1px"
      borderColor="gray.300"
    >
      {children}
    </Box>
  );
}
