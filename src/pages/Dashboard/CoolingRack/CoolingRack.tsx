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
  CoolingRackType,
  fetchCoolingRacks,
  findCoolingRacks,
} from '../../../services/api/coolingRack';
import { ErrorResponse } from '../../../services/api/guestApi';
import { TABLE_COLUMNS } from './columns';
import CoolingRackModal from './CoolingRackModal';
import DeleteCoolingRackModal from './DeleteCoolingRackModal';

type MiningFarmCellType = Column<CoolingRackType>;
type ActionCellType = CellProps<CoolingRackType, CoolingRackType>;

const CoolingRack = () => {
  const [coolingRacks, setCoolingRacks] = useState<CoolingRackType[] | null>(
    null,
  );
  const [search, setSearch] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [selectedCoolingRack, setSelectedCoolingRack] =
    useState<CoolingRackType | null>(null);

  const columns: MiningFarmCellType[] = useMemo(
    () => [
      {
        id: 'controls',
        Header: '',
        accessor: miningFarm => miningFarm,
        Cell: (data: ActionCellType) => (
          <TableControls>
            <Button
              variant="outline-warning"
              onClick={() => {
                setSelectedCoolingRack(data.value);
                setIsModalOpened(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setSelectedCoolingRack(data.value);
                setIsDeleteModalOpened(true);
              }}
            >
              Delete
            </Button>
          </TableControls>
        ),
      },
      ...(TABLE_COLUMNS as MiningFarmCellType[]),
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: R.isNil(coolingRacks) ? [] : coolingRacks,
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

    findCoolingRacks(search).then(setCoolingRacks).catch(setError);
  };

  const refetchCoolingRacks = () => {
    setError(null);

    return fetchCoolingRacks().then(setCoolingRacks).catch(setError);
  };

  useEffect(() => {
    refetchCoolingRacks();
  }, []);

  return (
    <Wrapper>
      <Header>Cooling Rack</Header>
      <Controls>
        <InputGroupStyled>
          <FormControl
            placeholder="Search for mining farm"
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

      {coolingRacks === null && <Spinner animation="border" />}

      {coolingRacks?.length === 0 && (
        <Alert variant="primary">There is no miningFarms.</Alert>
      )}

      {!error && coolingRacks?.length !== 0 && (
        <GeneralTable<CoolingRackType>
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          modals={
            <>
              <CoolingRackModal
                isOpen={isModalOpened}
                onClose={() => {
                  setIsModalOpened(false);
                  setSelectedCoolingRack(null);
                }}
                onSubmit={refetchCoolingRacks}
                initialValues={selectedCoolingRack}
              />
              <DeleteCoolingRackModal
                isOpen={isDeleteModalOpened}
                onClose={() => {
                  setIsDeleteModalOpened(false);
                  setSelectedCoolingRack(null);
                }}
                onSubmit={refetchCoolingRacks}
                values={selectedCoolingRack}
              />
            </>
          }
        />
      )}
    </Wrapper>
  );
};

export default CoolingRack;

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
