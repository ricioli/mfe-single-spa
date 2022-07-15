import React, { lazy, Suspense } from "react";

import ModuloGestaoCheckout from "../pages/Modulos/GestaoCheckout";
import ModuloInicio from "../pages/Modulos/Inicio";

import Home from "../pages/Home";
import Dashboard from '../pages/Modulos/GestaoCheckout/pages/Dashboard';

const GestaoCheckoutCadastrosUnidadesList = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosUnidadesList" */ "../pages/Modulos/GestaoCheckout/pages/Unidades"));
const GestaoCheckoutCadastrosUnidadesForm = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosUnidadesForm" */ "../pages/Modulos/GestaoCheckout/pages/UnidadesCadastro"));
const GestaoCheckoutCadastrosClientesList = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosClientesList" */ "../pages/Modulos/GestaoCheckout/pages/Clientes"));
const GestaoCheckoutCadastrosClientesForm = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosClientesForm" */ "../pages/Modulos/GestaoCheckout/pages/Clientes/ClientesCadastro"));
const GestaoCheckoutCadastrosProdutosList = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosProdutosList" */ "../pages/Modulos/GestaoCheckout/pages/Produtos"));
const GestaoCheckoutCadastrosProdutosForm = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosProdutosForm" */ "../pages/Modulos/GestaoCheckout/pages/Produtos/produtoEdicaoIndex"));
// const GestaoCheckoutCadastrosTabelaDePrecosList = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosTabelaDePrecosList" */ "../pages/Modulos/GestaoCheckout/pages/TabelaPreco"));
const GestaoCheckoutCadastrosTabelaDePrecosList = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosTabelaDePrecosList" */ "../pages/Modulos/GestaoCheckout/pages/TabelaDePrecos"));
const GestaoCheckoutCadastrosCategoriasDeProdutosList = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosCategoriasDeProdutosList" */ "../pages/Modulos/GestaoCheckout/pages/Categorias"));
const GestaoCheckoutCadastrosCategoriaDeProdutosForm = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosCategoriaDeProdutosForm" */ "../pages/Modulos/GestaoCheckout/pages/Categorias/form"));
const GestaoCheckoutCadastrosNcmsForm = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosNcmsForm" */ "../pages/Modulos/GestaoCheckout/pages/Ncm"));
const GestaoCheckoutCadastrosNcmsList = lazy(() => import(/* webpackChunkName: "GestaoCheckoutCadastrosNcmsList" */ "../pages/Modulos/GestaoCheckout/pages/Ncm/Components/NcmGrid"));

const FallBack = () => {
  return <></>
}

const getComponent = (componentName) => {
  const components = {
    Home,

    ModuloInicio,
    ModuloGestaoCheckout,

    GestaoCheckoutCadastrosUnidadesList,
    GestaoCheckoutCadastrosUnidadesForm,
    GestaoCheckoutCadastrosClientesList,
    GestaoCheckoutCadastrosClientesForm,
    GestaoCheckoutCadastrosProdutosList,
    GestaoCheckoutCadastrosProdutosForm,
    GestaoCheckoutCadastrosTabelaDePrecosList,
    GestaoCheckoutCadastrosCategoriasDeProdutosList,
    GestaoCheckoutCadastrosCategoriaDeProdutosForm,
    GestaoCheckoutCadastrosNcmsForm,
    GestaoCheckoutCadastrosNcmsList,
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
