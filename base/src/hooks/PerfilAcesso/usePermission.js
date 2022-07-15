const usePermission = (permissaoAcessoUsuario, account) => {
  const usuarioAdmin = account?.usuario?.codusuario === 1;

  const getPermissionModuleMenu = ({ descricao, acesso }) => {
    const getModuleChildren = (descricao) => {
      return permissaoAcessoUsuario.filter(({ descmodulo }) => descmodulo === descricao);
    };

    // return {
    //   access: usuarioAdmin || Boolean(getModuleChildren(descricao)?.length),
    //   type: acesso?.desctipoacesso,
    //   descricao: descricao,
    // };
    return { access: true , type: 'Editor', descricao };
  };

  const getPermission = ({ descricao, acesso }) => {
    // return { access: usuarioAdmin || Boolean(acesso?.codtipoacesso), type: acesso?.desctipoacesso, descricao };
    return { access: true , type: 'Editor', descricao };
  };

  return {
    getPermissionModuleMenu,
    getPermission,
  };
};

export default usePermission;
