import { useAuth } from '@/contexts/AuthProvider';
import { usePerfilAcessoContext } from '../contexts/PerfilAcessoContext';
import Routes from './getRoutes';

const AppRoutes = () => {
  const { waitingAuthentication } = useAuth();
  const [state] = usePerfilAcessoContext();

  return (
    <>
      {waitingAuthentication || state.waitingPerfil ? (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ...
        </div>
      ) : (
        <Routes />
      )}
    </>
  );
};

export default AppRoutes;
