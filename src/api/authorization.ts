import * as R from 'ramda';

import guestApi from './guestApi';

export const signIn = (credentials: SignInCreds): Promise<SignInResponse> =>
  guestApi.post('/auth/signin/', credentials).then(R.prop('data'));

export const signUp = (credentials: SignUpCreds): Promise<SignUpResponse> =>
  guestApi.post('/auth/signup/', credentials).then(R.prop('data'));

export type SignInCreds = {
  username: string;
  password: string;
};

export type SignUpCreds = SignInCreds & {
  email: string;
  role: RoleType[]; // TODO:
};

export type SignInResponse = {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: RoleType[];
};

export type SignUpResponse = {
  message: string;
};

export enum Roles {
  ROLE_USER_ADMIN = 'ROLE_USER_ADMIN',
  ROLE_ORDER_ADMIN = 'ROLE_ORDER_ADMIN',
  ROLE_PLAIN_USER = 'ROLE_PLAIN_USER',
  ROLE_CATALOG_ADMIN = 'ROLE_CATALOG_ADMIN',
  ROLE_MAINTENANCE_ADMIN = 'ROLE_MAINTENANCE_ADMIN',
}

export type RoleType = keyof typeof Roles;
