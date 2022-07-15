import userService from '../../services/userService';

export const LIST_USERS = "@USERS/LIST_USERS";
export const GET_USER = "@USERS/GET_USER";
export const CREATE_USERS = "@USERS/CREATE_USERS";

const getListUsers = (ativo) => {
    return async (dispatch) => {

        const usuario = await userService.GetUsers(ativo);
        dispatch({
            type: LIST_USERS,
            payload: {
                usuario
            }
        })
    }
}

const createUser = (usuario) => {
    return async (dispatch) => {

        await userService.CreateUsers(usuario);
        const _users = await userService.GetUsers('S');
        dispatch({
            type: CREATE_USERS,
            payload: {
                usuario : _users
            }
        })
    }
}

const getUser = (cpf) => {
    return async (dispatch) => {

        const _user = await userService.getUser(cpf);

        dispatch({
            type: GET_USER,
            payload: {
                usuario : _user
            }
        })
    }
}

export { getListUsers, createUser, getUser };
