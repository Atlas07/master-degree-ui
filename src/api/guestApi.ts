import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import humps from 'humps';

export type GeneralError = {
  message: string;
  path: string;
  status: number;
  timeStamp: Date;
};

export const requestSnakeCased = (
  request: AxiosRequestConfig,
): AxiosRequestConfig => ({
  ...request,
  data: humps.decamelizeKeys(request?.data),
});

export const responseCamelCasedSuccess = (
  response: AxiosResponse,
): AxiosResponse => ({
  ...response,
  data: humps.camelizeKeys(response?.data),
});

export const responseCamelCasedError = (
  error: AxiosError<GeneralError>,
): Promise<GeneralError> =>
  Promise.reject(humps.camelizeKeys(error.response?.data as object));

const guestApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

guestApi.interceptors.request.use(requestSnakeCased);
guestApi.interceptors.response.use(
  responseCamelCasedSuccess,
  responseCamelCasedError,
);

export default guestApi;
