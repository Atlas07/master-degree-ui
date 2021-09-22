import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import * as R from 'ramda';

import { history } from '../../App';
import { Pages } from '../../constants/pages';
import userService from '../userService';
import {
  ErrorResponse,
  requestSnakeCased,
  responseCamelCasedError,
  responseCamelCasedSuccess,
  ValidationErrorResponse,
} from './guestApi';

const applyToken = (request: AxiosRequestConfig): AxiosRequestConfig => {
  const user = userService.get();

  if (!user?.token) {
    history.push(Pages.LOGIN);
    throw new Error('Token expired.'); // TODO: handle on App errors with toasts
  }

  return R.assocPath(
    ['headers', 'Authorization'],
    `Bearer ${user.token}`,
    request,
  );
};

const handleUnauthorizedUser = (
  error: AxiosError<ErrorResponse | ValidationErrorResponse>,
) => {
  if (error.response?.status === 401) {
    userService.remove();
    history.push(Pages.LOGIN);
  }

  return error;
};

const authApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestInterceptor = R.pipe(applyToken);

authApi.interceptors.request.use(requestInterceptor);
authApi.interceptors.response.use(
  responseCamelCasedSuccess,
  R.pipe(handleUnauthorizedUser, responseCamelCasedError),
);

export default authApi;
