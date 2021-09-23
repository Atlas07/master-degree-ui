import { Spinner } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/pages';
import useRequireAuth from '../../hooks/useRequireAuth';
import NavigationBar from '../../organisms/NavigationBar';
import CoolingRack from './CoolingRack';
import Fan from './Fan';
import Manufacter from './Manufacter';
import MiningFarm from './MiningFarm';

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
      </Switch>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
