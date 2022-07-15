import {
    LIST_USERS,
    CREATE_USERS,
    GET_USER
} from '../actions/userActions';

const INITIAL_STATE = {
    users: []
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case LIST_USERS: {
            return {
                ...state,
                users: action.payload.usuario
            }
        }
        case CREATE_USERS: {
            return {
                ...state,
                users: action.payload.usuario
            }
        }
        case GET_USER: {
            return {
                ...state,
                users: action.payload.usuario
            }
        }
        default: {
            return state;
        }
    }

}

export default userReducer;
