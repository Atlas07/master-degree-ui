import { format } from 'date-fns';
import * as R from 'ramda';
import { CellProps } from 'react-table';

import {
  CreateMiningFarmType,
  MiningFarmType,
} from '../../../services/api/miningFarm';
import { getOptionalTableValue } from '../../../utils';

export const initialDefaultValues: CreateMiningFarmType = {
  model: '',
  alsoAsKnownAs: '',
  releaseDate: format(new Date(), 'yyyy-MM'),
  size: '',
  weight: '',
  noiseLevel: '',
  fans: 1,
  chipCount: 1,
  rackFormat: '',
  cooling: '',
  power: '10',
  voltage: '10',
  interfaceName: '',
  memory: '',
  temperature: '',
  humidity: '',
  priceUsd: 100,
  manufacturer: '',
};

const ACTIVE_COLUMNS = [
  'id',
  'model',
  'alsowAsKnownAs',
  'releaseDate',
  'size',
  'weight',
  'power',
  'priceUsd',
  'manufacturer',
  'createdWhen',
  'createdBy',
  'modifiedWhen',
  'modifiedBy',
];

const EXCLUDE_ON_PREMISE_COLUNS = [
  'createdWhen',
  'createdBy',
  'modifiedWhen',
  'modifiedBy',
];

const MODAL_FIELDS = R.keys(initialDefaultValues) as string[];

const COLUMNS = [
  {
    Header: '#',
    accessor: 'id',
  },
  {
    Header: 'Model',
    accessor: 'model',
  },
  {
    Header: 'Also as knows as',
    accessor: 'alsoAsKnownAs',
  },
  {
    Header: 'Release date',
    accessor: 'releaseDate',
  },
  {
    Header: 'Size',
    accessor: 'size',
  },
  {
    Header: 'Weight',
    accessor: 'weight',
  },
  {
    Header: 'Noise level',
    accessor: 'noiseLevel',
  },
  {
    Header: 'Fans',
    accessor: 'fans',
  },
  {
    Header: 'Chip count',
    accessor: 'chipCount',
  },
  {
    Header: 'Rack format',
    accessor: 'rackFormat',
  },
  {
    Header: 'Cooling',
    accessor: 'cooling',
  },
  {
    Header: 'Power',
    accessor: 'power',
  },
  {
    Header: 'Voltage',
    accessor: 'voltage',
  },
  {
    Header: 'Interface name',
    accessor: 'interfaceName',
  },
  {
    Header: 'Memory',
    accessor: 'memory',
  },
  {
    Header: 'Temperature',
    accessor: 'temperature',
  },
  {
    Header: 'Humidity',
    accessor: 'humidity',
  },
  {
    Header: 'Price usd',
    accessor: 'priceUsd',
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
];

export const ALL_COLUMNS = COLUMNS.filter(
  column => !EXCLUDE_ON_PREMISE_COLUNS.includes(column.accessor),
).map(R.assoc('Cell', getOptionalTableValue));

export const TABLE_COLUMNS = COLUMNS.filter(column =>
  ACTIVE_COLUMNS.includes(column.accessor),
).map(R.assoc('Cell', getOptionalTableValue));

export const MODAL_INPUTS = [
  ...COLUMNS.filter(column => MODAL_FIELDS.includes(column.accessor)),
  // {
  //   Header: 'Manufacturer',
  //   accessor: 'manufacturer',
  //   Cell: (data: CellProps<MiningFarmType, MiningFarmType>) => {
  //     console.log(data);
  //     return (
  //       <p>{data.name}</p>
  //     );
  //   },
  // },
];
