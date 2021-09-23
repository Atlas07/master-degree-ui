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
import { FanType, fetchFans, findFans } from '../../../services/api/fan';
import { ErrorResponse } from '../../../services/api/guestApi';
import { TABLE_COLUMNS } from './columns';
import DeleteFanModal from './DeleteFanModal';
import FanModal from './FanModal';

type MiningFarmCellType = Column<FanType>;
type ActionCellType = CellProps<FanType, FanType>;

const MiningFarm = () => {
  const [fans, setFans] = useState<FanType[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [selectedMiningFarm, setSelectedMiningFarm] = useState<FanType | null>(
    null,
  );

  const columns: MiningFarmCellType[] = useMemo(
    () => [
      ...(TABLE_COLUMNS as MiningFarmCellType[]),
      {
        id: 'controls',
        Header: '',
        accessor: fan => fan,
        Cell: (data: ActionCellType) => (
          <TableControls>
            <Button
              variant="outline-warning"
              onClick={() => {
                setSelectedMiningFarm(data.value);
                setIsModalOpened(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setSelectedMiningFarm(data.value);
                setIsDeleteModalOpened(true);
              }}
            >
              Delete
            </Button>
          </TableControls>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: R.isNil(fans) ? [] : fans,
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

    findFans(search).then(setFans).catch(setError);
  };

  const refetchFans = () => {
    setError(null);

    return fetchFans().then(setFans).catch(setError);
  };

  useEffect(() => {
    refetchFans();
  }, []);

  return (
    <Wrapper>
      <Header>Fan</Header>
      <Controls>
        <InputGroupStyled>
          <FormControl
            placeholder="Search for fans"
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

      {fans === null && <Spinner animation="border" />}

      {fans?.length === 0 && <Alert variant="primary">There is no fans.</Alert>}

      {!error && fans?.length !== 0 && (
        <GeneralTable<FanType>
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          modals={
            <>
              <FanModal
                isOpen={isModalOpened}
                onClose={() => {
                  setIsModalOpened(false);
                  setSelectedMiningFarm(null);
                }}
                onSubmit={refetchFans}
                initialValues={selectedMiningFarm}
              />
              <DeleteFanModal
                isOpen={isDeleteModalOpened}
                onClose={() => {
                  setIsDeleteModalOpened(false);
                  setSelectedMiningFarm(null);
                }}
                onSubmit={refetchFans}
                values={selectedMiningFarm}
              />
            </>
          }
        />
      )}
    </Wrapper>
  );
};

export default MiningFarm;

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
