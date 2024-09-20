import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useLocation } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import AppNavigation from './app-navigation';

type AppDrawerProps = {
  isOpen: boolean;
  header: React.ReactNode;
  onClose: VoidFunction;
};

export default function AppDrawer({ isOpen, header, onClose }: AppDrawerProps) {
  const location = useLocation();
  const isDrawerDisabled = useBreakpointValue({ base: false, lg: true });
  const savedCallbackRef = useRef(onClose);

  useEffect(() => {
    savedCallbackRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    savedCallbackRef.current();
  }, [location]);

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
