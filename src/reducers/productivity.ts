

import ProductivityStoreState from "../types/ProductivityStoreState"
import { ProductivityActionTypes, SHOW_LOADING, HIDE_LOADING } from "../types/ProductivityActionTypes"

const initialState : ProductivityStoreState = {
    error: undefined,
    errorExamID: undefined,
    loadingExamID: undefined,
}

export default (state=initialState,action : ProductivityActionTypes) : ProductivityStoreState => {
    switch (action.type) {
        case SHOW_LOADING: {
            return {
                ...state,
                loadingExamID: action.examID,
                error: undefined,
            }
        }
        case HIDE_LOADING: {
            return {
                ...state,
                loadingExamID: undefined,
                error: action.error,
                errorExamID: action.examID,
            }
        }
        default:
            return state
    }
}