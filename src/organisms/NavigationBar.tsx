import * as R from 'ramda';
import { FC } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { Pages } from '../constants/pages';
import { useAuth } from '../contexts/authContext';
import { RoleType } from '../services/api/authorization';

type Props = {};

const getRole = (roles: RoleType[] | undefined): RoleType | undefined =>
  R.isNil(roles) ? roles : R.head(roles);

const NavigationBar: FC<Props> = () => {
  const history = useHistory();
  const { auth, clearAuthData } = useAuth();

  const role = getRole(auth?.roles);

  const handleLogout = () => {
    clearAuthData();
    history.push(Pages.LOGIN);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>

        {/* {role === Roles.ROLE_USER_ADMIN && (
          <Alert variant="primary">To implement</Alert>
        )}

        {role === Roles.ROLE_ORDER_ADMIN && (
          <Alert variant="primary">To implement</Alert>
        )}

        {role === Roles.ROLE_PLAIN_USER && (
          <Alert variant="primary">To implement</Alert>
        )} */}

        <Nav className="me-auto">
          <NavDropdown title="Catalog" id="collasible-nav-dropdown">
            <NavDropdown.Item
              onClick={() => history.push(`${Pages.DASHBOARD}/manufacter`)}
            >
              Manufacter
            </NavDropdown.Item>
            <NavDropdown.Item>Mining farm</NavDropdown.Item>
            <NavDropdown.Item>Cooling rack</NavDropdown.Item>
            <NavDropdown.Item>Fan</NavDropdown.Item>
            <NavDropdown.Item>Air conditioning devices</NavDropdown.Item>
            <NavDropdown.Item>Air handiling unit</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link>Order</Nav.Link>
        </Nav>

        {/* 
        {role === Roles.ROLE_MAINTENANCE_ADMIN && (
          <Alert variant="primary">To implement</Alert>
        )} */}

        <Nav>
          <NavDropdown title={`Logged as ${role}`} id="collasible-nav-dropdown">
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
