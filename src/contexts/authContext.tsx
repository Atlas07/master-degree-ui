import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { SignInResponse } from '../services/api/authorization';
import userService from '../services/userService';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [auth, setAuth] = useState<SignInResponse | null>(userService.get());

  const setAuthData = (authData: SignInResponse) => {
    userService.set(authData);
    setAuth(authData);
  };

  const clearAuthData = () => {
    userService.remove();
    setAuth(null);
  };

  useEffect(() => {
    userService.set(auth);
  }, [auth]);

  const value = useMemo(
    () => ({ auth, setAuth, setAuthData, clearAuthData }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

type AuthContextType = {
  auth: SignInResponse | null;
  setAuth: Dispatch<SignInResponse | null>;
  setAuthData: (authData: SignInResponse) => void;
  clearAuthData: () => void;
};
