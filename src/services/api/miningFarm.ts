import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import authApi from './authApi';
import { ManufacterType, RequestWithQueryType } from './manufacter';

export const fetchMiningFarms = (
  params?: RequestWithQueryType,
): Promise<MiningFarmType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi.get(`/miningFarms?${queryParams}`).then(R.prop('data'));
};

// TODO: fix optional fields
export type MiningFarmType = {
  id: number;
  model: string;
  alsoAsKnownAs: string;
  releaseDate: Date;
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
  manufacturer: ManufacterType;
  createdWhen: Date;
  createdBy: string;
  modifiedWhen: Date;
  modifiedBy: string;
};
