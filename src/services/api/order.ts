import * as R from 'ramda';

import { DEFAULT_PARAMS, getQueryParams } from '../../utils';
import { AirConditioningDeviceType } from './airConditioningDevice';
import { AirHandlingUnitType } from './airHandlingUtit';
import authApi from './authApi';
import { CoolingRackType } from './coolingRack';
import { FanType } from './fan';
import { RequestWithQueryType } from './manufacter';
import { MiningFarmType } from './miningFarm';

export const fetchOrders = (
  params?: Partial<RequestWithQueryType>,
): Promise<OrderType[]> => {
  const queryParams = getQueryParams({ ...DEFAULT_PARAMS, ...params });

  return authApi.get(`${BASE_URL}?${queryParams}`).then(R.prop('data'));
};

export type OrderType = {
  orderId: number;
  status: OrderStatusType;
  orderType: OrderDevicePurposeType;
  name: string;
  waitingActionUsername: string;
  orderActionHistory: OrderActionHistoryType[];
  orderMiningFarms: OrderMiningFarmType[];
  orderMiningCoolingRacks: OrderMiningCoolingRackType[];
  orderAirConditioningDevices: OrderAirConditioningDeviceType[];
  orderAirHandlingUnits: OrderAirHandlingUnitType[];
  orderFanDs: OrderFanType[];
};

export type OrderMiningFarmType = OrderEntityType<'miningFarm', MiningFarmType>;

export type OrderMiningCoolingRackType = OrderEntityType<
  'miningCooling',
  CoolingRackType
>;

export type OrderAirConditioningDeviceType = OrderEntityType<
  'airConditioningDevice',
  AirConditioningDeviceType
>;

export type OrderAirHandlingUnitType = OrderEntityType<
  'airHandlingUnit',
  AirHandlingUnitType
>;

export type OrderFanType = OrderEntityType<'fan', FanType>;

export type OrderEntityType<K extends string, T> = Record<K, T> & {
  amount: number;
  orderDevicePurpose: OrderDevicePurposeType;
};

export type OrderStatusType =
  | 'EMPTY'
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'WAITING_FOR_ACTION';

export type OrderDevicePurposeType =
  | 'PURCHASE'
  | 'MAINTENANCE'
  | 'INSTALLATION'
  | 'RECONFIGURATION'
  | 'REPLACING';

export type OrderActionHistoryType = {
  id: number;
  actionExecutingDate: string;
  actionExecutionUsername: string;
  statusFrom: OrderStatusType;
  statusTo: OrderStatusType;
  actionComment: string;
};

const BASE_URL = '/orders';
