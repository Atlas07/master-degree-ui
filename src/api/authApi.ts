import axios, { AxiosRequestConfig } from 'axios';
import * as R from 'ramda';

import {
  requestSnakeCased,
  responseCamelCasedError,
  responseCamelCasedSuccess,
} from './guestApi';

const applyToken = (request: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token expired.');
  }

  return R.assocPath(['headers', 'Authorization'], `Bearer ${token}`, request);
};

const authApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestInterceptor = R.pipe(requestSnakeCased, applyToken);

authApi.interceptors.request.use(requestInterceptor);
authApi.interceptors.response.use(
  responseCamelCasedSuccess,
  responseCamelCasedError, // TODO: handle if token expired. Add own handler
);

export default authApi;
