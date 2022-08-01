import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

enum PermissionType {
  Editor = 'Editor',
  Leitor = 'Leitor',
}

interface Permission {
  access: boolean;
  type: keyof typeof PermissionType;
  descricao: string;
}

interface Props {
  route: Partial<{ permission: Permission; onlyLogged: boolean }>;
  children: ReactElement;
}

interface Account {
  usuario: { username } | null;
}

const Protected = ({ children, route }: Props): ReactElement => {
  const { permission, onlyLogged } = route;

  const account: Account = useSelector(({ account }) => account);
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
