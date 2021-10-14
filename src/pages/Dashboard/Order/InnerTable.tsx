import { useMemo } from 'react';
import { Column, useTable } from 'react-table';

import GeneralTable from '../../../organisms/GeneralTable';

type Props<T extends {}> = {
  data: T[];
  columns: Column<T>[];
};

const InnerTable = <T extends {}>({ data, columns }: Props<T>) => {
  const tableColumns = useMemo(() => columns, [JSON.stringify(columns)]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data,
    });

  return (
    <GeneralTable<T>
      getTableProps={getTableProps}
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
    />
  );
};

export default InnerTable;
