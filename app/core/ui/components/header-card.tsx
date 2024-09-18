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
      borderWidth="medium"
    >
      {children}
    </Box>
  );
}
