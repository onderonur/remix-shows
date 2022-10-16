import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useLocation } from '@remix-run/react';
import { useEffect } from 'react';
import AppNavigation from './AppNavigation';

type AppDrawerProps = {
  isOpen: boolean;
  header: React.ReactNode;
  onClose: VoidFunction;
};

export default function AppDrawer({ isOpen, header, onClose }: AppDrawerProps) {
  const location = useLocation();
  const isDrawerDisabled = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  if (isDrawerDisabled) {
    return null;
  }

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay display={{ lg: 'none' }} />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{header}</DrawerHeader>
        <DrawerBody padding={0}>
          <AppNavigation />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
