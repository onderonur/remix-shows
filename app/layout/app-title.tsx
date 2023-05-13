import { Box, HStack, IconButton } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { APP_TITLE } from '~/common/common-utils';
import { HamburgerIcon } from '@chakra-ui/icons';

type AppTitleProps = {
  onClickToggle: VoidFunction;
};

export default function AppTitle({ onClickToggle }: AppTitleProps) {
  return (
    <HStack spacing={2}>
      <IconButton
        aria-label="Toggle drawer"
        icon={<HamburgerIcon />}
        onClick={onClickToggle}
        display={{ base: 'block', lg: 'none' }}
        size="sm"
      />
      <Link to="/">
        <Box
          fontWeight="bold"
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          color="red.400"
        >
          {APP_TITLE}
        </Box>
      </Link>
    </HStack>
  );
}
