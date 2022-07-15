import endPoint from '@/utils/api/endpoints';
import { sendRequest } from '@/utils/api/sendRequest';

const controleAcessoService = {
  get() {
    return sendRequest({
      method: 'GET',
      url: endPoint.Autenticacao.Permissao,
      headers: { 'X-No-Redirect-401': true },
    });
  },
};

export default controleAcessoService;
