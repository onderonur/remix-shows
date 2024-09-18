import { httpClient } from '~/core/http-client/http-client';
import type { Genre } from './genres.types';

const getAll = async () => {
  const { genres } = await httpClient.get<{ genres: Genre[] }>(
    `/genre/tv/list`,
  );
  return genres;
};

export const genreService = {
  getAll,
};
