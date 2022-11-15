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
    <Flex alignItems={'center'} gap={3} mb={2} flexWrap="wrap">
      {before && <div>{before}</div>}
      <Flex flexDirection="column" justifyContent="center" flex={1}>
        <Box
          as={titleAs}
          fontWeight="extrabold"
          fontSize={{ base: 'xl', lg: '2xl' }}
          color="gray.700"
        >
          {title}
        </Box>
        {subtitle && (
          <Box fontSize={{ base: 'sm', lg: 'md' }} color="gray.600">
            {subtitle}
          </Box>
        )}
      </Flex>
      {after && <div>{after}</div>}
    </Flex>
  );
}
