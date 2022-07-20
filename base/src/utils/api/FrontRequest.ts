import { sendRequest, resolveIdentifier, resolveUrl, HttpMethod } from './sendRequest';

interface IFunctions {
  normalizeId: <T>(item: T) => IItem[] | IItem;
  get?: <T>(id?: number, query?: T) => Promise<IItem[] | IItem>;
  submit?: <T>(item: IItem) => Promise<T>;
  delete?: (id: number) => Promise<null>;
}

interface IItem {
  id: number;
}

const FrontRequest = (endPoint: string, idFieldName: string, filterFunctions: string[]) => {
  const normalize = <T>(item: T): IItem => {
    const id = item[idFieldName];
    delete item[idFieldName];
    return { id, ...item };
  };

  const normalizeId = <T>(item: T): IItem[] | IItem => {
    if (Array.isArray(item)) {
      return item.map((item) => normalize(item));
    }
    return normalize(item);
  };

  const getFilteredFunctions = (filterFunctions: string[]) => {
    const functions: IFunctions = { normalizeId };

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
      method: HttpMethod.GET,
      url: resolveUrl(resolveIdentifier(endPoint, id), query),
    });
  };

  const submit = ({ id, ...payload }) => {
    return sendRequest({
      method: id ? HttpMethod.PUT : HttpMethod.POST,
      url: resolveIdentifier(endPoint, id),
      data: payload,
    });
  };

  const _delete = (id: number) => {
    return sendRequest({
      method: HttpMethod.DELETE,
      url: resolveIdentifier(endPoint, id),
    });
  };

  if (!filterFunctions) {
    return { get, submit, delete: _delete, normalizeId };
  }

  return getFilteredFunctions(filterFunctions);
};

export default FrontRequest;
