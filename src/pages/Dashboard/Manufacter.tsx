import * as R from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  FormControl,
  InputGroup,
  Spinner,
  Table,
} from 'react-bootstrap';
import { Column, useTable } from 'react-table';
import styled from 'styled-components';

import { ErrorResponse } from '../../services/api/guestApi';
import {
  fetchManufacters,
  ManufacterType,
} from '../../services/api/manufacter';

type ManufacterCellType = Column<ManufacterType>;

const Manufacter = () => {
  const [manufactures, setManufactures] = useState<ManufacterType[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const columns: ManufacterCellType[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Created by',
        accessor: 'createdBy',
      },
      {
        Header: 'Created when',
        accessor: 'createdWhen',
      },
      {
        Header: 'Modified by',
        accessor: 'modifiedBy',
        Cell: ({ value }) => (R.isEmpty(value) ? '-' : value),
      },
      {
        Header: 'modified when',
        accessor: 'modifiedWhen',
        Cell: ({ value }) => (R.isEmpty(value) ? '-' : value),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: manufactures,
    });

  useEffect(() => {
    fetchManufacters().then(setManufactures).catch(setError);
  }, []);

  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!manufactures.length) {
    return <Spinner animation="border" />;
  }

  return (
    <Wrapper>
      <Header>Manufacter</Header>
      <Controls>
        <InputGroupStyled>
          <FormControl placeholder="Search for manufactures" aria-label="" />
          <Button variant="outline-secondary">Clear</Button>
          <Button variant="outline-secondary">Search</Button>
        </InputGroupStyled>
        <ButtonStyled variant="primary">Add new</ButtonStyled>
      </Controls>

      <TableStyled striped bordered hover {...getTableProps()}>
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
      </TableStyled>
    </Wrapper>
  );
};

export default Manufacter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const Header = styled.h1`
  margin-bottom: 45px;
`;

const TableStyled = styled(Table)``;

const ButtonStyled = styled(Button)`
  width: 150px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 7px;
`;

const InputGroupStyled = styled(InputGroup)`
  width: 70%;
  /* margin-right: 50px; */
`;
