export const PLACEHOLDER_IMAGE_SRC =
  "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80";

// TODO: https://developers.themoviedb.org/3/configuration/get-api-configuration
export const getImageUrl = (
  src: string,
  config?: { size?: "w500" | "original" }
) =>
  src
    ? `https://image.tmdb.org/t/p/${config?.size ?? "w500"}${src}`
    : PLACEHOLDER_IMAGE_SRC;
