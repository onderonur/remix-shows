import type { Id } from '~/common/common-types';
import type { PaginationResponse } from './pagination-types';
import _ from 'lodash';

export const checkHasNextPage = (paginated: PaginationResponse) => {
  const { page, total_pages } = paginated;
  return page < total_pages;
};

export const getNextPage = (paginated: PaginationResponse) => {
  if (checkHasNextPage(paginated)) {
    return paginated.page + 1;
  }
  return null;
};

export const getAllPageResults = <T extends { id: Id }>(
  allPages: PaginationResponse<T>[],
): T[] => {
  return _.uniqBy(
    allPages.flatMap((page) => page.results) ?? [],
    (item) => item.id,
  );
};
