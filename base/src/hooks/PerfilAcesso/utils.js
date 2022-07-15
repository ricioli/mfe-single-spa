import Protected from "../../routes/accessControl/Protected";
import RouteComponents from "../../routes/RouteComponents";

const referenceToRoute = (value) => {
  return (value || '')
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
};

const getFullPath = (references) => {
  references = references.map(reference => referenceToRoute(reference));
  return "/" + references.join("/");
};

const getPath = ({ reference }) => {
  return referenceToRoute(reference);
};

const getDescription = ({ descmodulo, descmenupai, descmenu }) => descmenu || descmenupai || descmodulo;

const getAcesso = ({ codperfil, codtipoacesso, desctipoacesso }) => ({
  codperfil,
  codtipoacesso,
  desctipoacesso,
});

const getAtivo = ({ ativomenu, ativomodulo }) => {
  return ativomenu !== null ? ativomenu : ativomodulo;
};

const getReference = ({ referencemenu, referencemodulo }) => {
  return referencemenu !== null ? referencemenu : referencemodulo;
};

const upperFirstLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const getComponentName = (value, level) => {
  const prefix = level === 0 ? "Modulo" : "";

  value = upperFirstLetter(value);
  return prefix + value.replace(/[-/][a-z0-9]/g, ($1) => $1.replace("-", "").toUpperCase()).replace(/\//g, "");
};

const getRouteElement = ({ elementName, ...route }) => {
  return (
    <Protected route={route}>
      <RouteComponents component={elementName} />
    </Protected>
  );
};

const cleanRouteItem = (item) => {
  // limpa dados desnecessários para a rota
  const {
    codmodulo,
    codmenupai,
    codmenu,
    codperfil,
    codperfilitem,
    codtipoacesso,
    desctipoacesso,
    ...cleanItem
  } = item;
  return cleanItem;
};

const cleanMenuItem = (item) => {
  // limpa dados desnecessários para o menu
  const {
    ativomenu,
    ativomodulo,
    codmodulo,
    codmenu,
    codperfil,
    codperfilitem,
    codtipoacesso,
    desctipoacesso,
    ...cleanItem
  } = item;
  return cleanItem;
};

export {
  getFullPath,
  getPath,
  getDescription,
  getAcesso,
  getAtivo,
  getComponentName,
  getRouteElement,
  cleanRouteItem,
  cleanMenuItem,
  getReference,
};
