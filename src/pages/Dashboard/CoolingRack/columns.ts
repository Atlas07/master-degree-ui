import * as R from 'ramda';

import { getOptionalTableValue } from '../../../utils';

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

const MODAL_FIELDS_TO_HIDE = [
  'id',
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

export const ALL_COLUMNS = COLUMNS.filter(
  column => !EXCLUDE_ON_PREMISE_COLUNS.includes(column.accessor),
).map(R.assoc('Cell', getOptionalTableValue));

export const TABLE_COLUMNS = COLUMNS.filter(column =>
  ACTIVE_COLUMNS.includes(column.accessor),
).map(R.assoc('Cell', getOptionalTableValue));

export const MODAL_INPUTS = COLUMNS.filter(
  column => !MODAL_FIELDS_TO_HIDE.includes(column.accessor),
);

export const initialDefaultValues = MODAL_INPUTS.reduce(
  (acc, value) => ({ ...acc, [value.accessor]: '' }),
  {},
);
