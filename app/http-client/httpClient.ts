import createHttpError from 'http-errors';

export const httpClient = {
  get: async <T>(
    endpoint: string,
    params?: Record<string, string | number | undefined | null>,
  ): Promise<T> => {
    const url = new URL(`/3${endpoint}`, 'https://api.themoviedb.org');

    url.searchParams.set('api_key', process.env.API_KEY as string);

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, value.toString());
      }
    });

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      throw createHttpError(
        response.status,
        data?.status_message ?? 'Something went wrong',
      );
    }

    return data as T;
  },
};
