import { Box } from '@chakra-ui/react';

type HeaderCardBodyProps = React.PropsWithChildren;

export default function HeaderCardBody({ children }: HeaderCardBodyProps) {
  return (
    <Box flexGrow={1} flexBasis="sm">
      {children}
    </Box>
  );
}
