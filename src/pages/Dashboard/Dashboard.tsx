import { Spinner } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/pages';
import useRequireAuth from '../../hooks/useRequireAuth';
import NavigationBar from '../../organisms/NavigationBar';
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
      </Switch>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
