import ExamHistory from "./ExamHistory"
import PatientsHistory from "./PatientsHistory"

export const UPDATE_EXAM_HISTORY = 'UPDATE_EXAM_HISTORY'
export const UPDATE_PATIENT_HISTORY = 'UPDATE_PATIENT_HISTORY'

export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDE_LOADING = 'HIDE_LOADING'
interface UpdateExamHistoryAction {
    type: typeof UPDATE_EXAM_HISTORY
    payload: ExamHistory
}
interface UpdatePatientHistoryAction {
    type: typeof UPDATE_PATIENT_HISTORY
    payload: PatientsHistory
}
interface ShowLoadingAction {
    type: typeof SHOW_LOADING
    examID: number
}
interface HideLoadingAction {
    type: typeof HIDE_LOADING
    error?: Error
    examID?: number
}
export type ProductivityActionTypes = UpdateExamHistoryAction | UpdatePatientHistoryAction | ShowLoadingAction | HideLoadingAction