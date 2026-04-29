
import Laboratory from "./Laboratory"

export const GET_LABORATORIES_REQUEST = 'GET_LABORATORIES_REQUEST'
export const GET_LABORATORIES_FAILED = 'GET_LABORATORIES_FAILED'
export const GET_LABORATORIES_SUCCESS = 'GET_LABORATORIES_SUCCESS'


interface GetLaboratoriesRequestAction {
    type: typeof GET_LABORATORIES_REQUEST
}
interface GetLaboratoriesFailedAction {
    type: typeof GET_LABORATORIES_FAILED
    error: Error
}
interface GetLaboratoriesSuccess {
    type: typeof GET_LABORATORIES_SUCCESS
    payload: Laboratory[]
}
export type LaboratoryActionTypes = GetLaboratoriesRequestAction | GetLaboratoriesFailedAction | GetLaboratoriesSuccess