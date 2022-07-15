import {
  useEffect,
  useCallback,
  createContext,
  useContext,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { setUserData } from "../../store/actions/accountActions";
import authService from "../../services/authService";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [waitingAuthentication, setWaitingAuthentication] = useState(true);

  const dispatch = useDispatch();
  const authenticationFinished = () => setWaitingAuthentication(false);
  const initAuth = useCallback(async () => {

    if (authService.isAuthenticated()) {
      await dispatch(setUserData(authenticationFinished));
    } else {
      authenticationFinished();
    }
  }, [dispatch]);

  useEffect(() => {
      initAuth();
  }, [initAuth]);

  return (
    <AuthContext.Provider value={{ waitingAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
