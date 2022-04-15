import { APP_TITLE } from "~/common/CommonUtils";
import { PLACEHOLDER_IMAGE_SRC } from "~/medias/MediaUtils";

export const getMetaTags = (args?: {
  title?: string;
  description?: string;
  image?: string;
}) => {
  const { title, description, image } = args ?? {};
  const metaTags: Record<string, string> = {};

  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  metaTags.title = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  metaTags["og:title"] = metaTitle;
  metaTags["twitter:title"] = metaTitle;

  const metaDescription =
    description ?? `${APP_TITLE} is a TV Show guide built with Remix`;
  metaTags.description = metaDescription;
  metaTags["og:description"] = metaDescription;
  metaTags["twitter:description"] = metaDescription;

  const imageSrc = image ?? PLACEHOLDER_IMAGE_SRC;
  metaTags["og:image"] = imageSrc;
  metaTags["twitter:image"] = imageSrc;

  metaTags["og:site_name"] = APP_TITLE;
  metaTags["twitter:site"] = "@onderonur_";
  metaTags["twitter:card"] = "summary";

  return metaTags;
};
