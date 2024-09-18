import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import type { V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getMetaTags } from './core/seo/seo.utils';
import { genreService } from '~/features/genres/genres.service';
import {
  Box,
  Button,
  Grid,
  ChakraProvider,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import GenresProvider from '~/features/genres/components/genres-context';
import AppLayout from './core/layout/components/app-layout';
import { theme } from './core/theme/theme';
import { PLACEHOLDER_IMAGE_SRC } from './features/medias/medias.utils';
import { APP_TITLE } from './core/core.utils';
import { APP_HEADER_HEIGHT } from './core/layout/layout.utils';
import { goTry } from 'go-try';
import { createErrorResponse } from './core/errors/errors.utils';
import { withEmotionCache } from '@emotion/react';
import { useContext, useEffect } from 'react';
import {
  ClientStyleContext,
  ServerStyleContext,
} from './core/styling/components/style-context';

export const meta: V2_MetaFunction = () => {
  return getMetaTags({ image: PLACEHOLDER_IMAGE_SRC });
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

// https://chakra-ui.com/getting-started/remix-guide
type DocumentProps = React.PropsWithChildren<{ title?: string }>;

const Document = withEmotionCache(
  ({ title, children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const { tags } = emotionCache.sheet;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html
        lang="en"
        // https://chakra-ui.com/getting-started/remix-guide#add-colormodemanager
        data-theme="dark"
        style={{ colorScheme: 'dark' }}
      >
        <head>
          {title && <title>{title}</title>}
          {/* https://remix.run/docs/en/main/route/meta#global-meta */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <Font />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  },
);

function ErrorHandlingBoundary({ message }: { message: string }) {
  return (
    <Document title={message}>
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
    </Document>
  );
}

// https://remix.run/docs/en/main/start/v2#catchboundary-and-errorboundary
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorHandlingBoundary message={`${error.status} - ${error.data}`} />
    );
  }

  return (
    <ErrorHandlingBoundary
      message={error instanceof Error ? error?.message : 'Something went wrong'}
    />
  );
}

export default function App() {
  const { genres } = useLoaderData<typeof loader>();

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <GenresProvider genres={genres}>
          <AppLayout>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </AppLayout>
        </GenresProvider>
      </ChakraProvider>
    </Document>
  );
}
