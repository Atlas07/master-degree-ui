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

const BASE_URL = '/miningCoolingRacks';
