import { sendRequest, resolveIdentifier, resolveUrl } from './sendRequest';

interface IFunctions = {
  ['get']: () => {};
  ['submit']: () => {};
  ['delete']: () => {};
}

const FrontRequest = (endPoint: string, idFieldName: string, filterFunctions: string[]) => {
  const normalize = (item) => {
    const id = item[idFieldName];
    delete item[idFieldName];
    return { id, ...item };
  };

  const normalizeId = (item) => {
    if (Array.isArray(item)) {
      return item.map((item) => normalize(item));
    }
    return normalize(item);
  };

  const getFilteredFunctions = (filterFunctions: string[]) => {
    const functions:  = { normalizeId };

    if (filterFunctions.includes('get')) {
      functions.get = get;
    }

    if (filterFunctions.includes('submit')) {
      functions.submit = submit;
    }

    if (filterFunctions.includes('delete')) {
      functions.delete = _delete;
    }

    return functions;
  };

  const get = (id: number, query) => {
    return sendRequest({
      method: 'GET',
      url: resolveUrl(resolveIdentifier(endPoint, id), query),
    });
  };

  const submit = ({ id, ...payload }) => {
    return sendRequest({
      method: id ? 'PUT' : 'POST',
      url: resolveIdentifier(endPoint, id),
      data: payload,
    });
  };

  const _delete = (id: number) => {
    return sendRequest({
      method: 'DELETE',
      url: resolveIdentifier(endPoint, id),
    });
  };

  if (!filterFunctions) {
    return { get, submit, delete: _delete, normalizeId };
  }

  return getFilteredFunctions(filterFunctions);
};

export default FrontRequest;
