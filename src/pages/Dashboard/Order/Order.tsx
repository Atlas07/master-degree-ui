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
import {
  fetchOrders,
  findOrders,
  OrderActionHistoryType,
  OrderAirConditioningDeviceType,
  OrderFanType,
  OrderMiningCoolingRackType,
  OrderMiningFarmType,
  OrderStatusMap,
  OrderType,
} from '../../../services/api/order';
import {
  ORDER_ACTION_HISTORY_COLUMNS,
  ORDER_AIR_CONDITION_DEVICE_COLUMNS,
  ORDER_AIR_HANDLING_UNIT_COLUMNS,
  ORDER_FAN_COLUMNS,
  ORDER_MINING_COOLING_RACK_COLUMNS,
  ORDER_MINING_FARM_COLUMNS,
  TABLE_COLUMNS,
} from './columns';
import InnerTable from './InnerTable';
import OrderModal from './OrderModal';
import ProcessModal from './ProcessModal';

type CellType = Column<OrderType>;
type ActionCellType = CellProps<OrderType, OrderType>;

const Order = () => {
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isNewModalOpened, setIsNewModalOpened] = useState(false);
  const [isProcessStatusModalOpened, setIsProcessStatusModalOpened] =
    useState(false);

  const columns: CellType[] = useMemo(
    () => [
      {
        id: 'controls',
        Header: '',
        accessor: order => order,
        Cell: (data: ActionCellType) => {
          const { value } = data;

          return (
            <TableControls>
              <Button
                disabled={
                  // @ts-ignore
                  value.status === OrderStatusMap.CANCELLED ||
                  // @ts-ignore
                  value.status === OrderStatusMap.COMPLETED
                }
                variant="outline-primary"
                onClick={() => {
                  setSelectedOrder(value);
                  setIsProcessStatusModalOpened(true);
                }}
              >
                Process
              </Button>
              <Button
                variant="outline-warning"
                onClick={() => {
                  setSelectedOrder(data.value);
                  setIsNewModalOpened(true);
                }}
              >
                Edit
              </Button>
            </TableControls>
          );
        },
      },
      ...(TABLE_COLUMNS as CellType[]),
      {
        Header: 'Action history',
        accessor: 'orderActionHistory',
        Cell: ({ value }) =>
          value.length ? (
            <InnerTable<OrderActionHistoryType>
              data={value}
              columns={ORDER_ACTION_HISTORY_COLUMNS}
            />
          ) : (
            '-'
          ),
      },
      {
        Header: 'Mining Farms',
        accessor: 'orderMiningFarms',
        Cell: ({ value }) =>
          value.length ? (
            <InnerTable<OrderMiningFarmType>
              // @ts-ignore
              data={value.map(order => ({
                amount: order.amount,
                orderDevicePurpose: order.orderDevicePurpose,
                id: order.miningFarm.id,
              }))}
              // @ts-ignore
              columns={ORDER_MINING_FARM_COLUMNS}
            />
          ) : (
            '-'
          ),
      },
      {
        Header: 'Cooling Racks',
        accessor: 'orderMiningCoolingRacks',
        Cell: ({ value }) =>
          value.length ? (
            <InnerTable<OrderMiningCoolingRackType>
              // @ts-ignore
              data={value.map(order => ({
                amount: order.amount,
                orderDevicePurpose: order.orderDevicePurpose,
                id: order.miningCooling.id,
              }))}
              // @ts-ignore
              columns={ORDER_MINING_COOLING_RACK_COLUMNS}
            />
          ) : (
            '-'
          ),
      },
      {
        Header: 'Air Condition Devices',
        accessor: 'orderAirConditioningDevices',
        Cell: ({ value }) =>
          value.length ? (
            <InnerTable<OrderAirConditioningDeviceType>
              // @ts-ignore
              data={value.map(order => ({
                amount: order.amount,
                orderDevicePurpose: order.orderDevicePurpose,
                id: order.airConditioningDevice.id,
              }))}
              // @ts-ignore
              columns={ORDER_AIR_CONDITION_DEVICE_COLUMNS}
            />
          ) : (
            '-'
          ),
      },
      {
        Header: 'Air Handling Units',
        accessor: 'orderAirHandlingUnits',
        Cell: ({ value }) =>
          value.length ? (
            <InnerTable<OrderAirConditioningDeviceType>
              // @ts-ignore
              data={value.map(order => ({
                amount: order.amount,
                orderDevicePurpose: order.orderDevicePurpose,
                id: order.airHandlingUnit.id,
              }))}
              // @ts-ignore
              columns={ORDER_AIR_HANDLING_UNIT_COLUMNS}
            />
          ) : (
            '-'
          ),
      },
      {
        Header: 'Fans',
        accessor: 'orderFanDs',
        Cell: ({ value }) =>
          value.length ? (
            <InnerTable<OrderFanType>
              // @ts-ignore
              data={value.map(order => ({
                amount: order.amount,
                orderDevicePurpose: order.orderDevicePurpose,
                id: order.fan.id,
              }))}
              // @ts-ignore
              columns={ORDER_FAN_COLUMNS}
            />
          ) : (
            '-'
          ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: R.isNil(orders) ? [] : orders,
    });

  const handleSearchChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = () => {
    setError(null);

    findOrders(search)
      .then(setOrders)
      .catch(err => {
        if (err.status === 403) {
          setError({ ...err, message: 'No permissions for this page' });
          return;
        }

        setError(err ?? 'Unexpected error.');
      });
  };

  const refetchOrders = () => {
    setError(null);

    return fetchOrders({ sortBy: 'orderId' })
      .then(setOrders)
      .catch(err => {
        if (err.status === 403) {
          setError({ ...err, message: 'No permissions for this page' });
          return;
        }

        setError(err ?? 'Unexpected error.');
      });
  };

  useEffect(() => {
    refetchOrders();
  }, []);

  return (
    <Wrapper>
      <Header>Order Page</Header>

      <Controls>
        <InputGroupStyled>
          <FormControl
            placeholder="Search for orders"
            aria-label=""
            value={search}
            onChange={handleSearchChange}
          />
          <Button variant="outline-secondary" onClick={() => setSearch('')}>
            Clear
          </Button>
          <Button variant="outline-secondary" onClick={handleSearchSubmit}>
            Search
          </Button>
        </InputGroupStyled>
        <ButtonStyled
          variant="primary"
          onClick={() => setIsNewModalOpened(true)}
        >
          Add new
        </ButtonStyled>
      </Controls>

      {error && <Alert variant="danger">{error.message}</Alert>}

      {!error && orders === null && <Spinner animation="border" />}

      {!error && orders?.length === 0 && (
        <Alert variant="primary">There are no orders.</Alert>
      )}

      {!error && orders?.length !== 0 && (
        <GeneralTable<OrderType>
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          modals={
            <>
              <OrderModal
                isOpen={isNewModalOpened}
                onClose={() => {
                  setIsNewModalOpened(false);
                  setSelectedOrder(null);
                }}
                onSubmit={refetchOrders}
                initialValues={selectedOrder}
              />

              <ProcessModal
                isOpen={isProcessStatusModalOpened}
                onClose={() => {
                  setIsProcessStatusModalOpened(false);
                  setSelectedOrder(null);
                }}
                onSubmit={refetchOrders}
                values={selectedOrder as OrderType}
              />
            </>
          }
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
