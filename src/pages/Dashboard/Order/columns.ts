import * as R from 'ramda';

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
