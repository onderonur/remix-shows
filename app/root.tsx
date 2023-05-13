import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getMetaTags } from './seo/seo-utils';
import { genreService } from './genres/genre-service';
import {
  Box,
  Button,
  Grid,
  ChakraProvider,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  ColorModeScript,
} from '@chakra-ui/react';
import GenresProvider from './genres/genres-context';
import AppLayout from './layout/app-layout';
import { theme } from './theme/theme';
import { PLACEHOLDER_IMAGE_SRC } from './medias/media-utils';
import { APP_TITLE } from './common/common-utils';
import { APP_HEADER_HEIGHT } from './layout/layout-utils';
import ForceDarkMode from './theme/force-dark-mode';
import { goTry } from 'go-try';
import { createErrorResponse } from './error-handling/error-handling-utils';

export const meta: MetaFunction = () => {
  return {
    ...getMetaTags({ image: PLACEHOLDER_IMAGE_SRC }),
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
  };
};

export const loader = async () => {
  const [err, genres] = await goTry(() => genreService.getAll());

  if (err) {
    throw createErrorResponse(err);
  }

  return json({ genres });
};

function Font() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400..800"
        rel="stylesheet"
      />
    </>
  );
}

function ErrorHandlingBoundary({ message }: { message: string }) {
  return (
    <html>
      <head>
        <title>{message}</title>
        <Meta />
        <Links />
        <Font />
      </head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Grid gridTemplateRows={`${APP_HEADER_HEIGHT} 1fr`}>
            <Grid as="header" placeContent="center" boxShadow="md">
              <Box
                as="h1"
                fontWeight="bold"
                fontSize="2xl"
                color="red.400"
                userSelect="none"
              >
                {APP_TITLE}
              </Box>
            </Grid>
            <Grid
              as="main"
              placeContent="center"
              minHeight="full"
              height="full"
              padding={4}
            >
              <Flex
                direction="column"
                alignItems="center"
                gap={3}
                marginBottom={16}
              >
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>{message}</AlertTitle>
                </Alert>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    window.location.href = '/';
                  }}
                >
                  Back to home page
                </Button>
              </Flex>
            </Grid>
          </Grid>
          <Scripts />
        </ChakraProvider>
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <ErrorHandlingBoundary message={`${caught.status} | ${caught.data}`} />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorHandlingBoundary message={error.message} />;
}

export default function App() {
  const { genres } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <Font />
      </head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <ForceDarkMode />
          <GenresProvider genres={genres}>
            <AppLayout>
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </AppLayout>
          </GenresProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
