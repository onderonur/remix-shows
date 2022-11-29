import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function ForceDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return null;
}
