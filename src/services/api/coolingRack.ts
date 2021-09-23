import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import { mapResponseManufacterToState } from '../../utils/mapResponseManufacterToState';
import authApi from './authApi';
import { RequestWithQueryType } from './manufacter';

export const fetchCoolingRacks = (
  params?: RequestWithQueryType,
): Promise<CoolingRackType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi
    .get(`${BASE_URL}?${queryParams}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));
};

export const CreateCoolingRack = (
  params: CreateCoolingRackType,
): Promise<CoolingRackType> =>
  authApi
    .post(BASE_URL, params)
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const updateCoolingRack = (
  params: UpdateCoolingRackType,
): Promise<CoolingRackType> =>
  authApi
    .put(`${BASE_URL}/${params.id}`, R.omit(['id'], params))
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const findCoolingRacks = (
  model: CoolingRackType['model'],
): Promise<CoolingRackType[]> =>
  authApi
    .get(`${BASE_URL}/search?name=${model}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));

export const deleteCoolingRack = (id: CoolingRackType['id']): Promise<void> =>
  authApi.delete(`${BASE_URL}/${id}`);

export type CoolingRackType = {
  id: number;
  model: string;
  power: string;
  noiseLevel: string;
  weight: string;
  size: string;
  voltage: string;
  priceUsd: number;
  webReference: string;
  waterCapacity: number;
  optimalWaterConsumption: string;
  maxCoolingPower: string;
  pumpConsumption: string;
  manufacturer: string; // TODO: ManufacterType
  createdWhen: string;
  createdBy: string;
  modifiedWhen: string;
  modifiedBy: string;
};

export type CreateCoolingRackType = Partial<Omit<CoolingRackType, 'id'>>;

export type UpdateCoolingRackType = Partial<Omit<CoolingRackType, 'id'>> & {
  id: CoolingRackType['id'];
};

const BASE_URL = '/miningCoolingRacks';
