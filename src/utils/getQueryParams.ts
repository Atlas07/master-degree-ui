export const getQueryParams = (params: { [key: string]: string | number }) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).map(([key, value]) =>
    queryParams.append(key, value.toString()),
  );

  return queryParams.toString();
};
