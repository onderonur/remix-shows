export class BaseService {
  get = async <T>(
    endpoint: string,
    params?: Record<string, string | number | undefined | null>
  ): Promise<T> => {
    const searchParams = new URLSearchParams({
      api_key: process.env.API_KEY as string,
    });

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.set(key, value?.toString());
      }
    });

    let url = `https://api.themoviedb.org/3${endpoint}`;
    const queryString = searchParams.toString();
    if (queryString) {
      url = `${url}?${queryString}`;
    }

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.status_message ?? "Something went wrong");
    }

    return data as T;
  };
}
