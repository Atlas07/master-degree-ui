import { Spinner } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/pages';
import useRequireAuth from '../../hooks/useRequireAuth';
import NavigationBar from '../../organisms/NavigationBar';
import AirConditioningDevices from './AirConditioningDevices';
import AirHandlingUnit from './AirHandlingUnit';
import CoolingRack from './CoolingRack';
import Fan from './Fan';
import Manufacter from './Manufacter';
import MiningFarm from './MiningFarm';
import OnPremiseOrder from './OnPremiseOrder';
import Order from './Order';

const Dashboard = () => {
  const auth = useRequireAuth();

  if (auth === null) {
    <Spinner animation="border" />;
  }

  return (
    <Wrapper>
      <NavigationBar />

      <Switch>
        <Route path={`${Pages.DASHBOARD}/manufacter`} component={Manufacter} />
        <Route path={`${Pages.DASHBOARD}/mining-farm`} component={MiningFarm} />
        <Route
          path={`${Pages.DASHBOARD}/cooling-rack`}
          component={CoolingRack}
        />
        <Route path={`${Pages.DASHBOARD}/fan`} component={Fan} />
        <Route
          path={`${Pages.DASHBOARD}/air-conditioning-device`}
          component={AirConditioningDevices}
        />
        <Route
          path={`${Pages.DASHBOARD}/air-handling-unit`}
          component={AirHandlingUnit}
        />
        <Route path={`${Pages.DASHBOARD}/order`} component={Order} />
        <Route
          path={`${Pages.DASHBOARD}/on-premise-order`}
          component={OnPremiseOrder}
        />
      </Switch>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
