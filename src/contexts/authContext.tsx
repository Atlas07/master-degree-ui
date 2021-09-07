import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { SignInResponse } from '../api/authorization';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [auth, setAuth] = useState<SignInResponse | null>(
    getInitialAuthState(),
  );
  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(auth));
  }, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

function getInitialAuthState() {
  const authState = localStorage.getItem('user');

  return authState ? (JSON.parse(authState) as SignInResponse) : null;
}

type AuthContextType = {
  auth: SignInResponse | null;
  setAuth: Dispatch<SignInResponse | null>;
};
