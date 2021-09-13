import * as R from 'ramda';

import authApi from './authApi';

export const fetchManufacters = (): Promise<ManufacterType[]> =>
  authApi
    .get('/manufacturers?start=0&sortBy=id&sortType=asc')
    .then(R.prop('data'));

export type ManufacterType = {
  id: number;
  name: string;
  createdBy: string;
  createdWhen: string;
  modifiedBy: string;
  modifiedWhen: string;
};
