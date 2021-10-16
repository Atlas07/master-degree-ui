import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import { mapResponseManufacterToState } from '../../utils/mapResponseManufacterToState';
import authApi from './authApi';
import { RequestWithQueryType } from './manufacter';

export const fetchMiningFarms = (
  params?: RequestWithQueryType,
): Promise<MiningFarmType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi
    .get(`/miningFarms?${queryParams}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));
};

export const createMiningFarm = (
  params: CreateMiningFarmType,
): Promise<MiningFarmType> =>
  authApi
    .post('/miningFarms/', params)
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const updateMiningFarm = (
  params: UpdateMiningFarmType,
): Promise<MiningFarmType> =>
  authApi
    .put(`/miningFarms/${params.id}`, R.omit(['id'], params))
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const findMiningFarms = (
  model: MiningFarmType['model'],
): Promise<MiningFarmType[]> =>
  authApi
    .get(`/miningFarms/search?name=${model}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));

export const deleteMiningFarm = (id: MiningFarmType['id']): Promise<void> =>
  authApi.delete(`/miningFarms/${id}`);

// TODO: fix optional fields
export type MiningFarmType = {
  id: number;
  model: string;
  alsoAsKnownAs: string;
  releaseDate: string;
  size: string;
  weight: string;
  noiseLevel: string;
  fans: number;
  chipCount: number;
  rackFormat: string;
  cooling: string;
  power: string;
  voltage: string;
  interfaceName: string;
  memory: string;
  temperature: string;
  humidity: string;
  priceUsd: number;
  manufacturer: string;
  createdWhen: string;
  createdBy: string;
  modifiedWhen: string;
  modifiedBy: string;
};

export type CreateMiningFarmType = Omit<
  MiningFarmType,
  'id' | 'createdWhen' | 'createdBy' | 'modifiedWhen' | 'modifiedBy'
>;

export type UpdateMiningFarmType = Omit<
  MiningFarmType,
  'createdWhen' | 'createdBy' | 'modifiedWhen' | 'modifiedBy'
>;
