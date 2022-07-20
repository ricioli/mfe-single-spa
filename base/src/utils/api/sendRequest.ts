import axiosService from '@/utils/api/axios';
import authService from '@/services/authService';
import param from './param';

enum HttpMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

console.log('teste');

interface IRequestConfig<T> {
  method: keyof typeof HttpMethod;
  url: string;
  data?: T;
  // TODO adicionar headers permitidos Ex: Authentication Bearer
  headers?: { 'X-No-Redirect-401': true };
}

const sendRequest = <T>(obj: IRequestConfig<T>) => {
  authService.setToken(authService.getToken());

  return axiosService.axios(obj).then((response) => {
    if (response?.data?.error) throw new Error(response.data.error);

    return response?.data;
  });
};

const resolveIdentifier = (endpoint: string, id: number) => {
  if (id) {
    endpoint = /:id$|:id\//.test(endpoint) ? endpoint.replace(':id', String(id)) : `${endpoint}/${id}`;
  }
  return normalizeEndPoint(endpoint);
};

const resolveUrl = (route, query) => `${route}${query ? '?' + param(query) : ''}`;

const removeFinalSlash = (endpoint) => endpoint.replace(/\/$/, '');
const removeDuplicateSlash = (endpoint) => endpoint.replace('//', '/');
const normalizeEndPoint = (endpoint) => removeFinalSlash(removeDuplicateSlash(endpoint));

export { sendRequest, resolveIdentifier, resolveUrl, HttpMethod };
