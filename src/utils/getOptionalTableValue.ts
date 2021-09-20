import * as R from 'ramda';
import { CellProps } from 'react-table';

type ActionCellType = CellProps<any, any>;

export const getOptionalTableValue: (value: ActionCellType) => string = R.pipe(
  R.prop('value'),
  R.when(R.isEmpty, R.always('-')),
);
