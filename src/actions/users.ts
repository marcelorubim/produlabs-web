import { UserActionTypes, GET_USERS_REQUEST, SET_CURRENT_USER, LOGOUT_USER } from "../types/UserActionTypes"
import User from "../types/User"
export function getUsers(): UserActionTypes {
  return {
    type: GET_USERS_REQUEST,
  }
}

export function setCurrentUser(user: User, token: string): UserActionTypes {
  return {
    type: SET_CURRENT_USER,
    user,
    token
  }
}

export function logoutUser(): UserActionTypes {
  return {
    type: LOGOUT_USER
  }
}