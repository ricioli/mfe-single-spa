import axiosService from '@/utils/api/axios';
import { sendRequest, HttpMethod } from '@/utils/api/sendRequest';
import endPoint from '@/utils/api/endpoints';

class AuthService {
  SingIn = async <T>(emailCpf: string, senha: string): Promise<T> => {
    return sendRequest({
      method: HttpMethod.POST,
      url: endPoint.Autenticacao.SingIn,
      data: { emailCpf, senha },
    }).then(({ token, usuario }) => {
      this.setToken(token);
      return usuario;
    });
  };

  SingInWithToken = () => {
    return sendRequest({
      method: HttpMethod.GET,
      url: endPoint.Autenticacao.SingInWithToken,
      headers: { 'X-No-Redirect-401': true },
    });
  };

  SingOut = (): void => {
    this.removeToken();
  };

  setToken = (token: string) => {
    if (token) {
      localStorage.setItem('accessToken', token);
      axiosService.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axiosService.axios.defaults.headers.common.Authorization;
    }
  };

  getToken = () => localStorage.getItem('accessToken');
  removeToken = () => localStorage.removeItem('accessToken');
  isAuthenticated = () => !!this.getToken();
}

const authService = new AuthService();

export default authService;
