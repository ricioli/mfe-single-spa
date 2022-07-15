import Auth from "./accessControl/Auth";
import {matchRoutes} from 'react-router-dom';

import Login from "../pages/Login";

const guestRoutes = [
  {
    path: "/login",
    element: (
      <Auth>
        <Login />
      </Auth>
    ),
  },
  { path: "/permissao-negada", element: <h1>Permissão Negada</h1> },
];

export const isGuestRoute = (path) => {
  return Boolean(matchRoutes(guestRoutes, path));
}

export default guestRoutes;
