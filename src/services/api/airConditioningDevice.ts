import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import { mapResponseManufacterToState } from '../../utils/mapResponseManufacterToState';
import authApi from './authApi';
import { RequestWithQueryType } from './manufacter';

export const fetchAirConditioningDevices = (
  params?: RequestWithQueryType,
): Promise<AirConditioningDeviceType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi
    .get(`${BASE_URL}?${queryParams}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));
};

export const createAirConditioningDevice = (
  params: CreateAirConditioningDeviceType,
): Promise<AirConditioningDeviceType> =>
  authApi
    .post(BASE_URL, params)
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const updateAirConditioningDevice = (
  params: UpdateAirConditioningDeviceType,
): Promise<AirConditioningDeviceType> =>
  authApi
    .put(`${BASE_URL}/${params.id}`, R.omit(['id'], params))
    .then(R.prop('data'))
    .then(mapResponseManufacterToState);

export const findAirConditioningDevices = (
  model: AirConditioningDeviceType['model'],
): Promise<AirConditioningDeviceType[]> =>
  authApi
    .get(`${BASE_URL}/search?name=${model}`)
    .then(R.prop('data'))
    .then(R.map(mapResponseManufacterToState));

export const deleteAirConditioningDevice = (
  id: AirConditioningDeviceType['id'],
): Promise<void> => authApi.delete(`${BASE_URL}/${id}`);

export type AirConditioningDeviceType = {
  id: number;
  model: string;
  power: string;
  noiseLevel: string;
  weight: string;
  size: string;
  voltage: string;
  priceUsd: number;
  webReference: string;
  airConditioningDevice: DeviceType;
  coolingCapacity: string;
  roomAreaSquareM: number;
  manufacturer: string; // TODO: ManufacturerType
  createdWhen: string;
  createdBy: string;
  modifiedWhen: string;
  modifiedBy: string;
};

export type DeviceType = 'SPLIT_SYSTEM' | 'CANAL';

export type CreateAirConditioningDeviceType = Partial<
  Omit<AirConditioningDeviceType, 'id'>
>;

export type UpdateAirConditioningDeviceType = Partial<
  Omit<AirConditioningDeviceType, 'id'>
> & {
  id: AirConditioningDeviceType['id'];
};

const BASE_URL = '/airConditioningDevices';
