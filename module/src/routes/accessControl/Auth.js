import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Auth = ({ children, redirectPath }) => {
  const isAuthenticated = useSelector(({account}) => Boolean(account?.usuario));

  redirectPath = redirectPath || '/';
  return isAuthenticated ? <Navigate replace to={redirectPath} /> : children;
};

export default Auth;
