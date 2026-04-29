import User from "./User"

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
export const GET_USERS_FAILED = 'GET_USERS_FAILED'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const LOGOUT_USER = 'LOGOUT_USER'


interface GetUsersRequestAction {
    type: typeof GET_USERS_REQUEST
}
interface GetUsersFailedAction {
    type: typeof GET_USERS_FAILED
    error: Error
}
interface GetUsersSuccess {
    type: typeof GET_USERS_SUCCESS
    payload: User[]
}

interface SetCurrentUser {
    type: typeof SET_CURRENT_USER
    user: User,
    token: string;
}
interface LogoutUserAction {
    type: typeof LOGOUT_USER
}
export type UserActionTypes = GetUsersRequestAction | GetUsersFailedAction | GetUsersSuccess | SetCurrentUser | LogoutUserAction