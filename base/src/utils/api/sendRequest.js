import axiosService from "../../components/Utils/axios";
import authService from "../../services/authService";
import param from "../../utils/api/param";

const sendRequest = (obj) => {
  authService.setToken(authService.getToken());

  return axiosService.axios(obj)
    .then((response) => {
      if (response?.data?.error) throw new Error(response.data.error);

      return response?.data;
    });
}

const resolveIdentifier = (endpoint, id) => {
  if (id) {
    endpoint = /:id$|:id\//.test(endpoint) ? endpoint.replace(':id', id) : `${endpoint}/${id}`;
  }
  return normalizeEndPoint(endpoint);
};

const resolveUrl = (route, query) => `${route}${query ? "?" + param(query) : ""}`;

const removeFinalSlash = (endpoint) => endpoint.replace(/\/$/, '');
const removeDuplicateSlash = (endpoint) => endpoint.replace('//', '/');
const normalizeEndPoint = (endpoint) => removeFinalSlash(removeDuplicateSlash(endpoint));

export {
  sendRequest,
  resolveIdentifier,
  resolveUrl
};
