import type { BoxProps } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';

export type TitleProps = {
  title: string;
  titleAs?: BoxProps['as'];
  subtitle?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
};

export default function Title({
  title,
  titleAs,
  subtitle,
  before,
  after,
}: TitleProps) {
  return (
    <Flex as="header" alignItems={'center'} gap={3} mb={2} flexWrap="wrap">
      {before && <div>{before}</div>}
      <Flex flexDirection="column" flex={1} lineHeight="short">
        <Box
          as={titleAs}
          fontWeight="extrabold"
          fontSize={{ base: 'xl', lg: '2xl' }}
        >
          {title}
        </Box>
        {subtitle && (
          <Box fontSize={{ base: 'sm', lg: 'md' }} fontWeight="semibold">
            {subtitle}
          </Box>
        )}
      </Flex>
      {after && <div>{after}</div>}
    </Flex>
  );
}
