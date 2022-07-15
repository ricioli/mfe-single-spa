import { createContext, useContext, useEffect, useState } from 'react';
import controleAcessoService from '../services/controleAcessoService';
import perfilAcesso from '../hooks/PerfilAcesso/usePerfilAcesso.js';
import { useSelector } from 'react-redux';
import { useAuth } from './AuthProvider';
import getPermission from '../hooks/PerfilAcesso/usePermission';

const PerfilContext = createContext([{}, null]);

export const PerfilAcessoProvider = ({ children }) => {
  const { waitingAuthentication } = useAuth();
  const [state, setState] = useState({ perfil: [], permissaoAcessoUsuario: [], routes: [], waitingPerfil: true });
  const account = useSelector(({ account }) => account);

  const getPerfilInfo = () => {
    (async () => {
      try {
        const value = await controleAcessoService.get();

        const permission = getPermission([] /*permissaoAcessoUsuario*/, account);

        const { getMenu, getRoutes, getPerfilAcesso, getLinks } = perfilAcesso(permission);

        const perfil = getPerfilAcesso(value);
        const routes = getRoutes(perfil);
        const menu = getMenu(perfil);
        const links = getLinks(perfil);

        console.log({ ...state, /*permissaoAcessoUsuario,*/ perfil, routes, menu, links });

        setState({ ...state, /*permissaoAcessoUsuario,*/ perfil, routes, menu, links, waitingPerfil: false });
      } catch (error) {
        if (state.waitingPerfil) {
          setState({ ...state, waitingPerfil: false });
        }
        console.log(error.message || error);
      }
    })();
  };

  useEffect(() => {
    if (waitingAuthentication) return;

    getPerfilInfo();
  }, [waitingAuthentication, account]);

  return <PerfilContext.Provider value={[state, setState]}>{children}</PerfilContext.Provider>;
};

export const usePerfilAcessoContext = () => useContext(PerfilContext);
