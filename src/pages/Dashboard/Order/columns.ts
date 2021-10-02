import * as R from 'ramda';
import { Column } from 'react-table';

import {
  OrderActionHistoryType,
  OrderAirHandlingUnitType,
  OrderFanType,
  OrderMiningCoolingRackType,
  OrderMiningFarmType,
} from '../../../services/api/order';
import { getOptionalTableValue } from '../../../utils';

const ACTIVE_COLUMNS = [
  'orderId',
  'status',
  'orderType',
  'name',
  'waitingActionUsername',
];

// const MODAL_FIELDS_TO_HIDE = [
//   'id',
//   'createdWhen',
//   'createdBy',
//   'modifiedWhen',
//   'modifiedBy',
// ];

const COLUMNS = [
  {
    Header: '#',
    accessor: 'orderId',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Type',
    accessor: 'orderType',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Waiting action from',
    accessor: 'waitingActionUsername',
  },
  {
    Header: 'History',
    accessor: 'orderActionHistory',
  },

  {
    Header: 'Mining Farms',
    accessor: 'orderMiningFarms',
  },
  {
    Header: 'Cooling Racks',
    accessor: 'orderMiningCoolingRacks',
  },
  {
    Header: 'Air Conditioning Devices',
    accessor: 'orderAirConditioningDevices',
  },
  {
    Header: 'Air Handling Units',
    accessor: 'orderAirHandlingUnits',
  },
  {
    Header: 'Fans',
    accessor: 'orderFanDs',
  },
];

export const TABLE_COLUMNS = COLUMNS.filter(column =>
  ACTIVE_COLUMNS.includes(column.accessor),
).map(R.assoc('Cell', getOptionalTableValue));

export const ORDER_ACTION_HISTORY_COLUMNS: Column<OrderActionHistoryType>[] = [
  {
    Header: '#',
    accessor: 'id',
  },
  {
    Header: 'Executing date',
    accessor: 'actionExecutingDate',
  },
  {
    Header: 'Execution username',
    accessor: 'actionExecutionUsername',
  },
  {
    Header: 'Status from',
    accessor: 'statusFrom',
  },
  {
    Header: 'Status to',
    accessor: 'statusTo',
  },
];

export const ORDER_MINING_FARM_COLUMNS = [
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Device purpose',
    accessor: 'orderDevicePurpose',
  },
  {
    Header: 'Mining Farm #',
    accessor: 'id',
  },
].map(R.assoc('Cell', getOptionalTableValue)) as Column<
  OrderMiningFarmType & { id: number }
>[];

export const ORDER_MINING_COOLING_RACK_COLUMNS: Column<
  OrderMiningCoolingRackType & { id: number }
>[] = [
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Device purpose',
    accessor: 'orderDevicePurpose',
  },
  {
    Header: 'Cooling Rack #',
    accessor: 'id',
  },
];

export const ORDER_AIR_CONDITION_DEVICE_COLUMNS: Column<
  OrderMiningCoolingRackType & { id: number }
>[] = [
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Device purpose',
    accessor: 'orderDevicePurpose',
  },
  {
    Header: 'Air device #',
    accessor: 'id',
  },
];

export const ORDER_AIR_HANDLING_UNIT_COLUMNS: Column<
  OrderAirHandlingUnitType & { id: number }
>[] = [
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Device purpose',
    accessor: 'orderDevicePurpose',
  },
  {
    Header: 'Air handling utint #',
    accessor: 'id',
  },
];

export const ORDER_FAN_COLUMNS: Column<OrderFanType & { id: number }>[] = [
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Device purpose',
    accessor: 'orderDevicePurpose',
  },
  {
    Header: 'Fan #',
    accessor: 'id',
  },
];
