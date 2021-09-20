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
  fetchManufacters,
  findManufactures,
  ManufacterType,
} from '../../../services/api/manufacter';
import DeleteManufacterModal from './DeleteManufacterModal';
import ManufacterModal from './ManufacterModal';

type ManufacterCellType = Column<ManufacterType>;
type ActionCellType = CellProps<ManufacterType, ManufacterType>;

const Manufacter = () => {
  const [manufactures, setManufactures] = useState<ManufacterType[] | null>(
    null,
  );
  const [search, setSearch] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [selectedManufacter, setSelectedManufacter] =
    useState<ManufacterType | null>(null);

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
      {
        id: 'controls',
        Header: '',
        accessor: manufacter => manufacter,
        Cell: (data: ActionCellType) => (
          <TableControls>
            <Button
              variant="outline-warning"
              onClick={() => {
                setSelectedManufacter(data.value);
                setIsModalOpened(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setSelectedManufacter(data.value);
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
      data: R.isNil(manufactures) ? [] : manufactures,
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
    findManufactures(search).then(setManufactures).catch(setError);
  };

  const refetchManufactures = () => {
    setError(null);

    return fetchManufacters().then(setManufactures).catch(setError);
  };

  useEffect(() => {
    refetchManufactures();
  }, []);

  return (
    <Wrapper>
      <Header>Manufacter</Header>
      <Controls>
        <InputGroupStyled>
          <FormControl
            placeholder="Search for manufactures"
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

      {manufactures === null && <Spinner animation="border" />}

      {manufactures?.length === 0 && (
        <Alert variant="primary">There is no manufactures.</Alert>
      )}

      {!error && manufactures?.length !== 0 && (
        <GeneralTable<ManufacterType>
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          modals={
            <>
              <ManufacterModal
                isOpen={isModalOpened}
                onClose={() => {
                  setIsModalOpened(false);
                  setSelectedManufacter(null);
                }}
                onSubmit={refetchManufactures}
                initialValues={selectedManufacter}
              />
              <DeleteManufacterModal
                isOpen={isDeleteModalOpened}
                onClose={() => {
                  setIsDeleteModalOpened(false);
                  setSelectedManufacter(null);
                }}
                onSubmit={refetchManufactures}
                values={selectedManufacter}
              />
            </>
          }
        />
      )}
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
