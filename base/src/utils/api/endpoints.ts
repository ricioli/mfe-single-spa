import axiosService from './axios';

const endpoint = {
  Autenticacao: {
    SingIn: axiosService.local ? '/Autenticacao/SignIn' : '/erp_autenticacao/signin',
    SingInWithToken: axiosService.local ? '/Autenticacao/SignInWithToken' : '/erp_autenticacao/signinwithtoken',
    Permissao: axiosService.local ? '/Modulo/Menu/Permissao' : '/erp_autenticacao/Modulo/Menu/Permissao',
  },
  Genericos: {
    GetCep: axiosService.local ? '/GetCep' : '/crm_genericos/getcep',
  },
  Fiscal: {
    Uf: axiosService.local ? '/Fiscal/Uf' : '/crm_fiscal/uf',
    Ncm: axiosService.local ? '/Ncm' : '/crm_fiscal/ncm',
    Cest: axiosService.local ? '/Cest' : '/crm_fiscal/cest',
    Cst: axiosService.local ? '/Cst' : '/crm_fiscal/cst',
    CstIcms: axiosService.local ? '/CstIcms' : '/crm_fiscal/csticms',
    crt: axiosService.local ? '/Crt' : '/crm_fiscal/crt',
    PisCofins: axiosService.local ? '/Fiscal/PisCofins' : '/crm_fiscal/piscofins',
    OrigemMercadoria: axiosService.local ? '/Fiscal/OrigemMercadoria' : '/crm_fiscal/origemmercadoria',
    RegraEstado: axiosService.local ? '/Fiscal/RegraEstado' : '/crm_fiscal/regraestado',
  },
  Clientes: {
    Clientes: axiosService.local ? '/Clientes' : '/erp_cadastros/clientes',
  },
  Produtos: {
    Produtos: axiosService.local ? '/Produtos' : '/erp_cadastros/produtos',
    ProdutosMultiplos: axiosService.local ? '/ProdutosMultiplos' : '/erp_cadastros/produtosmultiplos',
  },
  Unidade: {
    Unidade: axiosService.local ? '/Unidade' : '/erp_cadastros/unidade',
    UnidadeFormato: axiosService.local ? '/UnidadeFormato' : '/erp_cadastros/unidadeformato',
  },
  Categoria: {
    Categoria: axiosService.local ? '/Cadastros/Categoria' : '/erp_cadastros/categoria',
  },
  SubCategoria: {
    SubCategoria: axiosService.local ? '/Cadastros/SubCategoria' : '/erp_cadastros/subcategoria',
  },
  TabelaDePreco: {
    TabelaDePreco: axiosService.local ? '/tabeladepreco' : '/erp_cadastros/tabeladepreco',
  },
  UnidadeMedida: {
    GetUnidadesMedidas: axiosService.local ? '/unidademedida' : '/erp_cadastros/unidademedida',
  },
  ProdutosTabelaPreco: {
    ProdutosTabelaPreco: axiosService.local ? '/ProdutosTabelaPreco' : '/erp_cadastros/produtostabelapreco',
  },
  Plataforma: {
    Ncm: axiosService.local ? '/PlataformaNcm' : '/erp_cadastros/plataformancm',
  },
};

export default endpoint;
