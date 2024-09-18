import { createContext, useContext } from 'react';
import type { Genre } from '../genres.types';

type GenresContextValue = Genre[];

const GenresContext = createContext({} as GenresContextValue);

export const useGenres = () => {
  return useContext(GenresContext);
};

type GenresProviderProps = React.PropsWithChildren<{ genres: Genre[] }>;

export default function GenresProvider({
  genres,
  children,
}: GenresProviderProps) {
  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
}
