import * as R from 'ramda';
import styled from 'styled-components';

import { useAuth } from '../contexts/authContext';
import NavigationBar from '../organisms/NavigationBar';

const Dashboard = () => {
  const { auth, clearAuthData } = useAuth();

  const role = R.head(auth?.roles as string[]);

  return (
    <Wrapper>
      <NavigationBar />
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
