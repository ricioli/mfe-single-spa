import authService from '../../services/authService';

export const LOGIN_SUCCESS = '@ACCOUNT/LOGIN_SUCCESS';
export const SILENT_LOGIN = '@ACCOUNT/SILENT_LOGIN';
export const SIGNOUT = '@ACCOUNT/SIGNOUT';
export const LIST_ACCOUNT = '@ACCOUNT/LIST_ACCOUNT';

const signIn = (emailCpf, senha) => {
  return async (dispatch) => {
    const usuario = await authService.SingIn(emailCpf, senha);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        usuario,
      },
    });
  };
};

const setUserData = (callBack = () => {}) => {
  return async (dispatch) => {
    try {
      const usuario = await authService.SingInWithToken();

      await dispatch({
        type: SILENT_LOGIN,
        payload: {
          usuario,
        },
      });
    } finally {
      callBack();
    }
  };
};

const signOut = () => {
  return async (dispatch) => {
    await authService.SingOut();

    dispatch({
      type: SIGNOUT,
    });
  };
};

export { signIn, setUserData, signOut };
