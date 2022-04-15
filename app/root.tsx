import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { getMetaTags } from "./seo/SeoUtils";
import type { Genre } from "./genres/GenresTypes";
import { genresService } from "./genres/GenresService";
import {
  Box,
  Button,
  Grid,
  ChakraProvider,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import GenresProvider from "./genres/GenresContext";
import AppLayout from "./layout/AppLayout";
import { theme } from "./theme/theme";
import { PLACEHOLDER_IMAGE_SRC } from "./medias/MediaUtils";
import { APP_TITLE } from "./common/CommonUtils";
import { APP_HEADER_HEIGHT } from "./layout/AppHeader";

export const meta: MetaFunction = () => {
  return {
    ...getMetaTags({ image: PLACEHOLDER_IMAGE_SRC }),
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };
};

export type RootLoaderData = { genres: Genre[] };

export const loader: LoaderFunction = async (): Promise<RootLoaderData> => {
  const genres = await genresService.getAll();
  return { genres };
};

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html>
      <head>
        <title>{error.message}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <Grid gridTemplateRows={`${APP_HEADER_HEIGHT} 1fr`}>
            <Grid as="header" placeContent="center" boxShadow="md">
              <Box
                as="h1"
                fontWeight="bold"
                fontSize="2xl"
                color="red.500"
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
                  <AlertTitle>{error.message}</AlertTitle>
                </Alert>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    window.location.href = "/";
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

export default function App() {
  const { genres } = useLoaderData<RootLoaderData>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
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
      </body>
    </html>
  );
}
