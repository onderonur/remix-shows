import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { APP_TITLE } from '~/common/CommonUtils';
import AppTitle from '~/layout/AppTitle';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';
import AppNavigation from './AppNavigation';
import {
  APP_DRAWER_WIDTH,
  APP_FOOTER_HEIGHT,
  APP_HEADER_HEIGHT,
} from './LayoutUtils';

type AppLayoutProps = React.PropsWithChildren<{}>;

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
        'appSideBar appFooter'
        `}
        gridTemplateRows={`${APP_HEADER_HEIGHT} 1fr ${APP_FOOTER_HEIGHT}`}
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
        <GridItem gridArea="appFooter">
          <Box
            height={APP_FOOTER_HEIGHT}
            background="chakra-subtle-bg"
            alignItems="center"
            padding={4}
            as="footer"
          >
            {APP_TITLE} &copy; {new Date().getFullYear()}
          </Box>
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
