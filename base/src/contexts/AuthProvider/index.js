import { useEffect, useCallback, createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { asyncSetUserData } from '@/store/reducers/accountReducer';
import authService from '@/services/authService';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [waitingAuthentication, setWaitingAuthentication] = useState(true);

  const dispatch = useDispatch();
  const authenticationFinished = () => setWaitingAuthentication(false);
  const initAuth = useCallback(async () => {
    if (authService.isAuthenticated()) {
      await dispatch(asyncSetUserData(authenticationFinished));
    } else {
      authenticationFinished();
    }
  }, [dispatch]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <AuthContext.Provider value={{ waitingAuthentication }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
