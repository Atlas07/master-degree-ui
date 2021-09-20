export const getQueryParams = (params: { [key: string]: string | number }) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).map(([key, value]) =>
    queryParams.append(key, value.toString()),
  );

  return queryParams.toString();
};

export const DEFAULT_PARAMS = {
  start: 0,
  sortBy: 'id',
  sortType: 'asc',
  count: 100,
};
