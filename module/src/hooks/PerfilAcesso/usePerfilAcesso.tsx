import getOutletContextElement from './getOutletContextElement';
import additionalRoutes from '../../routes/additionalRoutes';
import NotFound404 from '../../pages/NotFound404';

import {
  getFullPath,
  getPath,
  getAcesso,
  getComponentName,
  getRouteElement,
  cleanRouteItem,
  cleanMenuItem,
} from './utils.js';

const usePerfilAcesso = (permission) => {
  const getPerfilAcessoRecursive = (value, newLevel: number, referenceParam = []) => {
    return value.map((item) => {
      let level = newLevel || 0;

      const { descricao, reference, ativo, menu_children: children, ...rest } = item;
      let newChildren;

      if (children) {
        newChildren = getPerfilAcessoRecursive(children, ++level, [...referenceParam, reference]);
      }

      newChildren = newChildren?.length ? { children: newChildren } : {};

      const path = getPath(item);
      const fullPath = getFullPath([...referenceParam, reference]);
      const acesso = getAcesso(item);

      return {
        descricao,
        ativo,
        reference,
        path,
        fullPath,
        acesso,
        ...rest,
        ...newChildren,
      };
    });
  };

  const getPerfilAcesso = (value) => {
    return getPerfilAcessoRecursive(value, 0);
  };

  const getLinks = (obj, newLevel = null) => {
    return obj.reduce((acc, { children, ...item }) => {
      let level = newLevel || 0;
      const newItem = { ...item };
      const elementName = `${getComponentName(newItem.path, level)}`;

      if (children) {
        const newChildren = { ...getLinks(children, ++level) };
        acc[elementName] = newChildren;
      } else if (level) {
        const extraLinks = additionalRoutes
          .filter((item) => item.fullPath.includes(newItem.fullPath))
          .reduce((acc, item) => {
            acc[item.linkName] = item.fullPath;
            return acc;
          }, {});

        acc[elementName] = Object.assign(
          {
            list: newItem.fullPath,
            form: `${newItem.fullPath}/:id`,
          },
          extraLinks
        );
      }

      return acc;
    }, {});
  };

  const getRoutes = (obj, newLevel = null) => {
    return obj.map(({ children, ...item }) => {
      let level = newLevel || 0;

      const cleanItem = cleanRouteItem(item);

      let newItem = { ...cleanItem, permission: permission.getPermission(item) };
      const elementName = `${getComponentName(newItem.fullPath, level)}`;

      if (level === 0) {
        newItem.elementName = elementName;
        newItem.element = getRouteElement(newItem);
      }
      if (children) {
        const newChildren = [...getRoutes(children, ++level), { path: '*', element: <NotFound404 /> }];
        newItem = { ...newItem, children: newChildren };
      } else if (level) {
        const newItemlist = {
          ...newItem,
          newPath: String(0),
          elementName: `${elementName}List`,
        };
        newItemlist.element = getRouteElement(newItemlist);

        const newItemForm = {
          ...newItem,
          path: `${newItem.path}/:id`,
          fullPath: `${newItem.fullPath}/:id`,
          newPath: String(0),
          backPath: `../${newItem.path}`,
          elementName: `${elementName}Form`,
        };
        newItemForm.element = getRouteElement(newItemForm);

        const extraRoutes = additionalRoutes
          .filter((item) => item.fullPath.includes(newItem.fullPath))
          .map((item) => {
            const route = {
              ...newItem,
              ...item,
              elementName: item.element,
            };
            route.element = getRouteElement(route);
            return route;
          });

        const { path, fullPath, permission, acesso, ...newItemLayout } = newItem;
        const OutletContextElement = getOutletContextElement();
        newItemLayout.element = <OutletContextElement />;

        newItem = {
          ...newItemLayout,
          children: [newItemlist, newItemForm, ...extraRoutes, { path: '*', element: <NotFound404 /> }],
        };
      }

      return newItem;
    });
  };

  const getMenu = (items, newLevel = null) => {
    return items.map(({ children, ...item }) => {
      let level = newLevel || 0;

      const cleanItem = cleanMenuItem(item);

      let newItem = { ...cleanItem, level, permission: permission.getPermission(item) };

      if (level === 0) {
        newItem.permission = permission.getPermissionModuleMenu(item);
      }

      if (children) {
        const newChildren = getMenu(children, ++level);
        newItem = { ...newItem, children: newChildren };
      }

      return newItem;
    });
  };

  return { getRoutes, getMenu, getPerfilAcesso, getLinks };
};

export default usePerfilAcesso;
