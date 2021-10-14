import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import authApi from './authApi';
import { RequestWithQueryType } from './manufacter';
import {
  OrderAirConditioningDeviceType,
  OrderAirHandlingUnitType,
  OrderFanType,
  OrderMiningCoolingRackType,
  OrderMiningFarmType,
} from './order';

export const fetchOnPremiseDevices = (
  params?: Partial<RequestWithQueryType>,
): Promise<OnPremiseDeviceType> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi.get(`${BASE_URL}?${queryParams}`).then(R.prop('data'));
};

export type OnPremiseDeviceType = {
  onPremiseMiningFarms: OrderMiningFarmType[];
  onPremiseMiningCoolingRacks: OrderMiningCoolingRackType[];
  onPremiseAirConditioningDevices: OrderAirConditioningDeviceType[];
  onPremiseAirHandlingUnits: OrderAirHandlingUnitType[];
  onPremiseFans: OrderFanType[];
};

const BASE_URL = '/onPremiseDevices';
