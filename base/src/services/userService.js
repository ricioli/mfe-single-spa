import axiosService from '@/utils/api/axios';
import endPoint from '@/utils/api/endpoints';
import authService from './authService';

class UserService {
  GetUsers = (ativo) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .get(`${endPoint.Usuario.GetUsers}/${ativo}`)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  CreateUsers = (usuario) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .post(endPoint.Usuario.CreateUsers, usuario)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  EditUsers = (usuario) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .put(endPoint.Usuario.EditUsers, usuario)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  RemoveUsers = (userCPF) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .delete(`${endPoint.Usuario.RemoveUsers}/${userCPF}`)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getUser = (cpf) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .get(`${endPoint.Usuario.getUser}/${cpf}`)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  UpdatePassword = (codusuario, senhanova) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .post(endPoint.Usuario.UpdatePassword, { codusuario, senha: senhanova })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  GerarCodigoRedefinirSenha = (email) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .get(`${endPoint.Usuario.GerarCodigoRedefinirSenha}/${email}`)
        //axios.get(`/GerarCodigoRedefinirSenha/${email}`)
        //axios.get(`/crm_usuarios/gerarcodigoredefinirsenha/${email}`)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  RedefinirSenha = (email, codigo, novaSenha) => {
    return new Promise((resolve, reject) => {
      authService.setToken(authService.getToken());
      axiosService.axios
        .put(`${endPoint.Usuario.RedefinirSenha}/${email}/${codigo}/${novaSenha}`)
        //axios.put(`/RedefinirSenha/${email}/${codigo}/${novaSenha}`)
        //axios.put(`/crm_usuarios/redefinirsenha/${email}/${codigo}/${novaSenha}`)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  UpdateAvatar = (avatar, codusuario) => {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('file', avatar);

      authService.setToken(authService.getToken());
      axiosService.axios
        .post(`${endPoint.Usuario.UpdateAvatar}/${codusuario}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

const userService = new UserService();

export default userService;
