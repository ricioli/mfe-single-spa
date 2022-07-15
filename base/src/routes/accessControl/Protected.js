import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, route }) => {
  const { permission, onlyLogged } = route;

  const account = useSelector(({ account }) => account);
  const isAuthenticated = Boolean(account?.usuario);

  return !isAuthenticated ? (
    <Navigate replace to="/login" />
  ) : !permission?.access && !onlyLogged ? (
    <Navigate replace to="/permissao-negada" />
  ) : (
    React.cloneElement(children, { route })
  );
};

export default Protected;
