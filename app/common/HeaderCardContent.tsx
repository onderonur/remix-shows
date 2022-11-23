import { Flex } from '@chakra-ui/react';

type HeaderCardContentProps = React.PropsWithChildren;

export default function HeaderCardContent({
  children,
}: HeaderCardContentProps) {
  return (
    <Flex gap={4} flexWrap="wrap">
      {children}
    </Flex>
  );
}
