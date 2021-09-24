import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import { mapResponseManufacterToState } from '../../utils/mapResponseManufacterToState';
import authApi from './authApi';
import { RequestWithQueryType } from './manufacter';

export const fetchAirHandlingUnits = (
  params?: RequestWithQueryType,
): Promise<AirHandlingUnitType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi
    .get(`${BASE_URL}?${queryParams}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));
};

export const createAirHandlingUnit = (
  params: CreateAirHandlingUnitType,
): Promise<AirHandlingUnitType> =>
  authApi
    .post(BASE_URL, params)
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const updateAirHandlingUnit = (
  params: UpdateAirHandlingUnitType,
): Promise<AirHandlingUnitType> =>
  authApi
    .put(`${BASE_URL}/${params.id}`, R.omit(['id'], params))
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const findAirHandlingUnits = (
  model: AirHandlingUnitType['model'],
): Promise<AirHandlingUnitType[]> =>
  authApi
    .get(`${BASE_URL}/search?name=${model}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));

export const deleteAirHandlingUnit = (
  id: AirHandlingUnitType['id'],
): Promise<void> => authApi.delete(`${BASE_URL}/${id}`);

export type AirHandlingUnitType = {
  id: number;
  model: string;
  power: string;
  noiseLevel: string;
  weight: string;
  size: string;
  voltage: string;
  priceUsd: number;
  webReference: string;
  manufacturer: string; // TODO:
  pipeDiameter: string;
  ventilatedArea: string;
  performance: string;
  createdWhen: string;
  createdBy: string;
  modifiedWhen: string;
  modifiedBy: string;
};

export type CreateAirHandlingUnitType = Partial<
  Omit<AirHandlingUnitType, 'id'>
>;

export type UpdateAirHandlingUnitType = Partial<
  Omit<AirHandlingUnitType, 'id'>
> & {
  id: AirHandlingUnitType['id'];
};

const BASE_URL = '/airHandlingUnits';
