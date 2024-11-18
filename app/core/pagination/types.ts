export type PaginationResponse<Item = unknown> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Item[];
};
