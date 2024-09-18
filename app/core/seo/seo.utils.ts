import type { V2_MetaDescriptor } from '@remix-run/node';
import { APP_TITLE } from '~/core/core.utils';
import { PLACEHOLDER_IMAGE_SRC } from '~/features/medias/medias.utils';

export const getMetaTags = (args?: {
  title?: string;
  description?: string;
  image?: string;
}): V2_MetaDescriptor[] => {
  const { title, description, image } = args ?? {};

  const metaDescriptors: V2_MetaDescriptor[] = [];

  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  metaDescriptors.push({ title: metaTitle });
  metaDescriptors.push({ property: 'og:title', content: metaTitle });
  metaDescriptors.push({ name: 'twitter:title', content: metaTitle });

  const metaDescription =
    description ?? `${APP_TITLE} is a TV Show guide built with Remix`;
  metaDescriptors.push({ name: 'description', content: metaDescription });
  metaDescriptors.push({
    property: 'og:description',
    content: metaDescription,
  });
  metaDescriptors.push({
    name: 'twitter:description',
    content: metaDescription,
  });

  const imageSrc = image ?? PLACEHOLDER_IMAGE_SRC;
  metaDescriptors.push({ property: 'og:image', content: imageSrc });
  metaDescriptors.push({ name: 'twitter:image', content: imageSrc });

  metaDescriptors.push({ property: 'og:site_name', content: APP_TITLE });
  metaDescriptors.push({ name: 'twitter:site', content: '@onderonur_' });
  metaDescriptors.push({ property: 'twitter:card', content: 'summary' });

  return metaDescriptors;
};
