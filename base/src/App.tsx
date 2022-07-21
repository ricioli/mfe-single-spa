import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AuthProvider from './contexts/AuthProvider';

import { PerfilAcessoProvider } from './contexts/PerfilAcessoContext';
import AppRoutes from './routes/AppRoutes';

function App(props) {
  console.log(props.name);

  return (
    <Provider store={store}>
      <AuthProvider>
        <PerfilAcessoProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </PerfilAcessoProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
