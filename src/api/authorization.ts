import * as R from 'ramda';

import guestApi from './guestApi';

export type CredentialsReq = {
  username: string;
  password: string;
};

type SignInResponse = {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
};

export const signIn = (credentials: CredentialsReq): Promise<SignInResponse> =>
  guestApi.post('/auth/signin/', credentials).then(R.prop('data'));
