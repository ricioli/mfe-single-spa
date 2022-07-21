import React, { lazy, Suspense } from 'react';

import ModuloGestaoCheckout from '@/pages/NotFound404';

import Home from '@/pages/Home';

const GestaoCheckoutCadastrosUnidadesList = lazy(() => import('../pages/NotFound404'));
const GestaoCheckoutCadastrosUnidadesForm = lazy(() => import('../pages/NotFound404'));

const FallBack = () => {
  return <></>;
};

const getComponent = (componentName) => {
  const components = {
    Home,

    ModuloGestaoCheckout,

    GestaoCheckoutCadastrosUnidadesList,
    GestaoCheckoutCadastrosUnidadesForm,
  };

  return components[componentName] || FallBack;
};

const RouteComponents = ({ component, ...props }) => {
  const Component = getComponent(component);

  return (
    <Suspense fallback={<>...</>}>
      <Component {...props} />
    </Suspense>
  );
};

export default RouteComponents;
