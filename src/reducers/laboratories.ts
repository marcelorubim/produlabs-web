import { LaboratoryActionTypes, GET_LABORATORIES_REQUEST, GET_LABORATORIES_FAILED, GET_LABORATORIES_SUCCESS } from "../types/LaboratoryActionTypes"
import LaboratoryStoreState from "../types/LaboratoryStoreState"

const initialState : LaboratoryStoreState = {
    laboratories: [],
    loading: false
}

export default (state=initialState,action : LaboratoryActionTypes) : LaboratoryStoreState => {
    switch (action.type) {
        case GET_LABORATORIES_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_LABORATORIES_SUCCESS:
            return {
                ...state,
                laboratories: action.payload,
                loading: false
            }
        case GET_LABORATORIES_FAILED: 
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}