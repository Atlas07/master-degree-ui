import * as R from 'ramda';
import { Column } from 'react-table';

import {
  OrderMiningCoolingRackType,
  OrderMiningFarmType,
} from '../../../services/api/order';
import { getOptionalTableValue } from '../../../utils';

export const COLUMNS = [
  {
    Header: 'Mining Farms',
    accessor: 'onPremiseMiningFarms',
  },
  {
    Header: 'Cooling Racks',
    accessor: 'onPremiseMiningCoolingRacks',
  },
  {
    Header: 'Air Conditioning Devices',
    accessor: 'onPremiseAirConditioningDevices',
  },
  {
    Header: 'Air Handling Units',
    accessor: 'onPremiseAirHandlingUnits',
  },
  {
    Header: 'Fans',
    accessor: 'onPremiseFans',
  },
];

export const TABLE_COLUMNS = COLUMNS.map(
  R.assoc('Cell', getOptionalTableValue),
);

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
