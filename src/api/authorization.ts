import * as R from 'ramda';

import guestApi from './guestApi';

export type SignInCreds = {
  username: string;
  password: string;
};

export type SignUpCreds = SignInCreds & {
  email: string;
  role: [string]; // TODO:
};

export type SignInResponse = {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
};

export type SignUpResponse = {
  message: string;
};

export const signIn = (credentials: SignInCreds): Promise<SignInResponse> =>
  guestApi.post('/auth/signin/', credentials).then(R.prop('data'));

export const signUp = (credentials: SignUpCreds): Promise<SignUpResponse> =>
  guestApi.post('/auth/signup/', credentials).then(R.prop('data'));
