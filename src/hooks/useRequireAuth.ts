import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Pages } from '../constants/pages';
import { useAuth } from '../contexts/authContext';

function useRequireAuth(redirectUrl = Pages.LOGIN) {
  const history = useHistory();
  const { auth } = useAuth();

  useEffect(() => {
    console.log('useRequire hook');

    if (!!auth?.token === false) {
      history.push(redirectUrl);
    }
  }, [auth, history]);

  return auth;
}

export default useRequireAuth;
