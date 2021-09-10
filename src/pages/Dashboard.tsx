import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

import useRequireAuth from '../hooks/useRequireAuth';
import NavigationBar from '../organisms/NavigationBar';

const Dashboard = () => {
  const auth = useRequireAuth();

  if (auth === null) {
    <Spinner animation="border" />;
  }

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
