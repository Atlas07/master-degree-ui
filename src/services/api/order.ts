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

export const processOrder = (params: {
  orderId: OrderType['orderId'];
  statusTo: OrderType['status'];
  waitingActionUsername: OrderType['waitingActionUsername'];
  actionComment?: string;
}): Promise<OrderType> =>
  authApi.patch(
    `${BASE_URL}/process/${params.orderId}`,
    R.omit(['id'], params),
  );

export const findOrders = (name: OrderType['name']): Promise<OrderType[]> =>
  authApi.get(`${BASE_URL}/namedSearch?name=${name}`).then(R.prop('data'));

export const createOrder = (params: CreateOrderType): Promise<OrderType> =>
  authApi.post(`${BASE_URL}/initiate`, params).then(R.prop('data'));

export type OrderType = {
  orderId: number;
  status: OrderStatusMap;
  orderType: OrderDevicePurposeMap;
  name: string;
  waitingActionUsername: string;
  orderActionHistory: OrderActionHistoryType[];
  orderMiningFarms: OrderMiningFarmType[];
  orderMiningCoolingRacks: OrderMiningCoolingRackType[];
  orderAirConditioningDevices: OrderAirConditioningDeviceType[];
  orderAirHandlingUnits: OrderAirHandlingUnitType[];
  orderFanDs: OrderFanType[];
};

export type CreateOrderType = Pick<
  OrderType,
  'status' | 'orderType' | 'waitingActionUsername'
> & {
  actionComment?: string;
  orderMiningFarms: OrderEntityType<'miningFarmId', number>[];
  orderMiningCoolingRacks: OrderEntityType<'miningCoolingRackId', number>[];
  orderAirConditioningDevices: OrderEntityType<
    'airConditioningDeviceId',
    number
  >[];
  orderAirHandlingUnits: OrderEntityType<'airHandlingUnitId', number>[];
  orderFanDs: OrderEntityType<'fanId', number>[];
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
  orderDevicePurpose: OrderDevicePurposeMap;
};

export enum OrderStatusMap {
  EMPTY = 'Empty',
  PLANNED = 'Planned',
  IN_PROGRESS = 'In progress',
  SUSPENDED = 'Suspended',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
  WAITING_FOR_ACTION = 'Waiting for action',
}

// export type OrderStatusType = typeof OrderStatusMap;

export enum OrderDevicePurposeMap {
  PURCHASE = 'Purchase',
  MAINTENANCE = 'Maintenance',
  INSTALLATION = 'Installation',
  RECONFIGURATION = 'Reconfiguration',
  REPLACING = 'Replacing',
}

// export type OrderDevicePurposeType = typeof OrderDevicePurposeMap;

export type OrderActionHistoryType = {
  id: number;
  actionExecutingDate: string;
  actionExecutionUsername: string;
  statusFrom: OrderStatusMap;
  statusTo: OrderStatusMap;
  actionComment: string;
};

const BASE_URL = '/orders';
