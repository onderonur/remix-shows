import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  if (!process.env.API_KEY) {
    return new Response('API_KEY (TMDb API key) env variable is missing.', {
      status: 500,
    });
  }

  const markup = renderToString(
    <RemixServer
      // TODO: Will fix this.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      context={remixContext}
      url={request.url}
    />,
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
