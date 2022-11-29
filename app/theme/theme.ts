import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    body: `"Inter", sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        height: 'full',
        '& > div:not(.chakra-portal)': {
          minHeight: 'full',
        },
      },
    },
  },
  // https://chakra-ui.com/docs/components/recipes/floating-labels
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              position: 'absolute',
              backgroundColor: 'chakra-body-bg',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});
