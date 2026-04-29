import ExamStoreState from "../types/ExamStoreState"
import { GET_EXAMS_REQUEST, ExamActionTypes, GET_EXAMS_SUCCESS, GET_EXAMS_FAILED } from "../types/ExamActionTypes"
import Exam from "../types/Exam"

const initialState : ExamStoreState = {
    exams: [],
    activeExams: [],
    sectors: [],
    loading: false,
    examsMap: new Map(),
}

export default (state=initialState,action : ExamActionTypes) : ExamStoreState => {
    switch (action.type) {
        case GET_EXAMS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_EXAMS_SUCCESS:
            return {
                ...state,
                exams: action.exams,
                activeExams: action.exams.filter(e => !e.deletedAt),
                examsMap: action.exams.reduce<Map<number,Exam>>((acc,curr) => {
                    acc.set(curr.id,curr);
                    return acc;
                },new Map()),
                sectors: action.sectors,
                loading: false
            }
        case GET_EXAMS_FAILED: 
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}