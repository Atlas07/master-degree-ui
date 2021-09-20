import { Table } from 'react-bootstrap';
import { UseTableInstanceProps } from 'react-table';

type Props<T extends {}> = Pick<
  UseTableInstanceProps<T>,
  'getTableProps' | 'getTableBodyProps' | 'headerGroups' | 'rows' | 'prepareRow'
> & {
  modals?: JSX.Element;
  className?: string;
};

const GeneralTable = <T extends {}>({
  getTableProps,
  getTableBodyProps,
  rows,
  headerGroups,
  prepareRow,
  modals,
  className = '',
}: Props<T>) => (
  <div>
    <Table className={className} striped bordered hover {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>

    {modals}
  </div>
);

export default GeneralTable;
