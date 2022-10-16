import { BaseService } from '~/api/BaseService';
import type { Genre } from './GenresTypes';

class GenresService extends BaseService {
  getAll = async () => {
    const { genres } = await this.get<{ genres: Genre[] }>(`/genre/tv/list`);
    return genres;
  };
}

export const genresService = new GenresService();
