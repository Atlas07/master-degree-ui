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
import {
  AirHandlingUnitType,
  fetchAirHandlingUnits,
  findAirHandlingUnits,
} from '../../../services/api/airHandlingUtit';
import { ErrorResponse } from '../../../services/api/guestApi';
import { TABLE_COLUMNS } from './columns';
import DeleteModal from './DeleteModal';
import Modal from './Modal';

type CellType = Column<AirHandlingUnitType>;
type ActionCellType = CellProps<AirHandlingUnitType, AirHandlingUnitType>;

const AirHandlingUtit = () => {
  const [devices, setDevices] = useState<AirHandlingUnitType[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [selected, setSelected] = useState<AirHandlingUnitType | null>(null);

  const columns: CellType[] = useMemo(
    () => [
      {
        id: 'controls',
        Header: '',
        accessor: fan => fan,
        Cell: (data: ActionCellType) => (
          <TableControls>
            <Button
              variant="outline-warning"
              onClick={() => {
                setSelected(data.value);
                setIsModalOpened(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setSelected(data.value);
                setIsDeleteModalOpened(true);
              }}
            >
              Delete
            </Button>
          </TableControls>
        ),
      },
      ...(TABLE_COLUMNS as CellType[]),
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: R.isNil(devices) ? [] : devices,
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

    findAirHandlingUnits(search).then(setDevices).catch(setError);
  };

  const refetchFans = () => {
    setError(null);

    return fetchAirHandlingUnits().then(setDevices).catch(setError);
  };

  useEffect(() => {
    refetchFans();
  }, []);

  return (
    <Wrapper>
      <Header>Air conditioning device</Header>
      <Controls>
        <InputGroupStyled>
          <FormControl
            placeholder="Search for devices"
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
        <ButtonStyled variant="primary" onClick={() => setIsModalOpened(true)}>
          Add new
        </ButtonStyled>
      </Controls>

      {error && <Alert variant="danger">{error.message}</Alert>}

      {devices === null && <Spinner animation="border" />}

      {devices?.length === 0 && (
        <Alert variant="primary">There is no fans.</Alert>
      )}

      {!error && devices?.length !== 0 && (
        <GeneralTable<AirHandlingUnitType>
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          modals={
            <>
              <Modal
                isOpen={isModalOpened}
                onClose={() => {
                  setIsModalOpened(false);
                  setSelected(null);
                }}
                onSubmit={refetchFans}
                initialValues={selected}
              />
              <DeleteModal
                isOpen={isDeleteModalOpened}
                onClose={() => {
                  setIsDeleteModalOpened(false);
                  setSelected(null);
                }}
                onSubmit={refetchFans}
                values={selected}
              />
            </>
          }
        />
      )}
    </Wrapper>
  );
};

export default AirHandlingUtit;

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
