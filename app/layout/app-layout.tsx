import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import AppTitle from '~/layout/app-title';
import AppHeader from './app-header';
import AppDrawer from './app-drawer';
import AppNavigation from './app-navigation';
import { APP_DRAWER_WIDTH, APP_HEADER_HEIGHT } from './layout-utils';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const appTitle = (
    <AppTitle onClickToggle={() => setIsDrawerOpen((current) => !current)} />
  );

  return (
    <>
      <Grid
        gridTemplateAreas={`
        'appHeader appHeader'
        'appSideBar appContent'
        `}
        gridTemplateRows={`${APP_HEADER_HEIGHT} 1fr`}
        gridTemplateColumns={{ base: '0 1fr', lg: `${APP_DRAWER_WIDTH} 1fr` }}
      >
        <GridItem gridArea="appHeader">
          <AppHeader title={appTitle} />
        </GridItem>
        <GridItem gridArea="appSideBar">
          <Box
            display={{ base: 'none', lg: 'block' }}
            position="fixed"
            top={APP_HEADER_HEIGHT}
            bottom={0}
            width="3xs"
            background="chakra-subtle-bg"
          >
            <AppNavigation />
          </Box>
        </GridItem>
        <GridItem gridArea="appContent">
          <Container
            as="main"
            maxW="container.xl"
            paddingY={{ base: 4, md: 6 }}
            paddingX={{ base: 2, md: 6 }}
          >
            {children}
          </Container>
        </GridItem>
      </Grid>
      <AppDrawer
        isOpen={isDrawerOpen}
        header={appTitle}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
