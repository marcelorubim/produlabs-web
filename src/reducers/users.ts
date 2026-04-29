import { UserActionTypes, GET_USERS_REQUEST, GET_USERS_FAILED, GET_USERS_SUCCESS, SET_CURRENT_USER, LOGOUT_USER } from "../types/UserActionTypes"
import UserStoreState from "../types/UserStoreState"

const initialState : UserStoreState = {
    users: [],
    loading: false,
    currentUser: null,
    token: null,
}

export default (state=initialState,action : UserActionTypes) : UserStoreState => {
    switch (action.type) {
        case LOGOUT_USER: {
            sessionStorage.removeItem("user")
            window.location.href = '/'
            return initialState
        }
        case GET_USERS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_USERS_FAILED: 
            return {
                ...state,
                loading: false
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
                token: action.token
            }
        default:
            return state
    }
}