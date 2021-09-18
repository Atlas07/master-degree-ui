import * as R from 'ramda';

import { getQueryParams } from '../../utils';
import authApi from './authApi';

const DEFAULT_PARAMS = {
  start: 0,
  sortBy: 'id',
  sortType: 'asc',
  count: 100,
};

export const fetchManufacters = (
  params?: RequestWithQueryType,
): Promise<ManufacterType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi.get(`/manufacturers?${queryParams}`).then(R.prop('data'));
};

export const createManufacter = (
  name: ManufacterType['name'],
): Promise<ManufacterType> =>
  authApi.post('/manufacturers/', { name }).then(R.prop('data'));

export const updateManufacter = ({
  id,
  name,
}: UpdateManufacterType): Promise<ManufacterType> =>
  authApi.put(`/manufacturers/${id}/`, { name }).then(R.prop('data'));

export const deleteManufacter = (id: ManufacterType['id']): Promise<void> =>
  authApi.delete(`/manufacturers/${id}`);

export type RequestWithQueryType = {
  start: number;
  sortBy: string;
  sortType: 'asc';
  count: number;
};

export type ManufacterType = {
  id: number;
  name: string;
  createdBy: string;
  createdWhen: Date;
  modifiedBy: string;
  modifiedWhen: Date;
};

export type UpdateManufacterType = Pick<ManufacterType, 'id' | 'name'>;
