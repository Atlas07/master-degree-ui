import * as R from 'ramda';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  FormControl,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { CellProps, Column, useTable } from 'react-table';
import styled from 'styled-components';

import GeneralTable from '../../../organisms/GeneralTable';
import { ErrorResponse } from '../../../services/api/guestApi';
import { fetchOrders, OrderType } from '../../../services/api/order';
import { TABLE_COLUMNS } from './columns';

type CellType = Column<OrderType>;
type ActionCellType = CellProps<OrderType, OrderType>;

const Order = ({}) => {
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const columns: CellType[] = useMemo(
    () => [
      ...(TABLE_COLUMNS as CellType[]),
      // {
      //   id: 'controls',
      //   Header: '',
      //   accessor: fan => fan,
      //   Cell: (data: ActionCellType) => (
      //     <TableControls>
      //       <Button
      //         variant="outline-warning"
      //         onClick={() => {
      //           setSelectedMiningFarm(data.value);
      //           setIsModalOpened(true);
      //         }}
      //       >
      //         Edit
      //       </Button>
      //       <Button
      //         variant="outline-danger"
      //         onClick={() => {
      //           setSelectedMiningFarm(data.value);
      //           setIsDeleteModalOpened(true);
      //         }}
      //       >
      //         Delete
      //       </Button>
      //     </TableControls>
      //   ),
      // },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: R.isNil(orders) ? [] : orders,
    });

  const refetchOrders = () => {
    setError(null);

    return fetchOrders({ sortBy: 'orderId' }).then(setOrders).catch(setError);
  };

  useEffect(() => {
    refetchOrders();
  }, []);

  return (
    <Wrapper>
      <Header>Order Page</Header>

      {error && <Alert variant="danger">{error.message}</Alert>}

      {orders === null && <Spinner animation="border" />}

      {orders?.length === 0 && (
        <Alert variant="primary">There are no orders.</Alert>
      )}

      {!error && orders?.length !== 0 && (
        <GeneralTable<OrderType>
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
        />
      )}
    </Wrapper>
  );
};

export default Order;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const Header = styled.h1`
  margin-bottom: 45px;
`;

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

const TableControls = styled.div`
  display: flex;
  justify-content: space-between;
`;
