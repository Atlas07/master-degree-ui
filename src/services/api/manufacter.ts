import * as R from 'ramda';

import authApi from './authApi';

export const fetchManufacters = (): Promise<ManufacterType[]> =>
  authApi
    .get('/manufacturers?start=0&sortBy=id&sortType=asc&count=100')
    .then(R.prop('data'));

export const createManufacter = (
  name: ManufacterType['name'],
): Promise<ManufacterType> =>
  authApi.post('/manufacturers/', { name }).then(R.prop('data'));

export const updateManufacter = ({
  id,
  name,
}: UpdateManufacterType): Promise<ManufacterType> =>
  authApi.put(`/manufacturers/${id}/`, { name }).then(R.prop('data'));

export type ManufacterType = {
  id: number;
  name: string;
  createdBy: string;
  createdWhen: string;
  modifiedBy: string;
  modifiedWhen: string;
};

export type UpdateManufacterType = Pick<ManufacterType, 'id' | 'name'>;
