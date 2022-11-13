import { httpClient } from '~/http-client/httpClient';
import type { Genre } from './GenresTypes';

const getAll = async () => {
  const { genres } = await httpClient.get<{ genres: Genre[] }>(
    `/genre/tv/list`,
  );
  return genres;
};

export const genresService = {
  getAll,
};
