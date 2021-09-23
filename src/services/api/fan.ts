import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import { mapResponseManufacterToState } from '../../utils/mapResponseManufacterToState';
import authApi from './authApi';
import { RequestWithQueryType } from './manufacter';

export const fetchFans = (
  params?: RequestWithQueryType,
): Promise<FanType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi
    .get(`${BASE_URL}?${queryParams}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));
};

export const createFan = (params: CreateFanType): Promise<FanType> =>
  authApi
    .post(BASE_URL, params)
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const updateFan = (params: UpdateFanType): Promise<FanType> =>
  authApi
    .put(`${BASE_URL}/${params.id}`, R.omit(['id'], params))
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const findFans = (model: FanType['model']): Promise<FanType[]> =>
  authApi
    .get(`${BASE_URL}/search?name=${model}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));

export const deleteFan = (id: FanType['id']): Promise<void> =>
  authApi.delete(`${BASE_URL}/${id}`);

export type FanType = {
  id: number;
  model: string;
  power: string;
  noiseLevel: string;
  weight: string;
  size: string;
  voltage: string;
  priceUsd: number;
  webReference: string;
  manufacturer: string; // TODO: ManufacturerType
  airConsumption: string;
  branchPipeSize: string;
  currentConsumption: string;
  createdWhen: string;
  createdBy: string;
  modifiedWhen: string;
  modifiedBy: string;
};

export type CreateFanType = Partial<Omit<FanType, 'id'>>;

export type UpdateFanType = Partial<Omit<FanType, 'id'>> & {
  id: FanType['id'];
};

const BASE_URL = '/fans';
