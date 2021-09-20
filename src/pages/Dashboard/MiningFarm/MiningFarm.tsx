import * as R from 'ramda';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  FormControl,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { Column, useTable } from 'react-table';
import styled from 'styled-components';

import GeneralTable from '../../../organisms/GeneralTable';
import { ErrorResponse } from '../../../services/api/guestApi';
import {
  fetchMiningFarms,
  MiningFarmType,
} from '../../../services/api/miningFarm';
import { getOptionalTableValue } from '../../../utils';

type MiningFarmCellType = Column<MiningFarmType>;

const MiningFarm = () => {
  const [miningFarms, setMiningFarms] = useState<MiningFarmType[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [selectedMiningFarm, setSelectedMiningFarm] =
    useState<MiningFarmType | null>(null);

  const columns: MiningFarmCellType[] = useMemo(
    () => [
      {
        Header: 'Model',
        accessor: 'model',
      },
      {
        Header: 'Also as knows as',
        accessor: 'alsoAsKnownAs',
        Cell: getOptionalTableValue,
      },
      {
        Header: 'Release date',
        accessor: 'releaseDate',
        Cell: getOptionalTableValue,
      },
      {
        Header: 'Size',
        accessor: 'size',
        Cell: getOptionalTableValue,
      },
      {
        Header: 'Weight',
        accessor: 'weight',
        Cell: getOptionalTableValue,
      },
      // {
      //   Header: 'Noise level',
      //   accessor: 'noiseLevel',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Fans',
      //   accessor: 'fans',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Chip count',
      //   accessor: 'chipCount',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Rack format',
      //   accessor: 'rackFormat',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Cooling',
      //   accessor: 'cooling',
      //   Cell: getOptionalTableValue,
      // },
      {
        Header: 'Power',
        accessor: 'power',
        Cell: getOptionalTableValue,
      },
      // {
      //   Header: 'Voltage',
      //   accessor: 'voltage',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Interface name',
      //   accessor: 'interfaceName',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Memory',
      //   accessor: 'memory',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Temperature',
      //   accessor: 'temperature',
      //   Cell: getOptionalTableValue,
      // },
      // {
      //   Header: 'Humidity',
      //   accessor: 'humidity',
      //   Cell: getOptionalTableValue,
      // },
      {
        Header: 'Price usd',
        accessor: 'priceUsd',
        Cell: getOptionalTableValue,
      },
      // TODO:
      // {
      //   Header: 'Manufacter',
      //   accessor:
      //   Cell: getOptionalTableValue,
      // },
      {
        Header: 'Created when',
        accessor: 'createdWhen',
        Cell: getOptionalTableValue,
      },
      {
        Header: 'Created by',
        accessor: 'createdBy',
        Cell: getOptionalTableValue,
      },
      {
        Header: 'Modified when',
        accessor: 'modifiedWhen',
        Cell: getOptionalTableValue,
      },

      // {
      //   id: 'controls',
      //   Header: '',
      //   accessor: manufacter => manufacter,
      //   Cell: (data: ActionCellType) => (
      //     <TableControls>
      //       <Button
      //         variant="outline-warning"
      //         onClick={() => {
      //           setSelectedManufacter(data.value);
      //           setIsModalOpened(true);
      //         }}
      //       >
      //         Edit
      //       </Button>
      //       <Button
      //         variant="outline-danger"
      //         onClick={() => {
      //           setSelectedManufacter(data.value);
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
      data: R.isNil(miningFarms) ? [] : miningFarms,
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
  };

  const refetchMiningFarms = () => {
    setError(null);

    return fetchMiningFarms().then(setMiningFarms).catch(setError);
  };

  useEffect(() => {
    refetchMiningFarms();
  }, []);

  return (
    <Wrapper>
      <Header>Mining Farm</Header>
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

      {miningFarms === null && <Spinner animation="border" />}

      {miningFarms?.length === 0 && (
        <Alert variant="primary">There is no miningFarms.</Alert>
      )}

      {!error && miningFarms?.length !== 0 && (
        <GeneralTable<MiningFarmType>
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
