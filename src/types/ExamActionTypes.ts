
import Exam from "./Exam"
import Sector from "./Sector"

export const GET_EXAMS_REQUEST = 'GET_EXAMS_REQUEST'
export const GET_EXAMS_FAILED = 'GET_EXAMS_FAILED'
export const GET_EXAMS_SUCCESS = 'GET_EXAMS_SUCCESS'


interface GetExamsRequestAction {
    type: typeof GET_EXAMS_REQUEST
}
interface GetExamsFailedAction {
    type: typeof GET_EXAMS_FAILED
    error: Error
}
interface GetExamsSuccess {
    type: typeof GET_EXAMS_SUCCESS
    exams: Exam[],
    sectors: Sector[],
}
export type ExamActionTypes = GetExamsRequestAction | GetExamsFailedAction | GetExamsSuccess