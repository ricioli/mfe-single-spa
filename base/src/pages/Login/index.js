import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '@/store/reducers/accountReducer';
import schema from './schema';
import getSchemaErrors from '@/utils/validation/getSchemaErrors';
import useValid from '@/hooks/useValid';
import { usePerfilAcessoContext } from '@/contexts/PerfilAcessoContext';

const Login = () => {
  const dispacth = useDispatch();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const valid = useValid(schema, errors, setErrors);
  const [state, setState] = usePerfilAcessoContext();

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
    valid(name, value);
  };

  async function handleSignIn() {
    setErrors({});
    setErrorMessage('');
    setLoading(true);

    try {
      setState({ ...state, waitingPerfil: true });
      await schema.validate(values, { abortEarly: false });
      await dispacth(signIn(values.emailCpf, values.senha));
    } catch (error) {
      const mappedErrors = getSchemaErrors(error);

      setErrors({
        ...mappedErrors,
      });

      setErrorMessage(error?.response?.data?.message || 'Erro ao fazer login, tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <img src="/images/Logo-Portal---Plataforma-163x54.png" alt="Logo Futura Plataforma" />
        <div>
          <div>
            <img src="/images/logo-pictogram.png" alt="futura" />
          </div>

          <input
            type="text"
            name="emailCpf"
            value={values.emailCpf}
            onChange={handleChange}
            required
            onKeyPress={(key) => {
              if (key.code === 'Enter' || key.code === 'NumpadEnter') {
                handleSignIn();
              }
            }}
            autoFocus
            style={{
              display: 'block',
              padding: '18px 8px',
            }}
            maxLength="100"
          />
          {errors.emailCpf}

          <input
            name="senha"
            value={values.senha}
            onChange={handleChange}
            required
            style={{
              display: 'block',
              padding: '18px',
            }}
            type="password"
            maxLength="20"
            error={errors.senha}
            onKeyPress={(key) => {
              if (key.code === 'Enter' || key.code === 'NumpadEnter') {
                handleSignIn();
              }
            }}
          />

          <Link to="/esqueceu-a-senha">Esqueceu a senha?</Link>

          <button onClick={handleSignIn} disabled={loading}>
            Login
          </button>
          {errorMessage && { errorMessage }}
          {loading && <div>...</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
