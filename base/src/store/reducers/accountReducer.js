import {
    LOGIN_SUCCESS,
    SILENT_LOGIN,
    SIGNOUT
} from '../actions/accountActions';

const INITIAL_STATE = {
    usuario: null
}

const accountReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                usuario: action.payload.usuario
            }
        }
        case SILENT_LOGIN: {
            return {
                ...state,
                usuario: action.payload.usuario
            }
        }
        case SIGNOUT: {
            return {
                ...state,
                usuario: null
            }
        }
        default: {
            return state;
        }
    }

}

export default accountReducer;
