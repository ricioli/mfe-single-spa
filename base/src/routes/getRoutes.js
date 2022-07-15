import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router";
import { usePerfilAcessoContext } from "../contexts/PerfilAcessoContext";
import guestRoutes from "./guestRoutes";
import Protected from "./accessControl/Protected";
import RouteComponents from "./RouteComponents";
import NotFound404 from '../pages/Modulos/GestaoCheckout/pages/NotFound404';

const Routes = () => {
  const account = useSelector(({ account }) => account);
  const isAuthenticated = Boolean(account?.usuario);
  const [state] = usePerfilAcessoContext();

  const routes = !isAuthenticated
    ? [
        ...guestRoutes,
        {
          path: "*",
          element: <Navigate replace to="/login" />,
        },
      ]
    : [
        ...guestRoutes,
        {
          path: "/",
          element: (
            <RouteComponents component="Home" />
          ),
          children: [
            ...state.routes,
            // {
            //   path: "profile",
            //   element: (
            //     <Protected route={{onlyLogged: true}}>
            //       <RouteComponents component="Profile" />
            //     </Protected>
            //   ),
            // },
            { path: "*", element: <NotFound404 /> },
          ],
        },
        { path: "*", element: <NotFound404 /> },
      ];

  return useRoutes(routes);
};

export default Routes;
