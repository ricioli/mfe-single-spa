import { ReactNode, ReactElement } from 'react';

interface Props {
  children?: ReactNode | undefined;
}

const Teste = ({ children }: Props): ReactElement => {
  return <div>{children}</div>;
};

export default Teste;
