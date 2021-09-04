import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { signIn } from '../api/authorization';
import { GeneralError } from '../api/guestApi';

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    signIn({ username, password })
      .then(res => {
        localStorage.setItem('token', res.token);
        history.push('/dashboard');
      })
      .catch((err: GeneralError) => setError(err.message));
  };

  const handleInputChange =
    (setState: Dispatch<SetStateAction<string>>) =>
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(e.currentTarget.value);
    };

  return (
    <Wrapper>
      <Header>Log in page</Header>
      <FormStyled noValidate validated={isValidated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleInputChange(setUsername)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </FormStyled>
    </Wrapper>
  );
};

export default Login;

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
