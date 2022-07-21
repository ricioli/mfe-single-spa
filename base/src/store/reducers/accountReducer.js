import authService from '@/services/authService';
import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    usuario: null,
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.usuario = payload;
    },
  },
});

export const { setUserData } = accountSlice.actions;
export default accountSlice.reducer;

export const signIn = (emailCpf, senha) => async (dispatch) => {
  const usuario = await authService.SingIn(emailCpf, senha);
  dispatch(setUserData(usuario));
};

export const asyncSetUserData =
  (callBack = () => null) =>
  async (dispatch) => {
    try {
      const usuario = await authService.SingInWithToken();
      await dispatch(setUserData(usuario));
    } finally {
      callBack();
    }
  };

export const signOut = () => async (dispatch) => {
  await authService.SingOut();

  dispatch(setUserData(null));
};
