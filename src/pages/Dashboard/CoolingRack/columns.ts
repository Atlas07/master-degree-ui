import { format } from 'date-fns';
import * as R from 'ramda';

// import { CreateMiningFarmType } from '../../../services/api/coolingRack';
import { getOptionalTableValue } from '../../../utils';

// export const initialDefaultValues: CreateMiningFarmType = {
//   model: '',
//   alsoAsKnownAs: '',
//   releaseDate: format(new Date(), 'yyyy-MM'),
//   size: '',
//   weight: '',
//   noiseLevel: '',
//   fans: 1,
//   chipCount: 1,
//   rackFormat: '',
//   cooling: '',
//   power: '10',
//   voltage: '10',
//   interfaceName: '',
//   memory: '',
//   temperature: '',
//   humidity: '',
//   priceUsd: 100,
//   manufacturer: '',
// };

const ACTIVE_COLUMNS = [
  'model',
  'weight',
  'size',
  'power',
  'webReference',
  'priceUsd',
  'createdWhen',
  'createdBy',
  'modifiedWhen',
  'modifiedBy',
];

// const MODAL_FIELDS = R.keys(initialDefaultValues) as string[];

const COLUMNS = [
  {
    Header: 'Model',
    accessor: 'model',
  },
  {
    Header: 'Power',
    accessor: 'power',
  },
  {
    Header: 'Noise level',
    accessor: 'noiseLevel',
  },
  {
    Header: 'Weight',
    accessor: 'weight',
  },
  {
    Header: 'Size',
    accessor: 'size',
  },
  {
    Header: 'Voltage',
    accessor: 'voltage',
  },
  {
    Header: 'Price usd',
    accessor: 'priceUsd',
  },
  {
    Header: 'Web reference',
    accessor: 'webReference',
  },
  {
    Header: 'Water capacity',
    accessor: 'waterCapacity',
  },
  {
    Header: 'Optimal water consumption',
    accessor: 'optimalWaterConsumption',
  },
  {
    Header: 'Max cooling power',
    accessor: 'maxCoolingPower',
  },
  {
    Header: 'pumpConsumption',
    accessor: 'pumpConsumption',
  },
  {
    Header: 'Water capacity',
    accessor: 'waterCapacity',
  },
  {
    Header: 'Manufacter',
    accessor: 'manufacturer',
  },
  {
    Header: 'Created when',
    accessor: 'createdWhen',
  },
  {
    Header: 'Created by',
    accessor: 'createdBy',
  },
  {
    Header: 'Modified when',
    accessor: 'modifiedWhen',
  },
  {
    Header: 'Modified by',
    accessor: 'modifiedBy',
  },
];

export const TABLE_COLUMNS = COLUMNS.filter(column =>
  ACTIVE_COLUMNS.includes(column.accessor),
).map(R.assoc('Cell', getOptionalTableValue));

// export const MODAL_INPUTS = COLUMNS.filter(column =>
//   MODAL_FIELDS.includes(column.accessor),
// );
