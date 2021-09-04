import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import humps from 'humps';

export type ResponseData = {
  [key: string]: any;
};

export type ErrorResponse = {
  status: number;
  data: {
    [key: string]: any;
  };
};

export type ReqInterceptorType = (
  request: AxiosRequestConfig,
) => Promise<AxiosRequestConfig>;

export const requestSnakeCased: ReqInterceptorType = async request => {
  const data = request?.data;
  const snakeCasedData = humps.decamelizeKeys(data);
  return { ...request, data: snakeCasedData };
};

export const responseCamelCasedSuccess = (
  response: AxiosResponse,
): AxiosResponse => {
  const data: ResponseData = response?.data;
  const camelCasedData: ResponseData = humps.camelizeKeys(data);
  return { ...response, data: camelCasedData };
};

export const responseCamelCasedError = (
  error: AxiosError,
): Promise<ErrorResponse> => {
  const data: ResponseData = error.response?.data;
  const camelCasedData = humps.camelizeKeys(data);
  const errorResponse = {
    status: error.response?.status,
    data: camelCasedData,
  };

  return Promise.reject(errorResponse);
};

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
