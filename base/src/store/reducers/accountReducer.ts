import authService from '@/services/authService';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';

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

export const signIn = (emailCpf: string, senha: string) => async (dispatch: AppDispatch) => {
  const usuario = await authService.SingIn<{ username: string }>(emailCpf, senha);
  dispatch(setUserData(usuario));
};

export const asyncSetUserData =
  (callBack = () => null) =>
  async (dispatch: AppDispatch) => {
    try {
      const usuario = await authService.SingInWithToken();
      dispatch(setUserData(usuario));
    } catch (error) {
      console.error(error);
    } finally {
      callBack();
    }
  };

export const signOut = () => async (dispatch: AppDispatch) => {
  try {
    authService.SingOut();
    dispatch(setUserData(null));
  } catch (error) {
    console.error(error);
  }
};
