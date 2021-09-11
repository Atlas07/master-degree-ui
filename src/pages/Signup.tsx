import * as R from 'ramda';
import { FormEvent, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Roles, RoleType, signUp } from '../services/api/authorization';
import { ValidationErrorResponse, Violation } from '../services/api/guestApi';

type ChangeFormEvent = FormEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const formatViolationsErr = R.reduce<Violation, string>(
  (acc, violation) =>
    acc.concat(`${violation.fieldName}: ${violation.message} \n`),
  '',
);

const Signup = () => {
  const history = useHistory();
  const [username, setUsername] = useState('CATALOG_ADMIN_NEW');
  const [password, setPassword] = useState('CATALOG_ADMIN_NEW');
  const [email, setEmail] = useState('CATALOG_ADMIN_NEW@gmail.com');
  const [role, setRole] = useState<RoleType>(Roles.ROLE_CATALOG_ADMIN);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);

    if (e.currentTarget.checkValidity() === false) {
      return;
    }

    setIsValidated(true);
    signUp({ username, password, email, role: [role] })
      .then(() => history.push('/login'))
      .catch((err: ValidationErrorResponse) =>
        setError(formatViolationsErr(err.violations)),
      );
  };

  return (
    <Wrapper>
      <Header>Log in page</Header>
      <FormStyled noValidate validated={isValidated}>
        <Form.Group className="mb-3" controlId="formBasicInput">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: ChangeFormEvent) =>
              setUsername(e.currentTarget.value)
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeFormEvent) => setEmail(e.currentTarget.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeFormEvent) =>
              setPassword(e.currentTarget.value)
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Role</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={role}
            onChange={(e: ChangeFormEvent) =>
              setRole(e.currentTarget.value as RoleType)
            }
          >
            <option value={Roles.ROLE_USER_ADMIN}>User admin</option>
            <option value={Roles.ROLE_ORDER_ADMIN}>Order admin</option>
            <option value={Roles.ROLE_PLAIN_USER}>Plain user</option>
            <option value={Roles.ROLE_CATALOG_ADMIN}>Catalog user</option>
            <option value={Roles.ROLE_MAINTENANCE_ADMIN}>
              Maintenance user
            </option>
          </Form.Select>
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </FormStyled>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Header = styled.h1`
  margin-bottom: 45px;
`;

const FormStyled = styled(Form)`
  max-width: 900px;
  width: 100%;
  padding: 25px;
  border: 1px solid black;
`;
