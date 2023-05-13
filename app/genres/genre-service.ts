import { httpClient } from '~/http-client/http-client';
import type { Genre } from './genre-types';

const getAll = async () => {
  const { genres } = await httpClient.get<{ genres: Genre[] }>(
    `/genre/tv/list`,
  );
  return genres;
};

export const genreService = {
  getAll,
};
