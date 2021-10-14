import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

import { AirConditioningDeviceType } from '../../../services/api/airConditioningDevice';
import { AirHandlingUnitType } from '../../../services/api/airHandlingUtit';
import { CoolingRackType } from '../../../services/api/coolingRack';
import { FanType } from '../../../services/api/fan';
import { ErrorResponse } from '../../../services/api/guestApi';
import { MiningFarmType } from '../../../services/api/miningFarm';
import {
  fetchOnPremiseDevices,
  OnPremiseDeviceType,
} from '../../../services/api/onPremiseDevice';
import { OrderDevicePurposeMap } from '../../../services/api/order';
import { ALL_COLUMNS as ALL_CONDITIONING_DEVS } from '../AirConditioningDevices/columns';
import { ALL_COLUMNS as ALL_HANDLING_UNITS } from '../AirHandlingUnit/columns';
import { ALL_COLUMNS as ALL_COOLING_RACKS } from '../CoolingRack/columns';
import { ALL_COLUMNS as ALL_FANS } from '../Fan/columns';
import { ALL_COLUMNS as ALL_MINING_FARMS } from '../MiningFarm/columns';
import InnerTable from '../Order/InnerTable';

enum DeviceRequestMap {
  onPremiseMiningFarms = 'miningFarm',
  onPremiseMiningCoolingRacks = 'miningCoolingRack',
  onPremiseAirConditioningDevices = 'airConditioningDevice',
  onPremiseAirHandlingUnits = 'airHandlingUnit',
  onPremiseFans = 'fan',
}

enum DeviceMap {
  onPremiseMiningFarms = 'onPremiseMiningFarms',
  onPremiseMiningCoolingRacks = 'onPremiseMiningCoolingRacks',
  onPremiseAirConditioningDevices = 'onPremiseAirConditioningDevices',
  onPremiseAirHandlingUnits = 'onPremiseAirHandlingUnits',
  onPremiseFans = 'onPremiseFans',
}

const ColumsMap = {
  onPremiseMiningFarms: ALL_MINING_FARMS,
  onPremiseMiningCoolingRacks: ALL_COOLING_RACKS,
  onPremiseAirConditioningDevices: ALL_CONDITIONING_DEVS,
  onPremiseAirHandlingUnits: ALL_HANDLING_UNITS,
  onPremiseFans: ALL_FANS,
};

const concatOnPremiseEntity =
  (entityName: DeviceRequestMap) => (data: any) => ({
    // eslint-disable-next-line react/destructuring-assignment
    amount: data.amount,
    // eslint-disable-next-line react/destructuring-assignment
    manufacturer: data?.[entityName].manufacturer.id ?? null,
    // eslint-disable-next-line react/destructuring-assignment
    ...R.omit(['manufacturer'], data[entityName]),
  });

const OnPremiseOrder = () => {
  const [devices, setDevices] = useState<OnPremiseDeviceType | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [activeDevice, setActiveDevice] = useState<DeviceMap>(
    DeviceMap.onPremiseMiningFarms,
  );
  const [activePurpose, setActivePurpose] = useState<OrderDevicePurposeMap>(
    OrderDevicePurposeMap.INSTALLATION,
  );

  const refetchOrders = () => {
    setError(null);

    return fetchOnPremiseDevices({
      deviceType: DeviceRequestMap[activeDevice],
      devicePurpose: activePurpose,
      sortBy: 'amount',
    })
      .then(setDevices)
      .catch(setError);
  };

  useEffect(() => {
    refetchOrders();
  }, [activePurpose, activeDevice]);

  return (
    <Wrapper>
      <Header>Processed devices</Header>

      <Controls>
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Device Type</Form.Label>
          <Form.Select
            value={activeDevice}
            onChange={(e: any) => setActiveDevice(e.currentTarget.value)}
          >
            <option value={DeviceMap.onPremiseAirConditioningDevices}>
              Air conditioning devices
            </option>
            <option value={DeviceMap.onPremiseAirHandlingUnits}>
              Air handling unit
            </option>
            <option value={DeviceMap.onPremiseFans}>Fans</option>
            <option value={DeviceMap.onPremiseMiningCoolingRacks}>
              Mining cooling racks
            </option>
            <option value={DeviceMap.onPremiseMiningFarms}>Mining farms</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Device purpose</Form.Label>
          <Form.Select
            value={activePurpose}
            onChange={(e: any) => setActivePurpose(e.currentTarget.value)}
          >
            <option value={OrderDevicePurposeMap.INSTALLATION}>
              {OrderDevicePurposeMap.INSTALLATION}
            </option>
            <option value={OrderDevicePurposeMap.MAINTENANCE}>
              {OrderDevicePurposeMap.MAINTENANCE}
            </option>
            <option value={OrderDevicePurposeMap.PURCHASE}>
              {OrderDevicePurposeMap.PURCHASE}
            </option>
            <option value={OrderDevicePurposeMap.RECONFIGURATION}>
              {OrderDevicePurposeMap.RECONFIGURATION}
            </option>
            <option value={OrderDevicePurposeMap.REPLACING}>
              {OrderDevicePurposeMap.REPLACING}
            </option>
          </Form.Select>
        </Form.Group>
      </Controls>

      {error && <Alert variant="danger">{error.message}</Alert>}

      {devices === null && <Spinner animation="border" />}

      {/* @ts-ignore */}
      {devices?.[activeDevice]?.length === 0 && (
        <Alert variant="primary">
          There are no {activeDevice} for {activePurpose}.
        </Alert>
      )}

      {/* @ts-ignore */}
      {!error && devices?.[activeDevice] && (
        <InnerTable<
          { amount: number; id: number } & (
            | MiningFarmType
            | CoolingRackType
            | AirConditioningDeviceType
            | AirHandlingUnitType
            | FanType
          )
        >
          // @ts-ignore
          data={
            devices?.[activeDevice].map(
              concatOnPremiseEntity(DeviceRequestMap[activeDevice]),
            ) ?? []
          }
          columns={[
            {
              Header: '#',
              accessor: 'id',
            },
            {
              Header: 'Amount',
              accessor: 'amount',
            },
            // @ts-ignore
            ...ColumsMap[activeDevice],
          ]}
        />
      )}
    </Wrapper>
  );
};

export default OnPremiseOrder;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const Header = styled.h1`
  margin-bottom: 45px;
`;

const Controls = styled.div`
  display: flex;
  margin-bottom: 45px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 7px;
`;
