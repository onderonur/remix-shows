import { HttpError } from 'http-errors';

export const createErrorResponse = (err: HttpError | Error) => {
  return new Response(err.message, {
    status: err instanceof HttpError ? err.status : 500,
  });
};
